import { ReactNode, Fragment } from 'react';

type SimpleTableBodyProps = {
  children: ReactNode;
};

export function SimpleTableBody({
  children,
}: SimpleTableBodyProps): JSX.Element {
  return <>{children}</>;
}
