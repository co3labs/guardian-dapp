import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="absolute left-0 right-0 top-0 bottom-0 bg-gray-100 z-30 flex justify-center items-center">
      <div className='w-2/3 h-1/4 border border-red-400 flex flex-col justify-center items-center rounded-sm'>
        <span className='mb-4'> 404: Page Not Found</span>
        <Link to="/app/welcome" className="btnPrimary btnBig">
          Go back to home
        </Link>
      </div>
    </div>
  );
}
