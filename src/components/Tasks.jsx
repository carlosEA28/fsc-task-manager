import Button from "./Button";
import {
  AddIcon,
  TrashIcon,
  SunIcon,
  CloudSunIcon,
  MoonIcon,
} from "../assets/icons";
import TaskSeparator from "./TasksSeparator";
import { useEffect, useState } from "react";
import TaskItem from "./TaskItem";
import { toast } from "sonner";
import AddTaskDialog from "./AddTaskDialog";

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [addTaskDialogIsOpen, setAddTaskDialogIsOpen] = useState(false);

  useEffect(() => {
    const fetchTasks = async () => {
      const response = await fetch("http://localhost:3000/tasks");
      const data = await response.json();

      setTasks(data);
    };

    fetchTasks();
  }, []);

  const morningTasks = tasks.filter((task) => task.time === "morning");
  const afternoonTasks = tasks.filter((task) => task.time === "afternoon");
  const MooonTasks = tasks.filter((task) => task.time === "moon");

  const handleTaskCheckboxClick = (taskId) => {
    let newTask = tasks.map((task) => {
      if (task.id != taskId) {
        return task;
      }

      if (task.status === "not_started") {
        toast.success("Tarefa iniciada com sucesso");
        return { ...task, status: "in_progress" };
      }

      if (task.status === "in_progress") {
        toast.success("Tarefa finalizada com sucesso");

        return { ...task, status: "done" };
      }

      if (task.status === "done") {
        toast.success("Tarefa reiniciada com sucesso");

        return { ...task, status: "not_started" };
      }

      return task;
    });

    setTasks(newTask);
  };

  const onDeleteTaskSuccess = async (taskId) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
    toast.success("Tarefa deletada com sucesso");
  };

  const handleDialogclose = () => {
    setAddTaskDialogIsOpen(false);
  };

  const handleAddTask = async (task) => {
    const response = await fetch("http://localhost:3000/tasks", {
      method: "POST",
      body: JSON.stringify(task),
    });

    if (!response.ok) {
      return toast.error(
        "Erro ao adicionar a tarefa. Por Favor, tente novamente"
      );
    }

    setTasks([...tasks, task]);
    toast.success("Tarefa adicionada com sucesso");
  };

  return (
    <div className="py-16 px-8 w-full space-y-6">
      <div className="flex justify-between items-center w-full">
        <div>
          <span className=" text-xs font-semibold text-brand-primary">
            Minhas Tarefas
          </span>
          <h2 className="font-semibold">Minhas Tarefas</h2>
        </div>

        <div className="flex items-center gap-3">
          <Button color="ghost">
            Limpar Tarefas
            <TrashIcon />
          </Button>

          <Button color="primary" onClick={() => setAddTaskDialogIsOpen(true)}>
            Adicionar Tarefa
            <AddIcon />
          </Button>

          <AddTaskDialog
            isOpen={addTaskDialogIsOpen}
            handleDialogclose={handleDialogclose}
            handleSubmit={handleAddTask}
          />
        </div>
      </div>

      <div className="p-6 bg-white rounded-xl">
        <div className="space-y-3">
          <TaskSeparator title="Manhã" icon={<SunIcon />} />

          {morningTasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              handleTaskCheckboxClick={handleTaskCheckboxClick}
              onDeleteSuccess={onDeleteTaskSuccess}
            />
          ))}
        </div>

        <div className="space-y-3 my-6">
          <TaskSeparator title="Tarde" icon={<CloudSunIcon />} />
          {afternoonTasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              handleTaskCheckboxClick={handleTaskCheckboxClick}
              onDeleteSuccess={onDeleteTaskSuccess}
            />
          ))}
        </div>

        <div className="space-y-3">
          <TaskSeparator title="Noite" icon={<MoonIcon />} />{" "}
          {MooonTasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              handleTaskCheckboxClick={handleTaskCheckboxClick}
              onDeleteSuccess={onDeleteTaskSuccess}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Tasks;
