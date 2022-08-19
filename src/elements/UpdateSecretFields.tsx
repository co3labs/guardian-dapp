import { useContext, useState } from 'react';
import { GlobalContext } from '../context/GlobalState';
import StandardInput from './StandardInput';

export default function UpdateSecretFields({
  renderFields,
}: {
  renderFields: { old: boolean; secret: boolean; updateSecret: boolean };
}) {
  const { currentVaultEdits, location } = useContext(GlobalContext);
  const [showSecret, setShowSecret] = useState(false);
  const [showOldSecret, setShowOldSecret] = useState(false);
  const { old, updateSecret, secret } = renderFields;
  // old && updateSecret
  return (
    <>
      {' '}
      <div>
        {old && updateSecret ? (
          <StandardInput
            title="Old Recovery Secret"
            elementTitle="Secret"
            value={currentVaultEdits.oldSecret}
            id="recovery_vault_secret"
            placeholder="0x0"
            type={showOldSecret ? 'text' : 'password'}
            info="Your old vault recovery secret."
            paramName="oldSecret"
            className="md:w-96"
            maxLength={180}
            passStates={{ show: showOldSecret, setShow: setShowOldSecret }}
          />
        ) : (
          <></>
        )}
      </div>
      {(secret && !old) || (secret && old && updateSecret) ? (
        <StandardInput
          title={`${location?.pathname === '/app/create' ? '' : 'New'} Recovery Secret`}
          elementTitle="Secret"
          value={currentVaultEdits.newSecret}
          id="recovery_vault_secret"
          placeholder="0x0"
          type={showSecret ? 'text' : 'password'}
          info="Set a recovery secret that will be needed anytime a recovery process occurs. This secret will be needed to transfer ownership."
          paramName="newSecret"
          maxLength={180}
          passStates={{ show: showSecret, setShow: setShowSecret }}
          className="md:w-96"
        />
      ) : (
        <></>
      )}
    </>
  );
}
// (secret && !old) || (secret && old && updateSecret)
