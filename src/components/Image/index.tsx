import React from 'react';

import * as AspectRatio from '@radix-ui/react-aspect-ratio';

type ImageProps = {
  src: string;
  alt: string;
  ratio?: number;
};

export function Image({ src, alt, ratio }: ImageProps): JSX.Element {
  return (
    <div style={{ width: '100%' }}>
      <AspectRatio.Root ratio={ratio}>
        <img
          src={src}
          alt={alt}
          style={{
            objectFit: 'cover',
            width: '100%',
            height: '100%',
          }}
        />
      </AspectRatio.Root>
    </div>
  );
}
