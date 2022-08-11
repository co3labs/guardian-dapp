import React from 'react';

export default function ManageVaultContainer(props: React.PropsWithChildren) {
  return (
    <div className="w-full h-full flex justify-center items-center py-12 px-4 md:px-12 lg:px-0">
      <div className="rounded-sm flex flex-col w-full lg:w-2/3 xl:w-1/2">{props.children}</div>
    </div>
  );
}
