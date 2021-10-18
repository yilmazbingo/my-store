import React from "react";
import ActiveLink from "../ActiveLink";
import { UrlObject } from "url";

interface ButtonLinkProps {
  href: string | UrlObject;
  title?: string;
  className?: string;
}
const ButtonLink: React.FC<ButtonLinkProps> = ({ href, title, className }) => {
  return (
    <ActiveLink href={href}>
      <button className={className}> {title} </button>
    </ActiveLink>
  );
};

export default ButtonLink;
