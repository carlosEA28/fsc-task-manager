import { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import SideBar from "../components/SideBar";
import { RightArrowIcon, LeftArrorBtnIcon, TrashIcon } from "../assets/icons";
import Button from "../components/Button";
import Input from "../components/Input";
import TimeSelect from "../components/TimeSelect";

const TaskDetailsPage = () => {
  const { taskId } = useParams();
  const [task, setTask] = useState();
  const [saveIsLoading, setSaveIsLoading] = useState(false);
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();

  const titleRef = useRef();
  const descriptionRef = useRef();
  const timeRef = useRef();

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleSaveClick = async () => {
    setSaveIsLoading(true);

    const newErrors = [];
    const title = titleRef.current.value;
    const description = descriptionRef.current.value;
    const time = timeRef.current.value;

    console.log(titleRef.current.value);
    console.log(descriptionRef.current.value);

    if (!title) {
      newErrors.push({
        inputName: "title",
        message: "O título é obrigatório",
      });

      if (!time.trim()) {
        newErrors.push({
          inputName: "time",
          message: "O horário é obrigatório",
        });
      }

      if (!description.trim()) {
        newErrors.push({
          inputName: "description",
          message: "A descrição é obrigatória",
        });
      }
    }
    setErrors(newErrors);

    if (newErrors.length > 0) {
      return setSaveIsLoading(false);
    }

    const response = await fetch(`http://localhost:3000/tasks/${taskId}`, {
      method: "PATCH",
      body: JSON.stringify({
        title,
        description,
        time,
      }),
    });

    if (!response.ok) {
      return setSaveIsLoading(false);
    }

    const newTask = await response.json();
    setTask(newTask);
    setSaveIsLoading(false);
  };

  const titleError = errors.find((error) => error.inputName === "title");
  const timeError = errors.find((error) => error.inputName === "time");
  const descriptionError = errors.find(
    (error) => error.inputName === "description"
  );

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
              <Link className="text-brand-text-gray cursor-pointer" to="/">
                Minhas Tarefas
              </Link>
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
              <Input
                id="title"
                lable="Título"
                defaultValue={task?.title}
                errorMessage={titleError?.message}
                ref={titleRef}
              />
            </div>

            <div>
              <TimeSelect
                defaultValue={task?.time}
                errorMessage={timeError?.message}
                ref={timeRef}
              />
            </div>

            <div>
              <Input
                id="description"
                lable="Descrição"
                defaultValue={task?.description}
                errorMessage={descriptionError?.message}
                ref={descriptionRef}
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 w-full">
          <Button size="large" onClick={handleSaveClick}>
            Salvar
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TaskDetailsPage;
