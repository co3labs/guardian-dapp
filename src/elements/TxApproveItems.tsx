import { BsCheck } from 'react-icons/bs';
import { ITxState } from '../@types/types';

export default function TxApproveItems({
  object,
  isGuardians,
}: {
  object: { [title: string]: boolean } | ITxState;
  isGuardians: boolean;
}) {
  console.log(object);

  return (
    <>
      {Object.entries(object).map(([title, value], index) => {
        if (!isGuardians) {
          if (index === 0 || index === 4) return <></>;
        }
        return (
          <p className="py-2 flex items-center">
            <span className="mr-1">{value ? <BsCheck /> : index + (isGuardians ? 4 : 0) + '.'}</span>{' '}
            <span>{isGuardians ? 'Add ' + title : title}</span>{' '}
          </p>
        );
      })}
    </>
  );
}
