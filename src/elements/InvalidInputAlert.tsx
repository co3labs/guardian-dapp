import { BsXCircle } from 'react-icons/bs';

export default function InvalidInputAlert({ message, condition }: { message: string; condition: boolean }) {
  return condition ? (
    <div className="absolute flex items-center text-red-500 text-xs ">
      <BsXCircle />
      <span className="ml-2">{message}</span>
    </div>
  ) : (
    <></>
  );
}
