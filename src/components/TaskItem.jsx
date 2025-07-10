const TaskItem = ({ task }) => {
  const getStatusClasses = () => {
    if (task.status === "done") {
      return "bg-[#00ADB51A] text-[#00ADB5]";
    }

    if (task.status === "in_progress") {
      return "bg-[#FFAA041A] text-[#FFAA04]";
    }
    if (task.status === "not_started") {
      return "bg-[#35383E0D] text-[#35383E]";
    }
  };

  return (
    <div className={`px-4 py-3 flex gap-2 rounded-lg ${getStatusClasses()}`}>
      {task.title}
    </div>
  );
};

export default TaskItem;
