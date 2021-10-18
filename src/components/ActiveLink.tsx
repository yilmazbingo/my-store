import React, { Children } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { UrlObject } from "url";

interface ActiveLinkProps {
  activeClassName?: string;
  href: string | UrlObject;
}

// children is the <a>, prop is the "href"
const ActiveLink: React.FC<ActiveLinkProps> = ({ children, ...props }) => {
  const router = useRouter();
  // this will make sure i m passing only one child so i will access the its props easily
  const child = Children.only(children) as React.ReactElement;
  let className = child.props ? child.props.className : "";

  if (router.asPath === props.href && props.activeClassName) {
    className = `${className} ${props.activeClassName}`;
  }

  delete props.activeClassName;

  return (
    <Link href={props.href}>{React.cloneElement(child, { className })}</Link>
  );
};

export default ActiveLink;

//ReactNode is used as return type for render() in class components. It also is the default type for children attribute with PropsWithChildren.
// ReactElement and JSX.Element are the result of invoking React.createElement
