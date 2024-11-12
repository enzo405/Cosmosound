import React, { ReactElement } from "react";

interface BoxProps {
  title: string;
  children: React.ReactNode;
}

export default function Box({ title, children }: BoxProps): ReactElement {
  return (
    <div className="bg-box-bg rounded-3xl h-min w-full flex flex-col pl-4">
      <div className="w-full flex py-4">
        <span className="mr-auto text-lg font-bs font-light">{title}</span>
      </div>
      <div className="flex flex-nowrap overflow-x-scroll w-full scroll-smooth">{children}</div>
    </div>
  );
}
