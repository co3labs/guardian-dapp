import { IoWarningOutline } from 'react-icons/io5';
export default function CannotContinueError({ render, message }: { render: boolean; message: string }) {
  return render ? (
    <></>
  ) : (
    <div className="border font-light text-red-500 border-red-400 py-2 px-4 max-w-xs text-sm flex items-center justify-center rounded-sm">
      <div className='flex-grow mr-4 '>
        <IoWarningOutline className="text-2xl" />
      </div>
      <p>{message}</p>
    </div>
  );
}
