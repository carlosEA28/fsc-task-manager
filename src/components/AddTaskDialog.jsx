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

  const nodeRef = React.useRef();

  useEffect(() => {
    if (!isOpen) {
      setTitle("");
      setTime("");
      setDescription("");
    }
  }, [isOpen]);

  const handleSaveClick = () => {
    handleSubmit({
      id: v4(),
      title,
      description,
      time,
      status: "not_started",
    });

    handleDialogclose();
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
            />

            <TimeSelect
              value={time}
              onChange={(event) => setTime(event.target.value)}
            />

            <Input
              id="description"
              lable="Descrição"
              placeholder="Descreva a tarefa"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
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
