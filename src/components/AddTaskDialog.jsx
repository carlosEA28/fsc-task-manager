import { createPortal } from "react-dom";
import Input from "./Input";
import Button from "./Button";
import { CSSTransition } from "react-transition-group";
import React, { useEffect, useState } from "react";
import "./AddTaskDialog.css";
import TimeSelect from "./TimeSelect";
import { v4 } from "uuid";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const AddTaskDialog = ({ isOpen, handleDialogclose, handleOnSubmit }) => {
  const [time, setTime] = useState("morning");
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  const nodeRef = React.useRef();

  useEffect(() => {
    if (!isOpen) {
      setTime("morning");
    }
  }, [isOpen]);

  const handleSaveClick = async (data) => {
    const task = {
      id: v4(),
      title: data.title.trim(),
      description: data.description.trim(),
      time: data.time,
      status: "not_started",
    };

    const response = await fetch("http://localhost:3000/tasks", {
      method: "POST",
      body: JSON.stringify(task),
    });

    if (!response.ok) {
      return toast.error(
        "Erro ao adicionar a tarefa. Por Favor, tente novamente"
      );
    }

    handleOnSubmit(task);
    handleDialogclose();
    reset({
      title: "",
      description: "",
      time: " ",
    });
  };

  return createPortal(
    <CSSTransition
      nodeRef={nodeRef}
      in={isOpen}
      timeout={500}
      classNames="add-task-dialog"
      unmountOnExit
    >
      <div
        ref={nodeRef}
        className="fixed top-0 left-0 bottom-0 backdrop-blur h-screen w-screen flex items-center justify-center"
      >
        {/* DIALOG */}
        <div className="p-5 rounded-xl bg-white text-center shadow">
          <h2 className="text-brand-dark-blue font-semibold text-xl">
            Nova Tarefa
          </h2>
          <p className="text-sm text-brand-text-gray mt-1 mb-4">
            Insira as informações abaixo
          </p>

          <form
            onSubmit={handleSubmit(handleSaveClick)}
            className="space-y-4 flex flex-col w-[336px] "
          >
            <Input
              id="title"
              lable="Título"
              placeholder="Insira o título da tarefa"
              errorMessage={errors?.title?.message}
              {...register("title", {
                required: "O Título é obrigatório",
                validate: (value) => {
                  if (!value.trim()) {
                    return "A Título não pode ser vazio";
                  }
                },
              })}
            />

            <TimeSelect
              value={time}
              onChange={(event) => setTime(event.target.value)}
              errorMessage={errors?.time?.message}
              {...register("time", {
                required: "O Horário é obrigatório",
                validate: (value) => {
                  if (!value.trim()) {
                    return "A descrição não pode ser vazia";
                  }
                },
              })}
            />

            <Input
              id="description"
              lable="Descrição"
              placeholder="Descreva a tarefa"
              errorMessage={errors?.description?.message}
              {...register("description", {
                required: "O Descrição é obrigatória",
                validate: (value) => {
                  if (!value.trim()) {
                    return "A descrição não pode ser vazia";
                  }
                },
              })}
            />

            <div className="flex gap-3">
              <Button
                size="large"
                className="w-full"
                color="secondary"
                type="buttons"
              >
                Cancelar
              </Button>

              <Button size="large" className="w-full" type="submit">
                Salvar
              </Button>
            </div>
          </form>
        </div>
      </div>
    </CSSTransition>,

    document.body
  );
};

AddTaskDialog.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  handleDialogclose: PropTypes.func.isRequired,
  handleOnSubmit: PropTypes.func.isRequired,
};

export default AddTaskDialog;
