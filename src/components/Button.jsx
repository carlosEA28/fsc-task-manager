import { tv } from "tailwind-variants";
import PropTypes from "prop-types";

const Button = ({
  children,
  color = "primary",
  size = "small",
  className,
  ...rest
}) => {
  const button = tv({
    base: "flex items-center justify-center cursor-pointer hover:opacity-50 transition-opacity gap-2 font-semibold rounded-md px-3",
    variants: {
      color: {
        primary: "bg-brand-primary text-white",
        ghost: "bg-transparent text-brand-dark-gray",
        secondary: "bg-brand-light-gray text-brand-dark-blue",
        danger: "bg-brand-danger text-brand-white",
      },

      size: {
        small: "py-1 text-xs",
        large: "py-2 text-sm",
      },
    },

    defaultVariants: {
      color: "primary",
      size: "small",
    },
  });

  return (
    <button
      className={button({ color: color, size: size, className })}
      {...rest}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  color: PropTypes.oneOf(["primary", "ghost", "secondary", "danger"]),
  size: PropTypes.oneOf(["small", "large"]),
  className: PropTypes.string.isRequired,
};

export default Button;

// ...rest, pega todas as propriedades de uma tag html, e passa direto, fazendo ser mais reutilizavel
