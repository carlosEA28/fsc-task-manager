import { createPortal } from "react-dom";
import Input from "./Input";
import Button from "./Button";
import { CSSTransition } from "react-transition-group";
import React from "react";
import "./AddTaskDialog.css";
import InputLabel from "./InputLabel";

const AddTaskDialog = ({ isOpen, handleDialogclose }) => {
  const nodeRef = React.useRef();

  return (
    <CSSTransition
      in={isOpen}
      timeout={500}
      classNames="add-task-dialog"
      nodeRef={nodeRef}
      unmountOnExit
    >
      <div>
        {createPortal(
          <div
            ref={nodeRef}
            className="fixed top-0 left-0 bottom-0 backdrop-blur h-screen w-screen flex items-center justify-center"
          >
            {/* DIALOG */}
            <div className="p-5 rounded-xl bg-white text-center shadow">
              <h2 className="text-[#35383E] font-semibold text-xl">
                Nova Tarefa
              </h2>
              <p className="text-sm text-[#9A9C9F] mt-1 mb-4">
                Insira as informações abaixo
              </p>

              <div className="space-y-4 flex flex-col w-[336px] ">
                <Input
                  id="title"
                  lable="Título"
                  placeholder="Insira o título da tarefa"
                />

                <div className="flex flex-col text-left space-y-1">
                  <InputLabel htmlFor="time">Horário</InputLabel>

                  <select
                    id="time"
                    className="px-4 py-3 border border-solid border-[#ECECEC] rounded-lg placeholder:text-[#9A9C9F] text-sm focus:outline-none focus:border-[#00ADB5] transition-colors"
                  >
                    <option value="morning">Manhã</option>
                    <option value="afternoon">Tarde</option>
                    <option value="moon">Noite</option>
                  </select>
                </div>

                <Input
                  id="description"
                  lable="Descrição"
                  placeholder="Descreva a tarefa"
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

                  <Button size="large" className="w-full">
                    Salvar
                  </Button>
                </div>
              </div>
            </div>
          </div>,
          document.body
        )}
      </div>
    </CSSTransition>
  );
};

export default AddTaskDialog;
