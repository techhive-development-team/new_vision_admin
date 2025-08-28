import { useFormContext } from "react-hook-form";

type Props = {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
};

const InputText = ({ label, name, type = "text", placeholder }: Props) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const error = errors[name]?.message as string | undefined;

  return (
    <div className="form-control w-full mb-4">
      <label className="label">
        <span className="label-text font-semibold">{label}</span>
      </label>
      <input
        {...register(name)}
        type={type}
        placeholder={placeholder || `Enter your ${label.toLowerCase()}`}
        className={`input input-bordered w-full ${error ? "input-error" : ""}`}
      />
      {error && (
        <label className="label">
          <span className="label-text-alt text-red-500">{error}</span>
        </label>
      )}
    </div>
  );
};

export default InputText;
