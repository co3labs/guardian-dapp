import { Link } from 'react-router-dom';
import heros from '../assets/heros.png';
import logo from '../assets/logo.png';

export default function LandingPage() {
  return (
    <>
      <div className="flex w-full h-full justify-center items-center mt-6">
        <img src={heros} alt="heros" className="w-[28rem]" />
        <div className="flex flex-col items-center font-ubuntu md:items-start pr-8 ml-10">
          <h2 className="text-3xl md:text-6xl mb-4 font">
            {' '}
            <img src={logo} className="w-[32rem]" />
            <span className='my-12'>of Your Legacy</span>
          </h2>
          <h3 className="text-base md:text-xl font-light mb-8">Secure your online legacy with guardians.</h3>
          <Link to="app/welcome" className="btnPrimary btnBig">
            Enter App
          </Link>
        </div>
      </div>
    </>
  );
}
