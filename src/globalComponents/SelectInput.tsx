interface PSelectInput {
  name?: string;
  onchange: any;
  label: string;
  options: string[];
  value: string;
}

const SelectInput = ({
  name,
  onchange,
  label,
  options,
  value,
}: PSelectInput) => {
  const Options = ({ val }: any) => {
    return <option value={val}>{val}</option>;
  };

  return (
    <select
      className='select select-bordered w-full max-w-xs py-2'
      name={name ?? 'type'}
      required
      onChange={onchange}
      value={value}
    >
      <option disabled defaultValue={options.length ?? options[0]}>
        {label}
      </option>
      {options.map((val: any) => (
        <Options key={val} val={val} />
      ))}
    </select>
  );
};

export default SelectInput;
