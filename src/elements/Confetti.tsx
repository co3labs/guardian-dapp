import { useContext } from 'react';
import ReactConfetti from 'react-confetti';
import { useNavigate } from 'react-router-dom';
import { GlobalContext } from '../context/GlobalState';

export default function Confetti() {
  const { setShowConfetti, location } = useContext(GlobalContext);
  const height = window.innerHeight;
  const width = window.innerWidth;
  const navigate = useNavigate();

  return (
    <ReactConfetti
      width={width}
      height={height}
      numberOfPieces={1000}
      gravity={0.2}
      recycle={false}
      onConfettiComplete={() => {
        if (location?.pathname === '/app/create' || location?.pathname === '/app/update') {
          navigate('/app/manage');
        }
        setShowConfetti(false);
      }}
      className="relative z-50"
    />
  );
}
