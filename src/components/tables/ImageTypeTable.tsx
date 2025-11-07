import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useGetImageType } from "../../hooks/useGetImageType";
import { imageTypeRepository } from "../../repositories/imageTypeRepository";

type ImageType = {
  id: string;
  typeName: string;
  createdAt: string;
};

const PAGE_SIZE = 10;

const ImageTypeTable: React.FC = () => {
  const [page, setPage] = useState(1);
  const offset = (page - 1) * PAGE_SIZE;

  const {
    data: imagetypes,
    mutate,
    total,
  } = useGetImageType({
    limit: PAGE_SIZE,
    offset,
  });

  const [selectedImageType, setSelectedImageType] = useState<ImageType | null>(
    null
  );
  const [deleteError, setDeleteError] = useState<string | null>(null);

  const totalPages = total ? Math.ceil(total / PAGE_SIZE) : 1;

  const handleDelete = (imageType: ImageType) => {
    setSelectedImageType(imageType);
    setDeleteError(null);
    (document.getElementById("delete_modal") as HTMLDialogElement).showModal();
  };

  const closeModal = () => {
    setDeleteError(null);
    setSelectedImageType(null);
    (document.getElementById("delete_modal") as HTMLDialogElement).close();
  };

  const confirmDelete = async () => {
  if (!selectedImageType) return;
  setDeleteError(null);

  try {
    const response = await imageTypeRepository.deleteImageType(selectedImageType.id);
    if (response?.statusCode === 200) {
        await mutate();
        closeModal();
        alert(response?.message || "Course deleted successfully.");
      }
  } catch (err: any) {
    console.error("Delete failed:", err);

      if (Array.isArray(err.data)) {
        setDeleteError(err.data.map((d: any) => d.message).join("\n"));
      } else if (err?.response?.data?.message) {
        setDeleteError(err.response.data.message);
      } else if (err?.message) {
        setDeleteError(err.message);
      } else {
        setDeleteError("Cannot delete: something went wrong.");
      }
  }
};


  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>No</th>
              <th>Image Type</th>
              <th>Created At</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {imagetypes && imagetypes.length > 0 ? (
              imagetypes.map((imageType: ImageType, index: number) => (
                <tr key={imageType.id}>
                  <td>{offset + index + 1}</td>
                  <td>{imageType.typeName}</td>
                  <td>{new Date(imageType.createdAt).toLocaleString()}</td>
                  <td className="flex gap-2">
                    <Link
                      to={`/imagetypes/${imageType.id}/edit`}
                      className="btn btn-sm btn-primary"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(imageType)}
                      className="btn btn-sm btn-error"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="text-center py-4">
                  No image types found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="join flex justify-end my-4">
        {[...Array(totalPages)].map((_, idx) => {
          const pageNumber = idx + 1;
          return (
            <input
              key={pageNumber}
              className="join-item btn btn-square"
              type="radio"
              name="options"
              aria-label={String(pageNumber)}
              defaultChecked={page === pageNumber}
              onClick={() => setPage(pageNumber)}
            />
          );
        })}
      </div>

      {/* Delete Modal */}
      <dialog id="delete_modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Confirm Delete</h3>
          <p className="py-4">
            Are you sure you want to delete{" "}
            <span className="font-semibold">{selectedImageType?.typeName}</span>
            ?
          </p>

          {deleteError && (
            <p className="text-red-500 bg-red-50 border border-red-200 rounded-md p-2 mb-2 whitespace-pre-line">
              ⚠️ {deleteError}
            </p>
          )}

          <div className="modal-action">
            <form method="dialog" className="flex gap-2">
              <button type="button" onClick={closeModal} className="btn">
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmDelete}
                className="btn btn-error"
              >
                Yes, Delete
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default ImageTypeTable;
