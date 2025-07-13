const Button = ({
  children,
  variant = "primary",
  size = "small",
  className,
  ...rest
}) => {
  const getVarientClasses = () => {
    if (variant === "primary") {
      return "bg-brand-primary text-white";
    }

    if (variant === "ghost") {
      return " bg-transparent text-brand-dark-gray";
    }
    if (variant === "secondary") {
      return "bg-brand-light-gray text-brand-dark-blue";
    }
  };

  const getSizeClasses = () => {
    if (size === "small") {
      return "py-1 text-xs";
    }

    if (size === "large") {
      return " py-2 text-sm";
    }
  };

  return (
    <button
      className={`flex items-center justify-center cursor-pointer hover:opacity-50 transition-opacity gap-2 font-semibold  rounded-md px-3 ${getSizeClasses()} ${getVarientClasses()} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;

// ...rest, pega todas as propriedades de uma tag html, e passa direto, fazendo ser mais reutilizavel
