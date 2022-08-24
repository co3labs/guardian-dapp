import { useContext } from 'react';
import ReactConfetti from 'react-confetti';
import { GlobalContext } from '../context/GlobalState';

export default function Confetti() {
  const { setShowConfetti } = useContext(GlobalContext);
  const height = window.innerHeight;
  const width = window.innerWidth;

  return (
    <ReactConfetti
      width={width}
      height={height}
      numberOfPieces={1000}
      gravity={0.2}
      recycle={false}
      onConfettiComplete={() => {
        setShowConfetti(false);
      }}
      className= "relative z-30"
    />
  );
}
