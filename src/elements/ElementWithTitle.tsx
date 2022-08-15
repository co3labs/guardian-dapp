export default function ElementWithTitle({
  title,
  element,
  tailwindColor = 'bg-white',
}: {
  title: string;
  element: JSX.Element;
  tailwindColor?: string;
}) {
  return (
    <div className="relative">
      <div className={`absolute top-0 left-5 -translate-y-1/2 px-1 text-xs text-gray-400`}>
        <div className={`absolute z-10 top-0 bottom-1/2 right-0 left-0 ${tailwindColor} translate-y-2px`} />
        <span className="relative z-20">{title}</span>
      </div>
      {element}
    </div>
  );
}
