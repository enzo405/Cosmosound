import { ReactElement } from "react";

export default function Divider({
  className,
  ...props
}: React.HTMLAttributes<HTMLHRElement>): ReactElement {
  return <hr className={`border border-settings-divider w-auto my-2 ${className}`} {...props} />;
}
