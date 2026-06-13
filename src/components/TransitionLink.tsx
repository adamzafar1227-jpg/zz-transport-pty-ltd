import React from "react";
import { useTransitionRouter } from "./PageTransition";

export interface TransitionLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  id?: string;
  key?: React.Key;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

export default function TransitionLink({
  href,
  children,
  className = "",
  onClick,
  id,
}: TransitionLinkProps) {
  const { currentPath, navigate } = useTransitionRouter();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onClick) {
      onClick(e);
    }
    
    e.preventDefault();
    if (href.startsWith("#") || href.startsWith("/")) {
      // Small 50ms delay to let the animation coordinate first
      setTimeout(() => {
        navigate(href);
      }, 50);
    } else {
      window.open(href, "_blank", "noopener,noreferrer");
    }
  };

  const isActive = currentPath === href;

  return (
    <a
      href={href}
      id={id}
      onClick={handleClick}
      className={`cursor-pointer select-none transition-all duration-300 ${className} ${
        isActive ? "text-[#F5A623] font-bold" : ""
      }`}
    >
      {children}
    </a>
  );
}
