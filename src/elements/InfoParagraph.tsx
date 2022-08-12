import { BsInfoCircle } from 'react-icons/bs';

export default function InfoParagraph({text}:{text:string}) {
  return (
    <div className="text-xs max-w-md text-gray-400 flex items-center">
      <span className='mr-2'>
        <BsInfoCircle />
      </span>
      <p>
        {text}
      </p>
    </div>
  );
}
