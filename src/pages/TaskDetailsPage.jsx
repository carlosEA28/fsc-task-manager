/* eslint-disable no-unused-vars */
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import SideBar from "../components/SideBar";
import {
  RightArrowIcon,
  LeftArrorBtnIcon,
  TrashIcon,
  Loader,
} from "../assets/icons";
import Button from "../components/Button";
import Input from "../components/Input";
import TimeSelect from "../components/TimeSelect";
import { toast } from "sonner";
import { useForm } from "react-hook-form";

const TaskDetailsPage = () => {
  const { taskId } = useParams();
  const [task, setTask] = useState();
  const navigate = useNavigate();
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    reset,
  } = useForm();

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleSaveClick = async (data) => {
    const response = await fetch(`http://localhost:3000/tasks/${taskId}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      return toast.error("Erro ao salvar a tarefa");
    }

    const newTask = await response.json();
    setTask(newTask);
  };

  const handleDeleteClick = async () => {
    const response = await fetch(`http://localhost:3000/tasks/${taskId}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      return toast.error("Ocorreu um erro ao deletar a tarefa");
    }

    toast.success("Tarefa deletada com sucesso!");

    navigate(-1);
  };

  useEffect(() => {
    const fetchTasks = async () => {
      const response = await fetch(`http://localhost:3000/tasks/${taskId}`, {
        method: "GET",
      });
      const data = await response.json();
      setTask(data);
      reset(data);

      console.log(data);
    };

    fetchTasks();
  }, [taskId, reset]);

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
              <TrashIcon onClick={handleDeleteClick} />
              Deletar Tarefa
            </Button>
          </div>
        </div>

        <form action="" onSubmit={handleSubmit(handleSaveClick)}>
          {/* dados da tarefa */}
          <div className="bg-brand-white p-6 rounded-6 mt-6 mb-6 ">
            <div className="space-y-6">
              <div>
                <Input
                  id="title"
                  lable="Título"
                  {...register("title", {
                    required: "O titulo é obrigatório",
                    validate: (value) => {
                      if (!value.trim()) {
                        return "O Título não pode ser vazio";
                      }
                    },
                  })}
                  errorMessage={errors?.title?.message}
                />
              </div>

              <div>
                <TimeSelect
                  {...register("times", {
                    required: "O Horário é obrigatório",
                    validate: (value) => {
                      if (!value.trim()) {
                        return "A descrição não pode ser vazia";
                      }
                    },
                  })}
                  errorMessage={errors?.time?.message}
                />
              </div>

              <div>
                <Input
                  id="description"
                  lable="Descrição"
                  {...register("description", {
                    required: "A descrição é obrigatória",
                  })}
                  errorMessage={errors?.description?.message}
                />
              </div>
            </div>
          </div>

          {/*  botao salvar*/}
          <div className="flex justify-end gap-3 w-full">
            <Button size="large" type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <Loader className="animate-spin" />
              ) : (
                <p>Salvar</p>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskDetailsPage;
