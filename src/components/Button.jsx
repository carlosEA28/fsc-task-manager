import { tv } from "tailwind-variants";

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

export default Button;

// ...rest, pega todas as propriedades de uma tag html, e passa direto, fazendo ser mais reutilizavel
