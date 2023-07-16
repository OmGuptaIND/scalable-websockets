import React from "react";
import { cn } from "~/utils";

interface Props {
  children?: React.ReactNode;
  className?: string;
}

const FullPageLayout: React.FC<Props> = ({ children, className }) => {
  return <div className={cn("bg-black", className)}>{children}</div>;
};

export default FullPageLayout;
