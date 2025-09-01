import { useCallback, useRef, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";

type Props = {
  label: string;
  name: string;
  required?: boolean;
  defaultImage?: string;
};

const InputFile = ({ label, name, required, defaultImage }: Props) => {
  const { control, setValue } = useFormContext();
  const [selectedImageUri, setSelectedImageUri] = useState(defaultImage || "");
  const inputRef = useRef<HTMLInputElement>(null);

  const pickImage = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.files && event.target.files[0]) {
        const file = event.target.files[0];
        setSelectedImageUri(URL.createObjectURL(file));
        setValue(name, file, { shouldValidate: true });
      }
    },
    [setValue, name]
  );

  const clickUploadImage = () => {
    inputRef.current?.click();
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <div className="form-control w-full mb-4 flex flex-col">
          <label className="label">
            <span className="label-text font-semibold">
              {label}
              {required && <span className="text-red-400 ml-1">*</span>}
            </span>
          </label>

          <input
            ref={inputRef}
            type="file"
            hidden
            onChange={(e) => {
              pickImage(e);
              field.onChange(e.target.files?.[0]);
            }}
            onBlur={field.onBlur}
          />

          {selectedImageUri ? (
            <label
              className="relative cursor-pointer rounded-lg border shadow p-2 flex justify-center items-center"
              title="Click to change photo"
              onClick={clickUploadImage}
            >
              <img
                src={selectedImageUri}
                alt="Selected"
                className="max-h-40 object-contain"
              />
              <span className="absolute bottom-2 right-2 bg-white p-1 rounded-full shadow">
                ✏️
              </span>
            </label>
          ) : (
            <label
              className="cursor-pointer border-dashed border-2 p-14 flex justify-center items-center rounded-lg text-gray-400"
              title="Click to upload photo"
              onClick={clickUploadImage}
            >
              <span>📷 Upload Image</span>
            </label>
          )}

          {fieldState.error && (
            <p className="text-red-500 text-sm mt-1">
              {fieldState.error.message}
            </p>
          )}
        </div>
      )}
    />
  );
};

export default InputFile;
