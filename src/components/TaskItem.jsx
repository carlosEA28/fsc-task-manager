import CheckedIcon from "../assets/icons/checked.svg?react";
import Loader from "../assets/icons/loaderCircle.svg?react";
import TaskInfoIcon from "../assets/icons/taskInfo.svg?react";
import TrashIcon from "../assets/icons/trash.svg?react";
import Button from "./Button";

const TaskItem = ({ task, handleTaskCheckboxClick, handleTaskDeleteClick }) => {
  const getStatusClasses = () => {
    if (task.status === "done") {
      return "bg-[#00ADB5]/10 text-[#00ADB5]";
    }
    if (task.status === "in_progress") {
      return "bg-[#FFAA04]/10 text-[#FFAA04]";
    }
    if (task.status === "not_started") {
      return "bg-[#35383E]/10 text-[#35383E]";
    }
  };

  return (
    <div
      className={`flex items-center justify-between transition px-4 py-3  gap-2 rounded-lg ${getStatusClasses()}`}
    >
      <div className=" flex items-center gap-2">
        <label
          className={`relative flex h-7 w-7 cursor-pointer items-center justify-center rounded-lg ${getStatusClasses()}`}
        >
          <input
            type="checkbox"
            checked={task.status === "done"}
            className=" absolute h-full w-full cursor-pointer opacity-0"
            onChange={() => {
              handleTaskCheckboxClick(task.id);
            }}
          />

          {task.status === "done" && <CheckedIcon />}

          {task.status === "in_progress" && (
            <Loader className="animate-spin " />
          )}
        </label>

        {task.title}
      </div>

      <div className="flex gap-2">
        <Button
          variant="secondary"
          onClick={() => handleTaskDeleteClick(task.id)}
        >
          <TrashIcon className="text-[#9A9C9F]" />
        </Button>

        <div>
          <a href="#" className="hover:opacity-75 transition">
            <TaskInfoIcon />
          </a>
        </div>
      </div>
    </div>
  );
};

export default TaskItem;
