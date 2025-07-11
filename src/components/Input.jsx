import InputLabel from "./InputLabel";

const Input = ({ lable, ...rest }) => {
  return (
    <div className="flex flex-col text-left space-y-1">
      <InputLabel htmlFor={rest.id}>{lable}</InputLabel>

      <input
        type="text"
        className="px-4 py-3 border border-solid border-[#ECECEC] rounded-lg placeholder:text-[#9A9C9F] text-sm focus:outline-none focus:border-[#00ADB5] transition-colors"
        {...rest}
      />
    </div>
  );
};

export default Input;
