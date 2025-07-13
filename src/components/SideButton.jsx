import PropTypes from "prop-types";
import { tv } from "tailwind-variants";

const SideBarButton = ({ children, color }) => {
  const sideBar = tv({
    base: "flex items-center gap-2 rounded-lg px-6 py-3",
    variants: {
      color: {
        unselected: "text-brand-dark-blue",
        selected: "bg-brand-primary bg-opacity-15 text-brand-primary",
      },
    },
  });

  return (
    <a href="#" className={sideBar({ color })}>
      {children}
    </a>
  );
};

SideBarButton.propTypes = {
  children: PropTypes.node.isRequired,
  color: PropTypes.node.isRequired,
};

export default SideBarButton;
