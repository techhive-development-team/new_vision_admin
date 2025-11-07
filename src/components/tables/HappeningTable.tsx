import { useState } from "react";
import { Link } from "react-router-dom";
import { API_URLS, baseUrl, imageUrl } from "../../enum/urls";
import { happeningRepository } from "../../repositories/happeningRepository";
import { useGetHappening } from "../../hooks/useGetHappening";

type Happening = {
  id: string;
  title: string;
  description: string;
  mainImage: string;
  happeningType: {
    id: number;
    typeName: string;
  };
  album: {
    id: number;
    images: { id: number; image: string }[];
  };
  createdAt: string;
};

type HappeningTableProps = {
  title?: string;
  happeningTypeId?: string;
}

const PAGE_SIZE = 10;

const HappeningTable: React.FC<HappeningTableProps> = ({ title = "", happeningTypeId = ""}) => {
  const [page, setPage] = useState(1);
  const offset = (page - 1) * PAGE_SIZE;
  const {
    data: happenings,
    total,
    mutate,
  } = useGetHappening({
    offset,
    limit: PAGE_SIZE,
    title,
    happeningTypeId,
  });
  const [selectedHappening, setSelectedHappening] = useState<Happening | null>(
    null
  );
  const totalPages = total ? Math.ceil(total / PAGE_SIZE) : 1;

  const handleDelete = (happening: Happening) => {
    setSelectedHappening(happening);
    (document.getElementById("delete_modal") as HTMLDialogElement).showModal();
  };

  const confirmDelete = async () => {
    if (!selectedHappening) return;
    try {
      const response = await happeningRepository.deleteHappening(
        selectedHappening.id
      );
      if (response?.statusCode === 200) {
        await mutate();
      } else {
        console.error("Delete failed:", response);
      }
    } catch (err) {
      console.error("Delete failed:", err);
    } finally {
      setSelectedHappening(null);
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
              <th>Title</th>
              <th>Main Image</th>
              <th>Type</th>
              <th>Created At</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {happenings && happenings.length > 0 ? (
              happenings.map((happening: Happening, index: number) => (
                <tr key={happening.id}>
                  <th>{offset + index + 1}</th>
                  <td>{happening.title}</td>
                  <td>
                    <img
                      className="w-16 h-16 object-cover rounded-md border"
                      src={`${imageUrl}${API_URLS.HAPPENING}/${happening.mainImage}`}
                      alt={happening.title.substring(0, 10)}
                    />
                  </td>
                  <td>{happening.happeningType.typeName}</td>
                  <td>{new Date(happening.createdAt).toLocaleString()}</td>
                  <td className="flex gap-2">
                    <Link
                      to={`/happenings/${happening.id}/edit`}
                      className="btn btn-sm btn-primary"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(happening)}
                      className="btn btn-sm btn-error"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="text-center py-4">
                  No happenings found
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
            <span className="font-semibold">{selectedHappening?.title}</span>?
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

export default HappeningTable;
