import { createPortal } from "react-dom";
import Input from "./Input";
import Button from "./Button";
import { CSSTransition } from "react-transition-group";
import React, { useEffect, useState } from "react";
import "./AddTaskDialog.css";
import TimeSelect from "./TimeSelect";
import { v4 } from "uuid";

const AddTaskDialog = ({ isOpen, handleDialogclose, handleSubmit }) => {
  const [title, setTitle] = useState();
  const [time, setTime] = useState("morning");
  const [description, setDescription] = useState();
  const [errors, setErrors] = useState([]);

  const nodeRef = React.useRef();

  useEffect(() => {
    if (!isOpen) {
      setTitle("");
      setTime("morning");
      setDescription("");
    }
  }, [isOpen]);

  const handleSaveClick = () => {
    const newErrors = [];

    if (!title.trim()) {
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
    console.log(newErrors);
    setErrors(newErrors);

    if (newErrors.length > 0) {
      return;
    }

    handleSubmit({
      id: v4(),
      title,
      description,
      time,
      status: "not_started",
    });

    handleDialogclose();
  };

  const titleError = errors.find((error) => error.inputName === "title");
  const timeError = errors.find((error) => error.inputName === "time");
  const descriptionError = errors.find(
    (error) => error.inputName === "description"
  );

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
          <h2 className="text-[#35383E] font-semibold text-xl">Nova Tarefa</h2>
          <p className="text-sm text-[#9A9C9F] mt-1 mb-4">
            Insira as informações abaixo
          </p>

          <div className="space-y-4 flex flex-col w-[336px] ">
            <Input
              id="title"
              lable="Título"
              placeholder="Insira o título da tarefa"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              errorMessage={titleError?.message}
            />

            <TimeSelect
              value={time}
              onChange={(event) => setTime(event.target.value)}
              errorMessage={timeError?.message}
            />

            <Input
              id="description"
              lable="Descrição"
              placeholder="Descreva a tarefa"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              errorMessage={descriptionError?.message}
            />

            <div className="flex gap-3">
              <Button
                size="large"
                className="w-full"
                variant="secondary"
                onClick={() => handleDialogclose()}
              >
                Cancelar
              </Button>

              <Button
                size="large"
                className="w-full"
                onClick={() => handleSaveClick()}
              >
                Salvar
              </Button>
            </div>
          </div>
        </div>
      </div>
    </CSSTransition>,
    document.body
  );
};

export default AddTaskDialog;
