import React, { type DragEvent, useState, useEffect } from "react";
import { useController, useFormContext } from "react-hook-form";

interface MultiFileUploadProps {
  name: string;
  label?: string;
  defaultUrls?: string[];
  accept?: string;
  maxSize?: number;
  allowedTypes?: string[];
  fileTypeLabel?: string;
  onExistingImagesChange?: (existingImages: string[]) => void;
}

interface PreviewItem {
  url: string;
  isDefault: boolean;
  file?: File;
  name?: string;
}

const MultiFileUpload: React.FC<MultiFileUploadProps> = ({
  name,
  label,
  defaultUrls = [],
  accept = "*/*",
  maxSize = 5 * 1024 * 1024, // 5MB default
  allowedTypes = [],
  fileTypeLabel = "files",
  onExistingImagesChange,
}) => {
  const { control } = useFormContext();
  const {
    field: { value = [], onChange },
    fieldState: { error },
  } = useController({ name, control });

  const [previews, setPreviews] = useState<PreviewItem[]>([]);
  const [dragActive, setDragActive] = useState(false);

  useEffect(() => {
    // Initialize previews with default URLs only once or when length changes
    const defaultPreviews: PreviewItem[] = defaultUrls.map((url) => ({
      url,
      isDefault: true,
      name: url.split("/").pop() || "Unknown file",
    }));
    setPreviews((prev) => {
      // Only update if the number of default URLs changed or if we have no previews yet
      if (
        prev.length === 0 ||
        prev.filter((p) => p.isDefault).length !== defaultUrls.length
      ) {
        return defaultPreviews;
      }
      return prev;
    });

    // Initialize existing images callback
    if (onExistingImagesChange && defaultUrls.length > 0) {
      const imageNames = defaultUrls
        .map((url) => url.split("/").pop() || "")
        .filter(Boolean);
      onExistingImagesChange(imageNames);
    }
  }, [defaultUrls.length, onExistingImagesChange]); // Only depend on length, not the entire array

  const isValidFileType = (file: File): boolean => {
    if (allowedTypes.length === 0) return true;
    return allowedTypes.some(
      (type) =>
        file.type.includes(type) || file.name.toLowerCase().endsWith(type)
    );
  };

  const isValidFileSize = (file: File): boolean => {
    return file.size <= maxSize;
  };

  const isImage = (file: File | string): boolean => {
    if (typeof file === "string") {
      return /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(file);
    }
    return file.type.startsWith("image/");
  };

  const handleFiles = (files: FileList | null) => {
    if (!files) return;

    const fileArray = Array.from(files);
    const validFiles: File[] = [];
    const errors: string[] = [];

    fileArray.forEach((file) => {
      if (!isValidFileType(file)) {
        errors.push(`${file.name}: Invalid file type`);
        return;
      }

      if (!isValidFileSize(file)) {
        errors.push(
          `${file.name}: File size exceeds ${maxSize / (1024 * 1024)}MB`
        );
        return;
      }

      validFiles.push(file);
    });

    if (errors.length > 0) {
      alert(errors.join("\n"));
    }

    if (validFiles.length > 0) {
      // Update form value with new files
      const currentFiles = Array.isArray(value)
        ? value.filter((f): f is File => f instanceof File)
        : [];
      onChange([...currentFiles, ...validFiles]);

      // Update previews with new files
      const newPreviews: PreviewItem[] = validFiles.map((file) => ({
        url: isImage(file) ? URL.createObjectURL(file) : "",
        isDefault: false,
        file,
        name: file.name,
      }));

      setPreviews((prev) => [...prev, ...newPreviews]);
    }
  };

  const handleRemove = (index: number) => {
    const itemToRemove = previews[index];

    if (itemToRemove.isDefault) {
      // Remove default URL and notify parent
      const newPreviews = previews.filter((_, idx) => idx !== index);
      setPreviews(newPreviews);

      // Notify parent about remaining existing images
      if (onExistingImagesChange) {
        const remainingExistingImages = newPreviews
          .filter((p) => p.isDefault)
          .map((p) => p.name?.split("/").pop() || p.url.split("/").pop() || "")
          .filter(Boolean);
        onExistingImagesChange(remainingExistingImages);
      }
    } else {
      // Remove file from form value and previews
      const currentFiles = Array.isArray(value)
        ? value.filter((f): f is File => f instanceof File)
        : [];
      const fileIndex = currentFiles.findIndex((f) => f === itemToRemove.file);

      if (fileIndex !== -1) {
        const newFiles = [...currentFiles];
        newFiles.splice(fileIndex, 1);
        onChange(newFiles);
      }

      // Clean up object URL to prevent memory leaks
      if (itemToRemove.url && itemToRemove.url.startsWith("blob:")) {
        URL.revokeObjectURL(itemToRemove.url);
      }

      const newPreviews = previews.filter((_, idx) => idx !== index);
      setPreviews(newPreviews);
    }
  };

  const handleDrag = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    handleFiles(e.dataTransfer.files);
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const FilePreview: React.FC<{ item: PreviewItem; index: number }> = ({
    item,
    index,
  }) => {
    const isImg = isImage(item.file || item.url);

    return (
      <div className="relative group border rounded-lg p-3 hover:shadow-md transition-shadow">
        {isImg ? (
          <div className="w-24 h-24 mx-auto mb-2 flex items-center justify-center rounded">
            <img
              src={item.url}
              alt={item.name}
              className="max-w-full max-h-full object-contain rounded"
            />
          </div>
        ) : (
          <div className="w-24 h-24 mx-auto mb-2 flex items-center justify-center rounded">
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>
        )}

        <div className="text-xs text-center">
          <p className="font-medium truncate" title={item.name}>
            {item.name}
          </p>
          {item.file && (
            <p className="text-gray-500 mt-1">
              {formatFileSize(item.file.size)}
            </p>
          )}
          {item.isDefault && (
            <span className="badge badge-primary badge-sm mt-1">Existing</span>
          )}
        </div>

        <button
          type="button"
          onClick={() => handleRemove(index)}
          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600 transition-colors opacity-0 group-hover:opacity-100"
          title="Remove file"
        >
          ×
        </button>
      </div>
    );
  };

  return (
    <div className="w-full">
      {label && <label className="block mb-2 font-medium">{label}</label>}

      <div
        className={`border-2 border-dashed rounded-lg p-8 flex flex-col items-center justify-center cursor-pointer transition-colors ${
          dragActive
            ? "border-blue-400 bg-blue-50"
            : "border-gray-300 hover:border-gray-400"
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={() =>
          document.getElementById(`hiddenFileInput-${name}`)?.click()
        }
      >
        <div className="text-center">
          <svg
            className="mx-auto h-12 w-12 mb-4"
            stroke="currentColor"
            fill="none"
            viewBox="0 0 48 48"
          >
            <path
              d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <p className="text-lg">Click or drag & drop {fileTypeLabel} here</p>
          <p className="text-sm mt-2">
            Max size: {formatFileSize(maxSize)}
            {allowedTypes.length > 0 && (
              <span className="block mt-1">
                Allowed types: {allowedTypes.join(", ")}
              </span>
            )}
          </p>
        </div>
      </div>

      <input
        type="file"
        id={`hiddenFileInput-${name}`}
        multiple
        accept={accept}
        className="hidden"
        onChange={(e) => handleFiles(e.target.files)}
      />

      {previews.length > 0 && (
        <div className="mt-6">
          <h4 className="text-sm font-medium mb-3">
            Selected Files ({previews.length})
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {previews.map((item, index) => (
              <FilePreview key={index} item={item} index={index} />
            ))}
          </div>
        </div>
      )}

      {error && (
        <div className="mt-2 text-sm text-red-600">{error.message}</div>
      )}
    </div>
  );
};

export default MultiFileUpload;
