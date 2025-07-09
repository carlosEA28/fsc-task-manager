import Button from "./Button";
import AddIcon from "../assets/icons/add.svg?react";
import TrashIcon from "../assets/icons/trash.svg?react";

const Tasks = () => {
  return (
    <div className="py-16 px-8 w-full">
      <div className="flex justify-between items-center w-full">
        <div>
          <span className=" text-xs font-semibold text-[#00ADB5]">
            Minhas Tarefas
          </span>
          <h2 className="font-semibold">Minhas Tarefas</h2>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="secondary">
            Limpar Tarefas
            <TrashIcon />
          </Button>

          <Button variant="primary">
            Adicionar Tarefa
            <AddIcon />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Tasks;
