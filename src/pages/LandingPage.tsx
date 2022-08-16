import { Link } from 'react-router-dom';
import heros from '../assets/heros.png';

export default function LandingPage() {
  return (
    <>
      <div className="flex w-full h-full justify-center items-center">
        <div className="mr-8">
          <img src={heros} alt="heros" className="w-[32rem]" />
        </div>
        <div>
          <h2 className="text-6xl mb-4">Guardians of Your Legacy</h2>
          <h3 className="text-xl font-light mb-8">Secure your online legacy with guardians.</h3>
          <Link to="app/welcome" className="btnPrimary btnBig">
            Enter App
          </Link>
        </div>
      </div>
    </>
  );
}
