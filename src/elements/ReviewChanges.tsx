import { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';

export default function ReviewChanges() {
  const { currentVaultEdits } = useContext(GlobalContext);

  //? show previous vault here ?
  return currentVaultEdits ? (
    <div>
      {Object.entries(currentVaultEdits?.guardianList).map(([id, {name, address}]) => (
        <div>{name}{" "}{address}</div>
      ))}
    </div>
  ) : (
    <>{/**TODO: Throw / show an error here */}</>
  );
}
