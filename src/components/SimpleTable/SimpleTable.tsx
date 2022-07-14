import { Grid } from '../Grid';

type SimpleTableProps = {
  children: any;
};

export function SimpleTable({ children }: SimpleTableProps): JSX.Element {
  return (
    <Grid columns={children[0]?.props.children.length ?? 0}>
      {children[0]?.props.children}

      {children[1]?.props.children}
    </Grid>
  );
}
