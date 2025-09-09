import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useGetHappeningType } from "../../hooks/useGetHappeningType";
import { happeningTypeRepository } from "../../repositories/happeningTypeRepository";

type HappeningType = {
  id: string;
  typeName: string;
  createdAt: string;
};

const PAGE_SIZE = 10;

const HappeningTypeTable: React.FC = () => {
  const [page, setPage] = useState(1);
  const offset = (page - 1) * PAGE_SIZE;

  const {
    data: happeningtypes,
    mutate,
    total,
  } = useGetHappeningType({ limit: PAGE_SIZE, offset });
  const [selectedHappeningType, setSelectedHappeningType] =
    useState<HappeningType | null>(null);

  const totalPages = total ? Math.ceil(total / PAGE_SIZE) : 1;

  const handleDelete = (happeningtype: HappeningType) => {
    setSelectedHappeningType(happeningtype);
    (document.getElementById("delete_modal") as HTMLDialogElement).showModal();
  };

  const confirmDelete = async () => {
    if (!selectedHappeningType) return;
    try {
      const response = await happeningTypeRepository.deleteHappeningType(
        selectedHappeningType.id
      );
      if (response?.statusCode === 200) {
        await mutate();
      } else {
        console.error("Delete failed:", response);
      }
    } catch (err) {
      console.error("Delete failed:", err);
    } finally {
      setSelectedHappeningType(null);
      (document.getElementById("delete_modal") as HTMLDialogElement).close();
    }
  };

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>No</th>
              <th>Happening Type</th>
              <th>Created At</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {happeningtypes && happeningtypes.length > 0 ? (
              happeningtypes.map(
                (happeningType: HappeningType, index: number) => (
                  <tr key={happeningType.id}>
                    <th>{offset + index + 1}</th>
                    <td>{happeningType.typeName}</td>
                    <td>
                      {new Date(happeningType.createdAt).toLocaleString()}
                    </td>
                    <td className="flex gap-2">
                      <Link
                        to={`/happeningtypes/${happeningType.id}/edit`}
                        className="btn btn-sm btn-primary"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(happeningType)}
                        className="btn btn-sm btn-error"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                )
              )
            ) : (
              <tr>
                <td colSpan={5} className="text-center py-4">
                  No Happening Type found
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
            <span className="font-semibold">
              {selectedHappeningType?.typeName}
            </span>
            ?
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

export default HappeningTypeTable;