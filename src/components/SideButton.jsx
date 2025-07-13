const SideBarButton = ({ children, varient }) => {
  const getVarientClasses = () => {
    if (varient === "unselected") {
      return "text-brand-dark-blue";
    }

    if (varient === "selected") {
      return "bg-brand-border text-brand-primary";
    }
  };

  return (
    <a
      href="#"
      className={`flex items-center gap-2 rounded-lg px-6 py-3 ${getVarientClasses()}`}
    >
      {children}
    </a>
  );
};

export default SideBarButton;
