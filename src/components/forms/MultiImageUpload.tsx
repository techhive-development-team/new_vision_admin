import React, { type DragEvent } from "react";
import { useController, useFormContext } from "react-hook-form";

interface MultiImageUploadProps {
  name: string;
  label?: string;
}

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/jpg",
  "image/webp",
  "image/gif",
];

const MultiImageUpload: React.FC<MultiImageUploadProps> = ({ name, label }) => {
  const { control } = useFormContext();
  const {
    field: { value = [], onChange },
    fieldState: { error },
  } = useController({ name, control });

  const handleFiles = (files: FileList | null) => {
    if (!files) return;

    const validFiles: File[] = [];
    const invalidFiles: string[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
        invalidFiles.push(`${file.name} is not a supported format`);
        continue;
      }

      if (file.size > MAX_FILE_SIZE) {
        invalidFiles.push(`${file.name} exceeds 5MB`);
        continue;
      }

      validFiles.push(file);
    }

    if (validFiles.length > 0) {
      onChange([...(value as File[]), ...validFiles]);
    }

    if (invalidFiles.length > 0) {
      alert(invalidFiles.join("\n"));
    }
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    handleFiles(e.dataTransfer.files);
  };

  const handleRemove = (index: number) => {
    const newFiles = [...(value as File[])];
    newFiles.splice(index, 1);
    onChange(newFiles);
  };

  return (
    <div className="">
      {label && <label className="block mb-2 font-medium">{label}</label>}
      <div
        className="border-2 border-dashed border-gray-400 rounded-lg p-10 flex flex-col items-center justify-center cursor-pointer"
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
        onClick={() =>
          document.getElementById(`hiddenFileInput-${name}`)?.click()
        }
      >
        <p className="text-gray-500">Click or Drag & Drop images here</p>
        <p className="text-gray-400 text-sm mt-1">
          Max size: 5MB. Only images allowed.
        </p>
      </div>

      <input
        type="file"
        id={`hiddenFileInput-${name}`}
        multiple
        accept={ACCEPTED_IMAGE_TYPES.join(",")}
        className="hidden"
        onChange={(e) => handleFiles(e.target.files)}
      />

      {error && <p className="text-red-500 mt-2">{error.message}</p>}

      <div className="flex flex-wrap gap-4 mt-4">
        {(value as File[]).map((file, idx) => {
          const previewUrl = URL.createObjectURL(file);
          return (
            <div
              key={idx}
              className="relative w-36 h-36 border p-1 flex items-center justify-center"
            >
              <img
                src={previewUrl}
                alt={`preview-${idx}`}
                className="max-w-full max-h-full object-contain"
                onLoad={() => URL.revokeObjectURL(previewUrl)} // cleanup after load
              />
              <button
                type="button"
                onClick={() => handleRemove(idx)}
                className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600"
              >
                ×
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MultiImageUpload;
