import React, { ReactElement } from "react";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

export default function Container({ className, children }: ContainerProps): ReactElement {
  return <div className={`bg-white rounded-3xl flex ${className}`}>{children}</div>;
}
