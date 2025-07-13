import InputErrorMessage from "./InputErrorMessage";
import InputLabel from "./InputLabel";

export const TimeSelect = (props) => {
  return (
    <div className="flex flex-col text-left space-y-1">
      <InputLabel htmlFor="time">Horário</InputLabel>

      <select
        id="time"
        className="px-4 py-3 border border-solid border-[#ECECEC] rounded-lg placeholder:text-brand-text-gray text-sm focus:outline-none focus:border-brand-primary transition-colors"
        {...props}
      >
        <option value="morning">Manhã</option>
        <option value="afternoon">Tarde</option>
        <option value="moon">Noite</option>
      </select>

      {props.errorMessage && (
        <InputErrorMessage>{props.errorMessage}</InputErrorMessage>
      )}
    </div>
  );
};
export default TimeSelect;
