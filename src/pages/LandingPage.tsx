import { Link } from 'react-router-dom';
import heros from '../assets/heros.png';

export default function LandingPage() {
  return (
    <>
      <div className="flex flex-col px-4 md:flex-row w-full h-full justify-center items-center">
        <div className="md:mr-8">
          <img src={heros} alt="heros" className="w-[32rem]" />
        </div>
        <div className='flex flex-col items-center md:items-start'>
          <h2 className="text-3xl md:text-6xl mb-4">Guardians of Your Legacy</h2>
          <h3 className="text-base md:text-xl font-light mb-8">Secure your online legacy with guardians.</h3>
          <Link to="app/welcome" className="btnPrimary btnBig">
            Enter App
          </Link>
        </div>
      </div>
    </>
  );
}
