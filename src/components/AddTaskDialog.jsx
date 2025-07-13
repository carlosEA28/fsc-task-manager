import { createPortal } from "react-dom";
import Input from "./Input";
import Button from "./Button";
import { CSSTransition } from "react-transition-group";
import React, { useEffect, useRef, useState } from "react";
import "./AddTaskDialog.css";
import TimeSelect from "./TimeSelect";
import { v4 } from "uuid";
import PropTypes from "prop-types";

const AddTaskDialog = ({ isOpen, handleDialogclose, handleSubmit }) => {
  const [time, setTime] = useState("morning");
  const [errors, setErrors] = useState([]);

  const nodeRef = React.useRef();
  const titleRef = useRef();
  const descriptionRef = useRef();

  useEffect(() => {
    if (!isOpen) {
      setTime("morning");
    }
  }, [isOpen]);

  const handleSaveClick = () => {
    const newErrors = [];
    const title = titleRef.current.value;
    const description = descriptionRef.current.value;

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
          <h2 className="text-brand-dark-blue font-semibold text-xl">
            Nova Tarefa
          </h2>
          <p className="text-sm text-brand-text-gray mt-1 mb-4">
            Insira as informações abaixo
          </p>

          <div className="space-y-4 flex flex-col w-[336px] ">
            <Input
              id="title"
              lable="Título"
              placeholder="Insira o título da tarefa"
              errorMessage={titleError?.message}
              ref={titleRef}
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
              errorMessage={descriptionError?.message}
              ref={descriptionRef}
            />

            <div className="flex gap-3">
              <Button
                size="large"
                className="w-full"
                color="secondary"
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

AddTaskDialog.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  handleDialogclose: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

export default AddTaskDialog;
