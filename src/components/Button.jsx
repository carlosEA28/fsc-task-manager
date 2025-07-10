const Button = ({ children, variant = "primary", ...rest }) => {
  const getVarientClasses = () => {
    if (variant === "primary") {
      return "bg-[#00ADB5] text-white";
    }

    if (variant === "secondary") {
      return " bg-transparent text-[#818181]";
    }
  };

  return (
    <button
      className={`flex items-center cursor-pointer hover:opacity-50 transition-opacity gap-2 font-semibold  rounded-md px-3 py-1 text-xs ${getVarientClasses()}`}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;

// ...rest, pega todas as propriedades de uma tag html, e passa direto, fazendo ser mais reutilizavel
