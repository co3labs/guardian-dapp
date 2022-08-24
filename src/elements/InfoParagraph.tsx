import { BsInfoCircle } from 'react-icons/bs';

export default function InfoParagraph({ text, tailwindMaxW = 'max-w-2xl' }: { text: string; tailwindMaxW?: string }) {
  return (
    <div className={`text-xs text-gray-400 flex ${tailwindMaxW}`}>
      <span className="mr-2 pt-1">
        <BsInfoCircle />
      </span>
      <p>{text}</p>
    </div>
  );
}
