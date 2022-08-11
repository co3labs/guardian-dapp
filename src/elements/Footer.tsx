import { useEffect, useState, useContext } from 'react';
import { FaDotCircle } from 'react-icons/fa';
import { getCommitInfo } from '../utils/gitInfo';
import { GlobalContext } from '../context/GlobalState';

export default function Footer() {
  const links = [
    ['Hashmesh Labs © 2022'],
    ['Terms'],
    ['Privacy'],
    ['Licenses'],
    ['Cookie Policy'],
    ['Preferences'],
    ['v1.0.0beta'],
  ];

  return (
    <footer className="pb-2 w-full mt-5 hidden lg:block text-xs">
      <ul className="flex justify-center overflow-visible">
        <p></p>
        {links.map((link: string[], index: number) => (
          <li className="">
            {index > 0 ? <span className="mx-2">|</span> : <></>}
            {link[1] ? <a href={link[1]}>{link[0]}</a> : link[0]}
          </li>
        ))}
      </ul>
    </footer>
  );
}
