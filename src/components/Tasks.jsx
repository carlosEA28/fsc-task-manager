import Button from "./Button";
import AddIcon from "../assets/icons/add.svg?react";
import TrashIcon from "../assets/icons/trash.svg?react";
import SunIcon from "../assets/icons/sun.svg?react";
import CloudSunIcon from "../assets/icons/cloud-sun.svg?react";
import MoonIcon from "../assets/icons/Vector.svg?react";

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

      <div className="p-6 bg-white rounded-xl">
        {/* MANHA */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 pb-1 border-b border-solid border-[#F4F4F5]">
            <SunIcon />
            <p className=" text-[#9A9C9F] text-sm">Manhã</p>
          </div>
        </div>

        {/* TARDE */}
        <div className="space-y-3 my-6">
          <div className="flex items-center gap-2 pb-1 border-b border-solid border-[#F4F4F5]">
            <CloudSunIcon />
            <p className=" text-[#9A9C9F] text-sm">Tarde</p>
          </div>
        </div>

        {/* NOITE */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 pb-1 border-b border-solid border-[#F4F4F5]">
            <MoonIcon />
            <p className=" text-[#9A9C9F] text-sm">Noite</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tasks;
