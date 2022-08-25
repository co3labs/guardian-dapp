import { Link } from 'react-router-dom';
import heros from '../assets/heros.png';
import logo from '../assets/logo.png';

export default function LandingPage() {
  return (
    <>
      <div className="flex w-full h-full flex-col md:flex-row justify-center items-center mt-6">
        <img src={heros} alt="heros" className="w-72 md:w-[28rem]" />
        <div className="flex flex-col items-center font-ubuntu md:items-start pr-8 ml-10">
          <img src={logo} className="w-[32rem]" />
          <h2 className="text-3xl md:text-6xl">
            <span className="text-3xl md:text-6xl">of Your Legacy</span>
          </h2>

          <h3 className="text-xl md:text-2xl font-light my-12">Secure your online legacy with guardians.</h3>
          <Link to="app/welcome" className="btnPrimary btnBig">
            Enter App
          </Link>
        </div>
      </div>
    </>
  );
}
