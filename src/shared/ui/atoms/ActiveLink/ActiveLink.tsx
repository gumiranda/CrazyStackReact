import Link, { LinkProps } from "next/link";
import { usePathname } from "next/navigation";
import { cloneElement, ReactElement } from "react";
interface ActiveLinkProps extends LinkProps {
  children: ReactElement<{ color?: string }>;
  shouldMatchExactHref?: boolean;
}
export const ActiveLink = ({
  children,
  shouldMatchExactHref,
  ...rest
}: ActiveLinkProps) => {
  const pathname = usePathname();
  let isActive = false;
  if (shouldMatchExactHref && (pathname === rest.href || pathname === rest.as)) {
    isActive = true;
  }
  if (
    pathname &&
    !shouldMatchExactHref &&
    (pathname.startsWith(String(rest.href)) || pathname.startsWith(String(rest.as)))
  ) {
    isActive = true;
  }
  return (
    <Link {...rest}>
      {cloneElement(children, {
        color: isActive ? "tertiary.300" : "purple.50",
      })}
    </Link>
  );
};
