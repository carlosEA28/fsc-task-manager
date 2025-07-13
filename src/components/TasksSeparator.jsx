import PropTypes from "prop-types";

const TaskSeparator = ({ title, icon }) => {
  return (
    <div className="flex items-center gap-2 pb-1 border-b border-solid border-[#F4F4F5]">
      {icon}
      <p className=" text-brand-text-gray text-sm"> {title}</p>
    </div>
  );
};

TaskSeparator.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.element.isRequired,
};

export default TaskSeparator;
