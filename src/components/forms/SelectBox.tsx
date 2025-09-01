import React, { type JSX } from "react";
import { useFormContext } from "react-hook-form";

type Props = JSX.IntrinsicElements["select"] & {
  label: string;
  items: { value: string | number; showValue: string }[];
  name: string;
  isDefaultChecked?: boolean;
  required?: boolean;
};

const SelectBox = (props: Props) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const error = errors[props.name]?.message as string | undefined;
  return (
    <div>
      <label className="label">
        <span className="label-text font-semibold">
          {props.label}
          {props.required && <span className="text-red-400">*</span>}
        </span>
      </label>
      <select
        className={`select select-bordered w-full ${
          error ? "border-error" : ""
        }`}
        {...register(props.name)}
      >
        <option value="">
          Choose {props.label}
        </option>
        {props.items.map((item) => (
          <option key={item.value} value={item.value}>
            {item.showValue}
          </option>
        ))}
      </select>
      {error && (
        <label className="label">
          <span className="label-text-alt text-red-500">{error}</span>
        </label>
      )}
    </div>
  );
};

export default SelectBox;
