import { useState } from "react";
import { Link } from "react-router-dom";
import { API_URLS, imageUrl } from "../../enum/urls";
import { studentReviewRepository } from "../../repositories/studentReviewRepository";
import { useGetStudentReview } from "../../hooks/useGetStudentReview";

type StudentReview = {
  id: string;
  name: string;
  batch: string;
  student_img: string;
  university: string;
  review: string;
  qualification: string;
  createdAt: string;
};

type StudentReviewTableProps = {
  name?: string
}

const PAGE_SIZE = 10;

const StudentReviewTable: React.FC<StudentReviewTableProps> = ({ name = "" }) => {
  const [page, setPage] = useState(1);
  const offset = (page - 1) * PAGE_SIZE;
  const {
    data: reviews,
    total,
    mutate } =
    useGetStudentReview({
      offset,
      limit: PAGE_SIZE,
      name,
    });

  const [selectedReview, setSelectedReview] = useState<StudentReview | null>(null);
  const totalPages = total ? Math.ceil(total / PAGE_SIZE) : 1;

  const handleDelete = (review: StudentReview) => {
    setSelectedReview(review);
    (document.getElementById("delete_modal") as HTMLDialogElement).showModal();
  };

  const confirmDelete = async () => {
    if (!selectedReview) return;
    try {
      const response = await studentReviewRepository.deleteStudentReview(selectedReview.id);
      if (response?.statusCode === 200) {
        await mutate();
      } else {
        console.error("Delete failed:", response);
      }
    } catch (err) {
      console.error("Delete failed:", err);
    } finally {
      setSelectedReview(null);
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
              <th>Name</th>
              <th>Batch</th>
              <th>Student Image</th>
              <th>University Name</th>
              <th>Review</th>
              <th>Qualification</th>
              <th>Created At</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {reviews && reviews.length > 0 ? (
              reviews.map((review: StudentReview, index: number) => (
                <tr key={review.id}>
                  <th>{offset + index + 1}</th>
                  <td>{review.name}</td>
                  <td>{review.batch}</td>
                  <td>
                    <img
                      className="w-16 h-16 object-cover rounded-md border"
                      src={`${imageUrl}${API_URLS.STUDENTREVIEW}/${review.student_img}`}
                      alt={review.name.substring(0, 10)}
                    />
                  </td>
                  <td>
                    {review.university}
                  </td>
                  <td>
                    {review.review?.length > 10
                      ? review.review.substring(0, 10) + "..."
                      : review.review}
                  </td>
                  <td>{review.qualification}</td>
                  <td>{new Date(review.createdAt).toLocaleString()}</td>
                  <td className="flex gap-2">
                    <Link
                      to={`/studentReview/${review.id}/edit`}
                      className="btn btn-sm btn-primary"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(review)}
                      className="btn btn-sm btn-error"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={9} className="text-center py-4">
                  No reviews found
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

      {/* Delete Modal */}
      <dialog id="delete_modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Confirm Delete</h3>
          <p className="py-4">
            Are you sure you want to delete{" "}
            <span className="font-semibold">{selectedReview?.name}</span>?
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

export default StudentReviewTable;
