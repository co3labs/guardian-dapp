import { Link } from 'react-router-dom';
import heros from '../assets/heros.png';

export default function LandingPage() {
  return (
    <>
      <div className="flex w-full h-full justify-center items-center mt-6">
        <div className='flex justify-center items-center border border-gray-200 shadow-lg'>
          <div className="md:mr-8 bg-gray-50 pl-8 py-8">
            <img src={heros} alt="heros" className="w-[32rem]" />
          </div>
          <div className="flex flex-col items-center md:items-start pr-8">
            <h2 className="text-3xl md:text-6xl mb-4">Guardians of Your Legacy</h2>
            <h3 className="text-base md:text-xl font-light mb-8">Secure your online legacy with guardians.</h3>
            <Link to="app/welcome" className="btnPrimary btnBig">
              Enter App
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
