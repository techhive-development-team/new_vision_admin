import { useFormContext } from "react-hook-form";

type Props = {
  label: string;
  name: string;
  placeholder?: string;
  required?: boolean;
};

const TextArea = ({ label, name, placeholder, required }: Props) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const error = errors[name]?.message as string | undefined;

  return (
    <div>
      <label className="label">
        <span className="label-text font-semibold">{label}</span>
        {required && <span className="text-red-400">*</span>}
      </label>
      <textarea
        {...register(name, { required })}
        className={`textarea textarea-bordered w-full h-20 ${
          error ? "textarea-error" : ""
        }`}
        placeholder={placeholder || `Enter your ${label.toLowerCase()}`}
      />
      {error && (
        <label className="label">
          <span className="label-text-alt text-red-500">{error}</span>
        </label>
      )}
    </div>
  );
};

export default TextArea;
