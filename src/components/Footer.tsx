import { useEffect, useState, useContext } from 'react';
import { FaBook, FaDotCircle } from 'react-icons/fa';
import { getCommitInfo } from '../utils/gitInfo';
import { GlobalContext } from '../context/GlobalState';
import SocialLinkIcons from './SocialLinkIcons';

export default function Footer() {
  const { web3 } = useContext(GlobalContext);
  // console.log(web3);
  const [blockNo, setBlockNo] = useState(0);

  useEffect(() => {
    async function getBlockNumber() {
      if (web3) setBlockNo(await web3.eth.getBlockNumber());
    }
    getBlockNumber();
  }, [web3]);

  return <footer className="absolute bottom-0 pb-2 w-full mt-5 hidden lg:block text-xs">
      <div className="flex flex-col text-center  px-4">
        {/* <ul className="inline-flex text-2xl justify-center">
          <SocialLinkIcons effect="color" />
          <li className="list-inline-item ml-2 self-center hover:text-primary-300">
            <a title="DataX Docs" href="https://docs.datapolis.city/" target="_blank" rel="noreferrer">
              <FaBook size="26px" />
            </a>
          </li>
        </ul> */}
        <div className="grid grid-cols-2 w-full px-2">
          <div className="flex items-center">
            <p className="w-auto lg:flex hidden text-xs">{getCommitInfo()} </p>
          </div>
          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2">
            <div className="flex justify-center overflow-visible">
              <p>© Hashmesh Labs 2022</p>
            </div>
          </div>
          <div className="flex text-blue-300 text-xs justify-end items-center">
            <p className="pr-2">{blockNo > 0 ? blockNo : ''}</p>
            {/* className="animate-ping" */}
            <FaDotCircle size="12px" />
          </div>
        </div>
      </div>
    </footer>
}
