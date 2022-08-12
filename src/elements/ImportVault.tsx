import { BsInfoCircle } from 'react-icons/bs';
import BackOrContinueBtns from './BackOrContinue';

export default function ImportVault() {
  return (
    <div>
      <form className="mt-12">
        <label htmlFor="import_by_address">Import your vaults by entering thier ERC725 address.</label>
        <p className="text-gray-400 text-xs flex items-center">
          <BsInfoCircle />{' '}
          <span className="ml-2"> Make sure you are connected to the same chain your vault is on.</span>
        </p>
        <input type="text" className='mt-6' />
      </form>
      <BackOrContinueBtns back="/app/welcome" />
    </div>
  );
}
