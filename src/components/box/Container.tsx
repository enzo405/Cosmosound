import React, { ReactElement } from "react";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

export default function Container({ className, children }: ContainerProps): ReactElement {
  return (
    <div className={`bg-white rounded-3xl h-full flex p-6 md:p-8 ${className}`}>{children}</div>
  );
}
