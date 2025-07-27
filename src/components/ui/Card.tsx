import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  padding?: "none" | "sm" | "md" | "lg";
  hover?: boolean;
}

export const Card = ({
  children,
  className = "",
  padding = "md",
  hover = false,
}: CardProps) => {
  const paddingClasses = {
    none: "",
    sm: "p-4",
    md: "p-6",
    lg: "p-8",
  };

  return (
    <div
      className={`
      bg-white rounded-lg border border-slate-200 shadow-sm
      ${hover ? "hover:shadow-md transition-shadow duration-200" : ""}
      ${paddingClasses[padding]}
      ${className}
    `}
    >
      {children}
    </div>
  );
};

interface CardHeaderProps {
  children: ReactNode;
  className?: string;
}

export const CardHeader = ({ children, className = "" }: CardHeaderProps) => {
  return <div className={`mb-4 ${className}`}>{children}</div>;
};

interface CardContentProps {
  children: ReactNode;
  className?: string;
}

export const CardContent = ({ children, className = "" }: CardContentProps) => {
  return <div className={className}>{children}</div>;
};

interface CardFooterProps {
  children: ReactNode;
  className?: string;
}

export const CardFooter = ({ children, className = "" }: CardFooterProps) => {
  return <div className={`mt-4 ${className}`}>{children}</div>;
};
