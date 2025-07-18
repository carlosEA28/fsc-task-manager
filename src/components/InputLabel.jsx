import PropTypes from "prop-types";

const InputLabel = (props) => {
  return (
    <label {...props} className="text-brand-dark-blue text-sm font-semibold ">
      {props.children}
    </label>
  );
};

InputLabel.propTypes = {
  children: PropTypes.node.isRequired,
  color: PropTypes.oneOf(["primary", "ghost", "secondary"]),
};

export default InputLabel;
