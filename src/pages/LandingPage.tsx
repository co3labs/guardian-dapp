import { Link } from 'react-router-dom';
import heros from '../assets/heros.png';

export default function LandingPage() {
  return (
    <div className="flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <div className="mr-8">
        <img src={heros} alt="multiple_users" className="w-96" />
      </div>
      <div>
        <h2 className="text-5xl mb-4">Guardians of your legacy</h2>
        <h3 className="text-xl font-light  mb-8">Secure your online legacy with guardians.</h3>
        <Link to="app/welcome" className="rounded-sm border border-black px-5 py-1 ">
          Enter App
        </Link>
      </div>
    </div>
  );
}
