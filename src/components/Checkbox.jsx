function Checkbox(props) {
  const { value, onChange } = props;

  return (
    <>
      <input className="form-check-input" type="checkbox" checked={value} onChange={onChange} />
    </>
  );
}

export default Checkbox;