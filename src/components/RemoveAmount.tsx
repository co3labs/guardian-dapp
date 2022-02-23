import { useContext, useEffect, useState } from "react";
import { BsArrowDown } from "react-icons/bs";
import { Link } from "react-router-dom";
import { GlobalContext, bgLoadingStates, removeBgLoadingState } from "../context/GlobalState";
import Button from "./Button";
import ConfirmModal from "./ConfirmModal";
import TransactionDoneModal from "./TransactionDoneModal";
import UserMessage from "./UserMessage";
import { toFixed18, toFixed5 } from "../utils/equate";
import { MoonLoader, PulseLoader } from "react-spinners";
import { addTxHistory, deleteRecentTxs } from "../utils/txHistoryUtils";
import usePTxManager from "../hooks/usePTxManager";
import useTxModalToggler from "../hooks/useTxModalToggler";
import errorMessages from "../utils/errorMessages";
import { DebounceInput } from "react-debounce-input";
import useLiquidityPos from "../hooks/useLiquidityPos";
import BigNumber from "bignumber.js";
import WrappedInput from "./WrappedInput";
import UnlockTokenModal from "./UnlockTokenModal";
import { getAllowance } from "../hooks/useTokenList";
import { IMaxUnstake, IUserMessage } from "../utils/types";

const RemoveAmount = () => {
  const {
    chainId,
    accountId,
    singleLiquidityPos,
    ocean,
    bgLoading,
    setBgLoading,
    txHistory,
    setTxHistory,
    showConfirmModal,
    setShowConfirmModal,
    showTxDone,
    setShowTxDone,
    notifications,
    setNotifications,
    setShowUnlockTokenModal,
  } = useContext(GlobalContext);
  const [noWallet, setNoWallet] = useState<boolean>(false);
  const [recentTxHash, setRecentTxHash] = useState("");
  const [btnDisabled, setBtnDisabled] = useState<boolean>(false);
  const [btnText, setBtnText] = useState("Enter Amount to Remove");
  const [inputDisabled, setInputDisabled] = useState(false);
  const [poolAddress, setPoolAddress] = useState<string>("");
  const [pendingUnstakeTx, setPendingUnstakeTx] = useState<number | string>();
  const [userMessage, setUserMessage] = useState<IUserMessage | null>();
  const [txReceipt, setTxReceipt] = useState<any | null>(null);
  //very last transaction
  const [lastTxId, setLastTxId] = useState<any>(null);
  //Percent of shares from input field
  const [sharesPercToRemove, setSharesPercToRemove] = useState<BigNumber>(new BigNumber(0));
  //Remove amount in shares
  const [sharesToRemove, setSharesToRemove] = useState<BigNumber>(new BigNumber(0));
  //Amount to be recieved from remove amount (this might not be neccessary)
  const [oceanToReceive, setOceanToReceive] = useState<BigNumber>(new BigNumber(0));
  const [allowance, setAllowance] = useState<BigNumber>(new BigNumber(0));

  //Max possible amount of OCEAN to remove
  const [maxUnstake, setMaxUnstake] = useState<IMaxUnstake | null>({
    OCEAN: new BigNumber(0),
    shares: new BigNumber(0),
    userPerc: new BigNumber(0),
  });

  async function getMaxUnstake(): Promise<IMaxUnstake | void> {
    if (setBgLoading && bgLoading) setBgLoading([...bgLoading, bgLoadingStates.maxUnstake]);

    try {
      //.98 is a fix for the MAX_OUT_RATIO error from the contract
      if (!ocean || !singleLiquidityPos || !singleLiquidityPos.address) return;
      const oceanAmt: BigNumber = new BigNumber(
        await ocean.getMaxUnstakeAmount(singleLiquidityPos.address, ocean.config.default.oceanTokenAddress)
      ).multipliedBy(0.98);

      const shareAmt: BigNumber = new BigNumber(
        await ocean.getPoolSharesRequiredToUnstake(
          singleLiquidityPos.address,
          ocean.config.default.oceanTokenAddress,
          oceanAmt.toFixed(18)
        )
      );

      const userPerc: BigNumber = shareAmt.div(Number(singleLiquidityPos.shares)).multipliedBy(100);
      return { OCEAN: oceanAmt, shares: shareAmt, userPerc };
    } catch (error) {
      console.error(error);
    }
  }

  //hooks
  usePTxManager(lastTxId);
  useTxModalToggler(txReceipt, setTxReceipt);
  useLiquidityPos();

  useEffect(() => {
    if (ocean && singleLiquidityPos && setBgLoading && bgLoading && accountId) {
      getMaxUnstake()
        .then((res: IMaxUnstake | void) => {
          if (res) {
            setMaxUnstake(res);
            console.log("Max unstake amount set at:", { ocean: res.OCEAN.toString(), shares: res.shares.toString() });
          }
        })
        .catch(console.error)
        .finally(() => {
          setBgLoading(removeBgLoadingState(bgLoading, bgLoadingStates.maxUnstake));
        });

      getAllowance(singleLiquidityPos.token1Info.address, accountId, singleLiquidityPos.address, ocean).then((res) => {
        setAllowance(new BigNumber(res));
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ocean, singleLiquidityPos]);

  useEffect(() => {
    setInputDisabled(false);
    if (singleLiquidityPos && Number(singleLiquidityPos.shares) === 0) {
      setBtnDisabled(true);
      setInputDisabled(true);
      setBtnText("Not Enough Shares");
    } else if (pendingUnstakeTx) {
      setBtnDisabled(true);
      setInputDisabled(true);
      setBtnText("Processing Transaction ...");
    } else if (sharesToRemove.eq(0) || oceanToReceive.eq(0)) {
      setBtnDisabled(true);
      setBtnText("Enter Amount to Remove");
    } else if (oceanToReceive.lt(0.01)) {
      setBtnDisabled(true);
      setBtnText("Minimum Removal is .01 OCEAN");
    } else if (allowance.lt(oceanToReceive)) {
      setBtnDisabled(false);
      setBtnText(`Unlock ${singleLiquidityPos?.token1Info.symbol}`);
    } else {
      setBtnDisabled(false);
      setBtnText("Withdrawal");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bgLoading?.length, sharesToRemove, pendingUnstakeTx, singleLiquidityPos, maxUnstake]);

  useEffect(() => {
    accountId ? setNoWallet(false) : setNoWallet(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accountId, chainId, sharesToRemove]);

  const updateNum = async (val: string) => {
    let max: IMaxUnstake | void;
    maxUnstake?.OCEAN.gt(0) ? (max = maxUnstake) : (max = await getMaxUnstake());
    try {
      if (max && max.OCEAN.gt(0) && max.shares.gt(0) && ocean && bgLoading && setBgLoading && singleLiquidityPos) {
        let percInput: BigNumber = new BigNumber(val);
        setSharesPercToRemove(percInput);
        if (percInput.lte(0)) {
          setSharesPercToRemove(new BigNumber(0));
          setOceanToReceive(new BigNumber(0));
          setSharesToRemove(new BigNumber(0));
          return;
        }
        setBgLoading([...bgLoading, bgLoadingStates.calcTrade]);

        if (percInput.gte(100)) {
          val = "100";
          percInput = new BigNumber(100);
          setSharesPercToRemove(new BigNumber(100));
        }

        if (percInput.gt(0) && percInput.lte(100)) setSharesPercToRemove(percInput);

        const userTotalStakedOcean: BigNumber = new BigNumber(
          await ocean.getOceanRemovedforPoolShares(singleLiquidityPos.address, singleLiquidityPos.shares)
        );

        console.log("Current user shares", singleLiquidityPos.shares);

        const oceanFromPerc: BigNumber = userTotalStakedOcean.times(percInput).div(100);

        console.log("Ocean received for total shares:", userTotalStakedOcean);
        console.log("Ocean received from user input:", oceanFromPerc);

        const sharesNeeded = new BigNumber(
          await ocean.getPoolSharesRequiredToUnstake(
            singleLiquidityPos.address,
            ocean.config.default.oceanTokenAddress,
            oceanFromPerc.toFixed(18)
          )
        );

        console.log("User shares from percentage", sharesNeeded);
        if (maxUnstake?.OCEAN?.gt(oceanFromPerc)) {
          console.log("User share input is less than max unstake");
          setOceanToReceive(oceanFromPerc);
          setSharesToRemove(sharesNeeded);
          setSharesPercToRemove(new BigNumber(val));
        } else {
          console.log("User share input is greater than max unstake");
          setOceanToReceive(max.OCEAN);
          setSharesToRemove(max.shares);
          setSharesPercToRemove(max.OCEAN.div(userTotalStakedOcean).times(100));
        }
        setBgLoading(removeBgLoadingState(bgLoading, bgLoadingStates.calcTrade));
      }
    } catch (error) {
      console.error(error);
    }
  };

  async function maxUnstakeHandler() {
    if (!setBgLoading || !bgLoading || !ocean || !singleLiquidityPos) return;
    setBgLoading([...bgLoading, bgLoadingStates.maxUnstake]);
    let max: IMaxUnstake | void;
    maxUnstake ? (max = maxUnstake) : (max = await getMaxUnstake());
    console.log("Max unstake is set at:", max);

    try {
      if (max && max.OCEAN.gt(0) && max.shares.gt(0)) {
        const userTotalStakedOcean: BigNumber = new BigNumber(
          await ocean.getOceanRemovedforPoolShares(singleLiquidityPos.address, singleLiquidityPos.shares)
        );

        console.log("Total user shares in ocean", userTotalStakedOcean);
        //find whether user staked oceans is greater or lesser than max unstake
        if (userTotalStakedOcean.gt(max?.OCEAN)) {
          setSharesToRemove(max.shares);
          setSharesPercToRemove(max.OCEAN.div(userTotalStakedOcean).times(100));
          setOceanToReceive(max.OCEAN);
          setBgLoading(removeBgLoadingState(bgLoading, bgLoadingStates.maxUnstake));
          return;
        } else {
          const sharesNeeded = new BigNumber(
            await ocean.getPoolSharesRequiredToUnstake(
              singleLiquidityPos.address,
              ocean.config.default.oceanTokenAddress,
              userTotalStakedOcean.toFixed(18)
            )
          );
          setSharesToRemove(sharesNeeded);
          setSharesPercToRemove(new BigNumber(100));
          setOceanToReceive(userTotalStakedOcean);
          setBgLoading(removeBgLoadingState(bgLoading, bgLoadingStates.maxUnstake));
        }
      }
    } catch (error) {
      console.error(error);
    }
  }

  const handleUnstake = async () => {
    if (!setShowConfirmModal || !chainId || !setTxHistory || !txHistory || !singleLiquidityPos || !ocean || !accountId)
      return;

    let txDateId;
    setShowConfirmModal(true);
    try {
      txDateId = addTxHistory({
        chainId,
        setTxHistory,
        txHistory,
        accountId: String(accountId),
        token1: singleLiquidityPos.token1Info,
        token2: singleLiquidityPos.token1Info,
        txType: "unstake",
        status: "pending",
        stakeAmt: sharesToRemove?.toFixed(5),
      });
      setLastTxId(txDateId);
      setPendingUnstakeTx(txDateId);
      console.log(
        `Unstaking from pool ${singleLiquidityPos.address}, ${toFixed18(
          singleLiquidityPos.shares
        )} shares for ${oceanToReceive?.toFixed(5)} OCEAN`
      );

      //shares needs to be to fixed 18, need types in global context
      const txReceipt = await ocean.unstakeOcean(
        accountId,
        singleLiquidityPos.address,
        oceanToReceive.toFixed(18),
        singleLiquidityPos.shares
      );

      if (txReceipt) {
        setRecentTxHash(ocean.config.default.explorerUri + "/tx/" + txReceipt.transactionHash);
        setTxReceipt(txReceipt);
        setPendingUnstakeTx(undefined);
        addTxHistory({
          chainId,
          setTxHistory,
          txHistory,
          accountId: String(accountId),
          token1: singleLiquidityPos.token1Info,
          token2: singleLiquidityPos.token1Info,
          txType: "unstake",
          txDateId,
          status: "indexing",
          txHash: txReceipt.transactionHash,
          stakeAmt: sharesToRemove?.toFixed(5),
          txReceipt,
        });

        console.log("Current Pool Address:", poolAddress);
        setSharesPercToRemove(new BigNumber(0));
        setOceanToReceive(new BigNumber(0));
        setSharesToRemove(new BigNumber(0));
      } else {
        throw new Error("Didn't receive a receipt.");
      }
    } catch (error: any) {
      console.error(error);
      setPendingUnstakeTx(undefined);
      const allNotifications = notifications;
      allNotifications.push({
        type: "alert",
        alert: {
          message: errorMessages(error),
          link: null,
          type: "alert",
        },
      });
      setNotifications([...allNotifications]);

      setShowConfirmModal(false);
      if (setShowTxDone) setShowTxDone(false);
      deleteRecentTxs({
        txDateId,
        setTxHistory,
        txHistory,
        chainId,
        accountId,
      });
      setSharesPercToRemove(new BigNumber(0));
      setOceanToReceive(new BigNumber(0));
      setSharesToRemove(new BigNumber(0));
    }
  };
  return (
    <div className="absolute top-0 w-full h-full">
      {noWallet ? (
        <UserMessage message="Connect your wallet to continue." pulse={false} container={true} timeout={null} />
      ) : singleLiquidityPos ? (
        <div className="flex w-full h-full items-center pt-16 px-2">
          <div id="removeStakeModal" className="w-107 mx-auto">
            <div className="mx-auto bg-black opacity-90 w-full rounded-lg p-3 hm-box">
              <div className="flex flex-row pb-2 justify-between">
                <div className="flex flex-row">
                  <img
                    src="https://gateway.pinata.cloud/ipfs/QmPQ13zfryc9ERuJVj7pvjCfnqJ45Km4LE5oPcFvS1SMDg/datatoken.png"
                    className="rounded-lg mr-2"
                    alt=""
                    width="40px"
                  />
                  <img
                    src="https://gateway.pinata.cloud/ipfs/QmY22NH4w9ErikFyhMXj9uBHn2EnuKtDptTnb7wV6pDsaY"
                    className="rounded-lg mr-2"
                    alt=""
                    width="40px"
                  />
                  {singleLiquidityPos ? (
                    <p className="text-type-100 text-sm md:text-lg">
                      {singleLiquidityPos?.token1Info.symbol}/{singleLiquidityPos?.token2Info.symbol}
                    </p>
                  ) : (
                    <PulseLoader color="white" size="4px" margin="5px" />
                  )}
                </div>
              </div>
              <div className="md:grid md:grid-cols-5 modalSelectBg p-2 rounded">
                <div className="col-span-2 grid grid-flow-col gap-4 justify-start items-center">
                  <p className="text-type-100">Amount to unstake</p>
                </div>
                <div className="col-span-3 flex justify-between mt-3 md:mt-0 bg-black bg-opacity-70 rounded-lg p-1">
                  <div className="flex w-full items-center">
                    {/* https://stackoverflow.com/a/58097342/6513036 and https://stackoverflow.com/a/62275278/6513036 */}
                    <span className={`text-2xl ${sharesToRemove ? "text-primary-400" : null}`}>
                      <DebounceInput
                        id="unstakeAmtInput"
                        step="1"
                        debounceTimeout={500}
                        onChange={(e) => updateNum(e.target.value)}
                        onWheel={(event: any) => event.currentTarget.blur()}
                        onKeyDown={(evt) => ["e", "E", "+", "-"].includes(evt.key) && evt.preventDefault()}
                        type="number"
                        className="h-full w-24 rounded-lg bg-black bg-opacity-0 text-2xl px-1 outline-none focus:placeholder-type-200 placeholder-type-400 text-right"
                        placeholder="0.00"
                        value={!sharesPercToRemove ? "" : sharesPercToRemove?.dp(2).toString()}
                        disabled={inputDisabled}
                        element={WrappedInput}
                        max={maxUnstake?.userPerc.dp(5).toString()}
                        data-test-max-perc={maxUnstake?.userPerc.dp(5).toString()}
                      />
                      %
                    </span>
                  </div>
                  <div>
                    <p id="sharesDisplay" className="text-sm text-type-400 whitespace-nowrap text-right">
                      {Number(singleLiquidityPos.shares) === 0
                        ? "Shares: 0"
                        : Number(singleLiquidityPos.shares) > 0.001
                        ? `Shares: ${toFixed5(singleLiquidityPos.shares)}`
                        : "Shares: < 0.001"}
                    </p>
                    <div className="text-sm text-type-300 grid grid-flow-col justify-end gap-2">
                      <Button
                        id="maxUnstakeBtn"
                        onClick={() => {
                          maxUnstakeHandler();
                        }}
                        disabled={
                          Number(singleLiquidityPos.shares) === 0 ||
                          bgLoading?.includes(bgLoadingStates.singlePoolData) ||
                          bgLoading?.includes(bgLoadingStates.maxUnstake) ||
                          bgLoading?.includes(bgLoadingStates.calcTrade)
                        }
                        text="Max Unstake"
                        classes={`px-2 lg:w-24 py-0 border  rounded-full text-xs ${
                          inputDisabled ||
                          Number(singleLiquidityPos.shares) === 0 ||
                          bgLoading?.includes(bgLoadingStates.singlePoolData) ||
                          bgLoading?.includes(bgLoadingStates.maxUnstake) ||
                          bgLoading?.includes(bgLoadingStates.calcTrade)
                            ? "text-gray-700 border-gray-700"
                            : "hover:bg-primary-600 border-type-300"
                        }`}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="px-4 relative mt-6 mb-8">
                <div className="rounded-full border-black border-4 absolute -top-7 bg-trade-darkBlue w-10 h-10 flex items-center justify-center swap-center">
                  {bgLoading?.includes(bgLoadingStates.singlePoolData) ||
                  bgLoading?.includes(bgLoadingStates.maxUnstake) ||
                  bgLoading?.includes(bgLoadingStates.calcTrade) ? (
                    <MoonLoader size={25} color={"white"} />
                  ) : (
                    <BsArrowDown size="30px" className="text-gray-300 m-0 p-0" />
                  )}
                </div>
              </div>
              <div className="flex modalSelectBg p-2 rounded items-center justify-between lg:justify-around">
                <div className="w-max h-full mr-4 flex">
                  <p className="text-type-100">You will receive</p>
                </div>
                <div className="bg-trade-darkBlue grid grid-flow-col gap-2 p-2 rounded-lg">
                  <div>
                    <img
                      src="https://gateway.pinata.cloud/ipfs/QmY22NH4w9ErikFyhMXj9uBHn2EnuKtDptTnb7wV6pDsaY"
                      className="w-12 rounded-lg"
                      alt=""
                    />
                  </div>
                  <div>
                    <p
                      data-test-max-ocean={maxUnstake?.OCEAN.dp(5).toString()}
                      id="oceanToReceive"
                      title={oceanToReceive.toString()}
                      className="text-type-100 w-20 overflow-hidden overflow-ellipsis whitespace-nowrap"
                    >
                      {oceanToReceive.lt(new BigNumber(0.00001)) ? 0 : oceanToReceive.toString() || 0}
                    </p>
                    <p className="text-xs text-type-100">{singleLiquidityPos?.token2Info.symbol}</p>
                  </div>
                </div>
              </div>
              <div className="flex mt-4">
                {/* <div className="bg-gradient"></div> */}
                <Button
                  id="executeUnstake"
                  text={btnText}
                  onClick={() => {
                    if (allowance.lt(oceanToReceive) && setShowUnlockTokenModal) {
                      setShowUnlockTokenModal(true);
                    } else if (setShowConfirmModal) {
                      setShowConfirmModal(true);
                      handleUnstake();
                    }
                  }}
                  classes={`px-4 py-2 rounded-lg w-full txButton`}
                  disabled={btnDisabled}
                />
              </div>
            </div>
            <div className="pt-3 pl-3">
              <Link
                id="remove-lp-link"
                to="/stake/list"
                className="text-gray-300 hover:text-gray-100 transition-colors"
              >
                {"<"} Back to liquidity position
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}

      {singleLiquidityPos ? (
        <UnlockTokenModal
          token1={{
            value: sharesToRemove,
            percentage: sharesPercToRemove,
            loading: false,
            info: { ...singleLiquidityPos.token1Info, pool: singleLiquidityPos.address },
            balance: new BigNumber(singleLiquidityPos.shares),
          }}
          token2={{
            value: new BigNumber(0),
            percentage: new BigNumber(0),
            loading: false,
            info: singleLiquidityPos.token1Info,
            balance: new BigNumber(0),
          }}
          setToken={setAllowance}
          nextFunction={() => {
            if (setShowConfirmModal) setShowConfirmModal(true);
            handleUnstake();
          }}
          remove={true}
        />
      ) : (
        <></>
      )}

      <ConfirmModal
        show={showConfirmModal ? showConfirmModal : false}
        close={() => {
          if (setShowConfirmModal) setShowConfirmModal(false);
        }}
        txs={
          singleLiquidityPos && sharesToRemove && oceanToReceive
            ? [
                `Unstake ${oceanToReceive.dp(5).toString()} ${singleLiquidityPos.token2Info.symbol} from the ${
                  singleLiquidityPos.token1Info.symbol
                } pool.`,
              ]
            : []
        }
      />
      <TransactionDoneModal
        show={showTxDone ? showTxDone : false}
        txHash={recentTxHash}
        close={() => {
          if (setShowTxDone) setShowTxDone(false);
        }}
      />

      {userMessage ? (
        <UserMessage
          message={userMessage}
          pulse={false}
          container={false}
          timeout={{ showState: setUserMessage, time: 5000 }}
        />
      ) : null}
    </div>
  );
};
export default RemoveAmount;
