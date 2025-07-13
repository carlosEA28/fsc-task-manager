import PropTypes from "prop-types";

const InputErrorMessage = ({ children }) => {
  return <p className="text-xs text-red-500 text-left">{children}</p>;
};
InputErrorMessage.propTypes = {
  children: PropTypes.node.isRequired,
};

export default InputErrorMessage;
