import { Colors } from '../../hooks/theme';
import { Heading } from '../Heading';
import { Tooltip } from '../Tooltip';
import { Container, Size } from './styles';

type AvatarBaseProps = {
  size?: Size;
  badge?: boolean;
};

interface AvatarNameProps extends AvatarBaseProps {
  name: string;
  src?: string;
}

interface AvatarImageProps extends AvatarBaseProps {
  name?: string;
  src: string;
}

type AvatarProps = AvatarNameProps | AvatarImageProps;

export function Avatar({
  name,
  src,
  size = 'md',
  badge = false,
}: AvatarProps): JSX.Element {
  const avatarColors = [
    'gray',
    'red',
    'pink',
    'violet',
    'blue',
    'green',
    'orange',
    'brown',
  ];

  const colorIndex = Math.floor(Math.random() * 8);

  function renderShortName(): string {
    if (name) {
      const nameSplitted = name.split(' ');

      if (nameSplitted.length === 1) {
        return nameSplitted[0][0].toUpperCase();
      }

      if (nameSplitted.length > 1) {
        return `${nameSplitted[0][0]}${
          nameSplitted[nameSplitted.length - 1][0]
        }`.toUpperCase();
      }
    }

    return '';
  }

  return (
    <Tooltip content={name}>
      <Container
        size={size}
        src={src}
        colorScheme={avatarColors[colorIndex] as Colors}
        badge={badge}
      >
        {!src && !!name && <Heading size={size}>{renderShortName()}</Heading>}
      </Container>
    </Tooltip>
  );
}
