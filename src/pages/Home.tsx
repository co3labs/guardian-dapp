import { Link } from 'react-router-dom';
import users from '../assets/users.png';

export default function Home() {
  return (
    <div className="flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <div className='mr-8'>
        <h2 className="text-4xl max-w-xs mb-8">Retain control and manage safe access to funds with universal accounts</h2>
        <Link to="app/welcome" className="btn btnBig">Enter App</Link>
      </div>
      <div>
        <img style={{filter: "contrast(0%)",}} src={users} alt="multiple_users" className='w-96'/>
      </div>
    </div>
  );
}
