import PropTypes from "prop-types";
import { TrashIcon, Loader, TaskInfoIcon, CheckedIcon } from "../assets/icons";
import Button from "./Button";
import { useState } from "react";
import { toast } from "sonner";
import { Link } from "react-router";

const TaskItem = ({ task, handleTaskCheckboxClick, onDeleteSuccess }) => {
  const [deleteIsLoading, setDeleteIsLoading] = useState(false);

  const handleDeleteClick = async () => {
    setDeleteIsLoading(true);
    const response = await fetch(`http://localhost:3000/tasks/${task.id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      setDeleteIsLoading(false);

      return toast.error(
        "Erro ao adicionar a tarefa. Por Favor, tente novamente"
      );
    }

    onDeleteSuccess(task.id);
    setDeleteIsLoading(false);
  };

  const getStatusClasses = () => {
    if (task.status === "done") {
      return "bg-brand-primary/10 text-brand-primary";
    }
    if (task.status === "in_progress") {
      return "bg-brand-process/10 text-brand-process";
    }
    if (task.status === "not_started") {
      return "bg-brand-dark-blue/10 text-brand-dark-blue";
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
          color="secondary"
          onClick={handleDeleteClick}
          disabled={deleteIsLoading}
        >
          {deleteIsLoading ? (
            <Loader className="animate-spin " />
          ) : (
            <TrashIcon className="text-brand-text-gray" />
          )}
        </Button>

        <div>
          <Link to={`task/${task.id}`} className="hover:opacity-75 transition">
            <TaskInfoIcon />
          </Link>
        </div>
      </div>
    </div>
  );
};

TaskItem.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    time: PropTypes.string.isRequired,
    status: PropTypes.oneOf(["not_started", "done", "in_progress"]).isRequired,
  }).isRequired,

  handleTaskCheckboxClick: PropTypes.func.isRequired,
  onDeleteSuccess: PropTypes.func.isRequired,
};

export default TaskItem;
