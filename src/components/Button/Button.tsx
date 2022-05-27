import React from "react";
import { Container } from './styles';

export interface ButtonProps  {
  /**
   * Is this the principal call to action on the page?
   */
  primary?: boolean;
  /**
   * What background color to use
   */
  backgroundColor?: string;
  /**
   * How large should the button be?
   */
  size?: "small" | "medium" | "large";
  /**
   * Button contents
   */
  label: string;
  /**
   * Optional click handler
   */
  onClick?: () => React.MouseEventHandler<HTMLButtonElement> | undefined
};

/**
 * Primary UI component for user interaction
 */
function Button({
  primary = true,
  backgroundColor,
  size = "medium",
  onClick,
  label,
}: ButtonProps): JSX.Element {
  const mode = primary
    ? "storybook-button--primary"
    : "storybook-button--secondary";
  return (
    <Container
      type="button"
      className={["storybook-button", `storybook-button--${size}`, mode].join(
        " "
      )}
      style={backgroundColor ? { backgroundColor }: {}}
      onClick={onClick}
    >
      {label}
    </Container>
  );
};

export default Button;
