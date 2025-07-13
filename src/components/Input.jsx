import { forwardRef } from "react";
import InputLabel from "./InputLabel";
import InputErrorMessage from "./InputErrorMessage";

const Input = forwardRef(({ lable, errorMessage, ...rest }, ref) => {
  return (
    <div className="flex flex-col text-left space-y-1">
      <InputLabel htmlFor={rest.id}>{lable}</InputLabel>

      <input
        type="text"
        className=" px-4 py-3  border border-solid border-[#ECECEC] rounded-lg placeholder:text-brand-text-gray text-sm focus:outline-none focus:border-brand-primary transition-colors"
        ref={ref}
        {...rest}
      />

      {errorMessage && <InputErrorMessage>{errorMessage}</InputErrorMessage>}
    </div>
  );
});

Input.displayName = "Input";

export default Input;
