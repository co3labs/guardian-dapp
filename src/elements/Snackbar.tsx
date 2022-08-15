import { useContext, useEffect, useState } from 'react';
import { GlobalContext } from '../context/GlobalState';

export default function Snackbar() {
  const [showSnackbarItem, setShowSnackbarItem] = useState(false);
  const [currentSnackbarItem, setCurrentSnackbarItem] = useState("'testing123'");
  const { globalSnackbarQue, setGlobalSnackbarQue } = useContext(GlobalContext);

  useEffect(() => {
    if (globalSnackbarQue.length && !showSnackbarItem) {
      const snackbarQue = [...globalSnackbarQue];
      const latestItem = snackbarQue.pop();
      console.log(latestItem)
      if (latestItem) {
        setCurrentSnackbarItem(latestItem);
        setShowSnackbarItem(true);
      }
    }
  }, [globalSnackbarQue.length, showSnackbarItem]);

  useEffect(() => {
    setTimeout(() => {
      setShowSnackbarItem(false);
      const snackbarQue = [...globalSnackbarQue];
      snackbarQue.pop();
      setGlobalSnackbarQue([...snackbarQue]);
    }, 5000);
  }, [showSnackbarItem]);

  return (
      <div className={`absolute btnSecondary z-30 btnSmall transition-transform transform right-0 top-16 ${showSnackbarItem ? '-translate-x-2' : 'translate-x-[125%]'}`}>
        {currentSnackbarItem}
      </div>
  );
}
