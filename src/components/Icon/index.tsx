import React from 'react';

import * as ReactIcons from 'react-icons/all';

type IconProps = {
  name: keyof typeof ReactIcons;
  size?: string | number | undefined;
};

export function Icon({ name, size }: IconProps): JSX.Element {
  const IconRender = ReactIcons[name] as any;

  return <IconRender size={size} />;
}
