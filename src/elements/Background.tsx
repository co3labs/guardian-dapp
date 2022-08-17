import { useContext, useEffect } from 'react';
import { GlobalContext } from '../context/GlobalState';
import logo from '../assets/grayscale.png';

export default function Background() {
  const { location } = useContext(GlobalContext);

  useEffect(() => {
    console.log(location?.pathname, location?.pathname === '/');
  }, [location]);

  return (
    <>
      {' '}
      <img
        src={logo}
        className={`absolute z-0 -translate-x-1/3 translate-y-1/2 transition-all select-none pointer-events-none ${
          location?.pathname === '/' || !location?.pathname ? 'opacity-5 contrast-0 drop-shadow-xl' : 'opacity-25 contrast-100'
        }`}
      />

      <img
        src={logo}
        className={`absolute right-0 top-0 z-0 translate-x-1/3  transition-all -translate-y-1/4 select-none pointer-events-none ${
          location?.pathname === '/' || !location?.pathname ? 'opacity-5 contrast-0 drop-shadow-xl' : 'opacity-25 contrast-100'
        }`}
      />
    </>
  );
}
