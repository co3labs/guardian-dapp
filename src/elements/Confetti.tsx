import ReactConfetti from 'react-confetti';

export default function Confetti() {
  const height = window.innerHeight;
  const width = window.innerWidth;

  return <ReactConfetti width={width} height={height} numberOfPieces={1000} gravity={0.2} recycle={false} />;
}
