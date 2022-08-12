import { useContext, useEffect, useState } from 'react';
import { BsChevronDown, BsTrash, BsXCircle } from 'react-icons/bs';
import OutsideClickHandler from 'react-outside-click-handler';
import { MoonLoader } from 'react-spinners';
import { IGuardianInfo, IGuardianList, IVaultInfo } from '../@types/types';
import { GlobalContext } from '../context/GlobalState';
import BackOrContinueBtns from './BackOrContinue';
import GuardianInput from './GuardianInput';
import InvalidInputAlert from './InvalidInputAlert';

export default function GuardianForm() {
  const { currentVaultEdits, accountId, setCurrentVaultEdits } = useContext(GlobalContext);
  const [guardianCount, setGuardianCount] = useState(Object.keys(currentVaultEdits.guardianList).length);
  const [openThresholdSelect, setOpenThresholdSelect] = useState(false);
  const [formIsValid, setFormIsValid] = useState(false);
  const [validating, setValidating] = useState(false);

  useEffect(() => {
    const culprit = Object.values(currentVaultEdits.guardianList).find(
      (guardian) => !guardian.name || !guardian.address
    );

    console.log("Culprit ", culprit);
    
    if (!culprit) {
      setFormIsValid(true);
    } else {
      setFormIsValid(false);
    }
    setValidating(false);
  }, [currentVaultEdits.guardianList, guardianCount]);

  useEffect(() => {
    setGuardianCount(Object.keys(currentVaultEdits.guardianList).length);
  }, []);

  useEffect(() => {
    if (currentVaultEdits.threshold > guardianCount && guardianCount > 0)
      setCurrentVaultEdits({ ...currentVaultEdits, threshold: guardianCount });
  }, [guardianCount, currentVaultEdits.threshold]);

  return (
    <>
      <form
        className="flex flex-col h-full p-4"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <div className="flex flex-col h-full">
          <div className="grid grid-flow-col">
            <p>Name</p>
            <p>Address</p>
          </div>
          {Object.entries(currentVaultEdits.guardianList).map(
            ([id, guardian]: [string, IGuardianInfo], index: number) => (
              <GuardianInput
                id={id}
                guardian={guardian}
                index={index}
                setGuardianCount={setGuardianCount}
                guardianCount={guardianCount}
                setIsLoading={setValidating}
              />
            )
          )}
        </div>

        <button
          className="btn btnSmall btnSecondary w-fit"
          type="button"
          onClick={() => {
            setCurrentVaultEdits({
              ...currentVaultEdits,
              guardianList: {
                ...currentVaultEdits.guardianList,
                [guardianCount]: {
                  name: '',
                  address: '',
                },
              },
            });
            setGuardianCount(guardianCount + 1);
          }}
        >
          + Add Another Guardian
        </button>
        <div className="my-4">
          <p>Any transaction requires the confirmation of:</p>
          <div className="flex items-center">
            <button
              type="button"
              onClick={() => setOpenThresholdSelect(!openThresholdSelect)}
              className="relative flex items-center p-2 border rounded-sm mr-3 my-4"
            >
              <span className="mr-3">{currentVaultEdits.threshold}</span>
              <span>
                <BsChevronDown />
              </span>
              {openThresholdSelect && guardianCount > 0 ? (
                <OutsideClickHandler
                  onOutsideClick={() => {
                    setOpenThresholdSelect(false);
                  }}
                >
                  <ul className="absolute left-0 right-0 bottom-0 border rounded-sm bg-white max-h-96 overflow-scroll no-scrollbar">
                    {Object.keys(currentVaultEdits.guardianList).map((_: string, index: number) => (
                      <li
                        onClick={() => {
                          setCurrentVaultEdits({ ...currentVaultEdits, threshold: index + 1 });
                          setOpenThresholdSelect(false);
                        }}
                        className="my-2 hover:bg-gray-200"
                      >
                        {index + 1}
                      </li>
                    ))}
                  </ul>
                </OutsideClickHandler>
              ) : (
                <></>
              )}
            </button>
            <span>out of {guardianCount} guardian(s)</span>
          </div>
        </div>
        <div className="flex items-center">
          <BackOrContinueBtns conditionNext={formIsValid} />
          {/* {validating ? <MoonLoader /> : <></>}{' '} */}
        </div>
      </form>
    </>
  );
}
