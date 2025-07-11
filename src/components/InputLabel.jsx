const InputLabel = (props) => {
  return (
    <label {...props} className="text-[#35383E] text-sm font-semibold ">
      {props.children}
    </label>
  );
};

export default InputLabel;
