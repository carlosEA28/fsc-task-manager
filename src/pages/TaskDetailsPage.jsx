import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import SideBar from "../components/SideBar";
import { RightArrowIcon, LeftArrorBtnIcon, TrashIcon } from "../assets/icons";
import Button from "../components/Button";
import InputLabel from "../components/InputLabel";
import Input from "../components/Input";
import TimeSelect from "../components/TimeSelect";

const TaskDetailsPage = () => {
  const { taskId } = useParams();
  const [task, setTask] = useState();
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1);
  };

  useEffect(() => {
    const fetchTasks = async () => {
      const response = await fetch(`http://localhost:3000/tasks/${taskId}`, {
        method: "GET",
      });
      const data = await response.json();
      setTask(data);

      console.log(data);
    };

    fetchTasks();
  }, [taskId]);

  return (
    <div className="flex">
      <SideBar />

      <div className="px-8 py-16 w-full">
        {/* barra topo */}
        <div className="flex justify-between items-end w-full">
          {/* parte da esquerda */}
          <div>
            <div
              onClick={handleBackClick}
              className="h-8 w-8 rounded-full bg-brand-primary flex items-center justify-center mb-3 cursor-pointer"
            >
              <LeftArrorBtnIcon />
            </div>

            <div className="flex items-center gap-1 text-xs">
              <span
                className="text-brand-text-gray cursor-pointer"
                onClick={handleBackClick}
              >
                Minhas Tarefas
              </span>
              <RightArrowIcon className="text-brand-text-gray" />
              <span className="text-brand-primary font-semibold  ">
                {task?.title}
              </span>
            </div>
            <h1 className="text-xl font-semibold mt-2">{task?.title}</h1>
          </div>

          {/* parte da direita */}
          <div className="flex flex-col justify-end h-full">
            <Button className="self-end" color="danger">
              <TrashIcon />
              Deletar Tarefa
            </Button>
          </div>
        </div>

        {/* dados da tarefa */}
        <div className="bg-brand-white p-6 rounded-6 mt-6 mb-6 ">
          <div className="space-y-6">
            <div>
              <Input id="title" lable="Título" value={task?.title} />
            </div>

            <div>
              <TimeSelect value={task?.time} />
            </div>

            <div>
              <Input
                id="description"
                lable="Descrição"
                value={task?.description}
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 w-full">
          <Button color="secondary" size="large">
            Cancelar
          </Button>

          <Button size="large">Salvar</Button>
        </div>
      </div>
    </div>
  );
};

export default TaskDetailsPage;
