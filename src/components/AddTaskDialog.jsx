import { createPortal } from "react-dom";

const AddTaskDialog = ({ isOpen }) => {
  if (!isOpen) return null;

  return createPortal(
    <div className="fixed top-0 left-0 bottom-0 backdrop-blur h-screen w-screen flex items-center justify-center">
      {/* DIALOG */}
      <div className="p-5 rounded-xl bg-white text-center shadow">
        <h2 className="text-[#35383E] font-semibold text-xl">Nova Tarefa</h2>
        <p className="text-sm text-[#9A9C9F] mt-1">
          Insira as informações abaixo
        </p>
      </div>
    </div>,
    document.body
  );
};

export default AddTaskDialog;
