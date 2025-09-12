import { useState } from "react";
import { useFormContext, useWatch } from "react-hook-form";

type Props = {
  label: string;
  name: string;
  required?: boolean;
  placeholder?: string;
};

export default function SkillsInput({
  name,
  label,
  required,
  placeholder,
}: Props) {
  const {
    setValue,
    control,
    register,
    formState: { errors },
  } = useFormContext();

  const skills = useWatch({ control, name }) as string[] | undefined;
  const [input, setInput] = useState("");
  const skillsList = skills || [];


  const addSkill = () => {
    if (input.trim() !== "" && !skills?.includes(input.trim())) {
      setValue(name, [...(skills || []), input.trim()], {
        shouldValidate: true,
      });
      setInput("");
    }
  };

  const removeSkill = (index: number) => {
    setValue(name, skills?.filter((_, i) => i !== index) || [], {
      shouldValidate: true,
    });
  };

  const error = errors[name]?.message as string | undefined;

  return (
    <div>
      <label className="form-control w-full">
        <div className="label">
          <span className="label-text font-semibold">
            {label}
            {required && <span className="text-red-400">*</span>}
          </span>
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder={placeholder || "Enter a skill"}
            className="input input-bordered w-full"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) =>
              e.key === "Enter" && (e.preventDefault(), addSkill())
            }
          />
          <button className="btn btn-primary" onClick={addSkill} type="button">
            Add
          </button>
        </div>
      </label>

      <div className="flex flex-wrap gap-2 mt-3">
        {skillsList.length > 0 &&
          skillsList?.map((skill, i) => (
            <div
              key={i}
              className="badge badge-primary flex items-center max-w-xs truncate px-3 py-2"
              title={skill}
            >
              <span className="truncate">{skill}</span>
              <button
                type="button"
                className="ml-2 text-white"
                onClick={() => removeSkill(i)}
              >
                ✕
              </button>
            </div>
          ))}
      </div>

      {error && <p className="text-red-500 mt-1">{error}</p>}
    </div>
  );
}
