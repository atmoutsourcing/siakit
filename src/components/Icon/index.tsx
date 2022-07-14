import { icons } from '../../helpers/icons';

type IconProps = {
  name: keyof typeof icons;
  size?: string | number | undefined;
};

export function Icon({ name, size }: IconProps): JSX.Element {
  const IconRender = icons[name] as any;

  return <IconRender size={size} />;
}
