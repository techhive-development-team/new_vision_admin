import { useFormContext } from "react-hook-form";

interface CheckboxOption {
  label: string;
  value: string;
}

interface CheckboxInputProps {
  label: string;
  name: string;
  options: CheckboxOption[];
  required?: boolean;
  columns?: 2 | 3 | 4;
}

const CheckboxInput = ({
  label,
  name,
  options,
  required = false,
  columns = 4,
}: CheckboxInputProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const gridColsClass = {
    2: "grid-cols-2",
    3: "grid-cols-3",
    4: "grid-cols-2 md:grid-cols-4",
  }[columns];

  const error = errors[name];

  return (
    <div className="form-control w-full">
      <label className="label">
        <span className="label-text font-semibold">
          {label}
          {required && <span className="text-error ml-1">*</span>}
        </span>
      </label>
      
      <div className={`grid ${gridColsClass} gap-3`}>
        {options.map((option) => (
          <label
            key={option.value}
            className="cursor-pointer label justify-start gap-2 border border-base-300 rounded-lg p-3 hover:bg-base-200 hover:border-primary transition-all duration-200"
          >
            <input
              type="checkbox"
              className="checkbox checkbox-primary"
              value={option.value}
              {...register(name, {
                required: required ? `${label} is required` : false,
              })}
            />
            <span className="label-text">{option.label}</span>
          </label>
        ))}
      </div>

      {error && (
        <label className="label">
          <span className="label-text-alt text-error">
            {error.message as string}
          </span>
        </label>
      )}
    </div>
  );
};

export default CheckboxInput;