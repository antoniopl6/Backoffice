'use client';
import NextLink, { LinkProps as NextLinkProps } from 'next/link';
import {
  CSSProperties,
  ComponentProps,
  PropsWithChildren,
  useMemo,
} from 'react';

export type NavLinkProps = NextLinkProps &
  PropsWithChildren & {
    styles?: CSSProperties;
    borderRadius?: ComponentProps<typeof NextLink>['style'];
  };

function NavLink({ children, styles, href, ...props }: NavLinkProps) {
  const memoizedStyles = useMemo(
    () => ({
      ...styles,
    }),
    [styles],
  );
  if (!href) {
    return <>{children}</>;
  }
  return (
    <NextLink href={href} style={memoizedStyles} {...props}>
      {children}
    </NextLink>
  );
}

export default NavLink;
