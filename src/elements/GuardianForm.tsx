import { useContext, useEffect, useState } from 'react';
import { BsChevronDown } from 'react-icons/bs';
import OutsideClickHandler from 'react-outside-click-handler';
import { useNavigate } from 'react-router-dom';
import { IGuardianInfo, IGuardianList } from '../@types/types';
import { GlobalContext } from '../context/GlobalState';
import BackOrContinueBtns from './BackOrContinueBtns';
import GuardianInput from './GuardianInput';

export default function GuardianForm() {
  const { currentVaultEdits, setCurrentVaultEdits, updateAndGoHome, location } = useContext(GlobalContext);
  const [openThresholdSelect, setOpenThresholdSelect] = useState(false);
  const [formIsValid, setFormIsValid] = useState(false);
  const [validating, setValidating] = useState(false);
  const [duplicate, setDuplicate] = useState<number[]>();
  const navigate = useNavigate();
  useEffect(() => {
    const culprit = Object.values(currentVaultEdits.guardianList).find(
      (guardian) =>
        !guardian.name || !guardian.address || guardian.address.match(/[^A-Za-z0-9]/) || guardian.address.length !== 42
    );

    const checked: string[] = [];
    let duplicateCheck: number[] | undefined;
    const currentList: IGuardianList = Object.values(currentVaultEdits.guardianList);
    const currentListValues: IGuardianInfo[] = Object.values(currentList);

    for (let i = 0; i < currentListValues.length; i++) {
      const checking = currentListValues[i].address;
      const match = checked.findIndex((address) => address === checking && address !== '');
      if (match >= 0) {
        duplicateCheck = [match, i];
        setDuplicate([match, i]);
      } else {
        checked.push(checking);
      }
    }

    if (!duplicateCheck) {
      setDuplicate(undefined);
    }

    if (culprit || duplicateCheck) {
      setFormIsValid(false);
    } else {
      setFormIsValid(true);
    }
    setValidating(false);
  }, [currentVaultEdits.guardianList, currentVaultEdits.guardianCount]);

  useEffect(() => {
    const count = currentVaultEdits.guardianCount;
    if (currentVaultEdits.threshold > count && count > 0)
      setCurrentVaultEdits({ ...currentVaultEdits, threshold: count });
  }, [currentVaultEdits.guardianCount, currentVaultEdits.threshold]);

  return (
    <>
      <div className="flex flex-col h-full m-6">
        <p className="font-light">Add Guardians</p>

        {Object.entries(currentVaultEdits.guardianList).map(
          ([id, guardian]: [string, IGuardianInfo], index: number) => (
            <GuardianInput
              id={id}
              guardian={guardian}
              index={index}
              setDuplicate={setDuplicate}
              setIsLoading={setValidating}
              duplicate={duplicate}
            />
          )
        )}
      </div>

      <div className="mx-6">
        <div className="w-full flex justify-end">
          <button
            className="btn btnSmall btnSecondary w-fit"
            type="button"
            onClick={() => {
              setCurrentVaultEdits({
                ...currentVaultEdits,
                guardianCount: currentVaultEdits.guardianCount + 1,
                guardianList: {
                  ...currentVaultEdits.guardianList,
                  [currentVaultEdits.guardianCount]: {
                    name: '',
                    address: '',
                  },
                },
              });
            }}
          >
            + Add Another Guardian
          </button>
        </div>
        <div className="w-full h-1px bg-gray-400 my-4" />
        <div className="my-4 font-light">
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
              {openThresholdSelect && currentVaultEdits.guardianCount > 0 ? (
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
            <span>out of {currentVaultEdits.guardianCount} guardian(s)</span>
          </div>
        </div>
      </div>
      <BackOrContinueBtns
        exitBtn={true}
        onClick={() => (location ? updateAndGoHome(navigate, location) : () => {})}
        confirmText={
          <span>
            Update <span className="hidden md:block">Guardians {'&'} Threshold</span>
            <span className="md:hidden">Vault</span>{' '}
          </span>
        }
        conditionNext={formIsValid}
      />
      {/* {validating ? <MoonLoader /> : <></>}{' '} */}
    </>
  );
}
