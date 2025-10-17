import { useFormContext } from "react-hook-form";

type Props = {
  label: string;
  name: string;
  type?: "text" | "email" | "password" | "checkbox" | "date";
  variant?: "default" | "toggle";
  placeholder?: string;
  required?: boolean;
  readonly?: boolean;
};

const InputText = ({
  label,
  name,
  type = "text",
  variant = "default",
  placeholder,
  required,
  readonly = false,
}: Props) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const error = errors[name]?.message as string | undefined;

  if (type === "checkbox") {
    return (
      <div className="form-control w-full mb-4">
        <label className="cursor-pointer label">
          <span className="label-text font-semibold">
            {label}
            {required && <span className="text-red-400">*</span>}
          </span>
          <input
            {...register(name)}
            type="checkbox"
            className={`${variant === "toggle" ? "toggle" : "checkbox"} ${
              error ? "input-error" : ""
            }`}
            readOnly={readonly}
            disabled={readonly}
          />
        </label>
        {error && (
          <label className="label">
            <span className="label-text-alt text-red-500">{error}</span>
          </label>
        )}
      </div>
    );
  }

  return (
    <div className="form-control w-full mb-4">
      <label className="label">
        <span className="label-text font-semibold">
          {label}
          {required && <span className="text-red-400">*</span>}
        </span>
      </label>
      <input
        {...register(name)}
        type={type}
        placeholder={placeholder || `Enter your ${label.toLowerCase()}`}
        readOnly={readonly}
        disabled={readonly}
        className={`input input-bordered w-full ${error ? "input-error" : ""} ${
          readonly ? "cursor-not-allowed" : ""
        }`}
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
