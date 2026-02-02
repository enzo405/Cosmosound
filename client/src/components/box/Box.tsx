import React, { ReactElement } from "react";
import { titleStyle } from "./styles";

interface BoxProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export default function Box({ title, children, className }: BoxProps): ReactElement {
  return (
    <div className="bg-box-bg rounded-3xl h-full w-full flex flex-col pb-4">
      {title && (
        <div className="w-full h-min flex py-6 pl-4">
          <span className={`${titleStyle}`}>{title}</span>
        </div>
      )}
      <div className={`flex w-full px-2 sm:px-4 gap-2 ${className}`}>{children}</div>
    </div>
  );
}
