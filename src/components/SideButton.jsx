const SideBarButton = ({ children, varient }) => {
  const getVarientClasses = () => {
    if (varient === "unselected") {
      return "text-[#35383E]";
    }

    if (varient === "selected") {
      return "bg-[#E6F7F8] text-[#00ADB5]";
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
