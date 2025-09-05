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

const ImageTypeTable: React.FC = () =>{
  const [page, setPage] = useState(1);
  const offset = (page - 1) * PAGE_SIZE;

  const{
    data: imagetypes,
    mutate,
    total,
  } = useGetImageType({ limit: PAGE_SIZE, offset });
  const [selectedImageType, setSelectedImageType] = useState<ImageType | null>(null);

  const totalPages = total ? Math.ceil(total / PAGE_SIZE) : 1;

  const handleDelete = (imagetype: ImageType) => {
    setSelectedImageType(imagetype);
    (document.getElementById("delete_modal") as HTMLDialogElement).showModal();
  }

  const confirmDelete = async () => {
      if (!selectedImageType) return;
      try {
        const response = await imageTypeRepository.deleteImageType(selectedImageType.id);
        if (response?.statusCode === 200) {
          await mutate();
        } else {
          console.error("Delete failed:", response);
        }
      } catch (err) {
        console.error("Delete failed:", err);
      } finally {
        setSelectedImageType(null);
        (document.getElementById("delete_modal") as HTMLDialogElement).close();
      }
    };

    return(
      <div>
            {/* Table */}
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
                        <th>{offset + index + 1}</th>
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
                      <td colSpan={5} className="text-center py-4">
                        No Image Type found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
      
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
      
            <dialog id="delete_modal" className="modal">
              <div className="modal-box">
                <h3 className="font-bold text-lg">Confirm Delete</h3>
                <p className="py-4">
                  Are you sure you want to delete{" "}
                  <span className="font-semibold">{selectedImageType?.typeName}</span>?
                </p>
                <div className="modal-action">
                  <form method="dialog" className="flex gap-2">
                    <button className="btn">Cancel</button>
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
