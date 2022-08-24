import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import GitInfo, { GitCommitInformation } from 'react-git-info/macro';
export default function Footer() {
  const links = [['Hashmesh Labs © 2022'], ['GitHub', 'https://github.com/hashmesh'], ['v1.0.0beta']];
  function getCommitInfo(): GitCommitInformation {
    const gitInfo = GitInfo();
    return gitInfo.commit;
  }

  const { data } = useQuery(['git_info'], getCommitInfo);

  return (
    <footer className="pb-2 w-full mt-5 hidden lg:block text-xs text-gray-500">
      <ul className="flex justify-center overflow-visible">
        <p></p>
        {links.map((link: string[], index: number) => (
          <li className="">
            {index > 0 ? <span className="mx-2">|</span> : <></>}
            {link[1] ? (
              <a className="hover:text-blue-800" href={link[1]}>
                {link[0]}
              </a>
            ) : (
              link[0]
            )}
          </li>
        ))}
        <li>
          <span className="mx-2">|</span>
          <a className="hover:text-blue-800" href={`https://github.com/hashmesh/guardian-dapp/commit/${data?.hash}`}>
            {data?.shortHash}
          </a>
        </li>
      </ul>
    </footer>
  );
}
