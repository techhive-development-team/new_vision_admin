import { useState } from "react";
import { Link } from "react-router-dom";
import { API_URLS, baseUrl } from "../../enum/urls";
import { studentReviewRepository } from "../../repositories/studentReviewRepository";
import { useGetStudentReview } from "../../hooks/useGetStudentReview";
import { useGetEducationPartner } from "../../hooks/useGetEducationPartner";

type StudentReview = {
  id: string;
  name: string;
  batch: string;
  student_img: string;
  review: string;
  qualification: string;
  educationPartnerId: string;
  createdAt: string;
};

const PAGE_SIZE = 10;

const StudentReviewTable = () => {
  const [page, setPage] = useState(1);
  const offset = (page - 1) * PAGE_SIZE;
  const { data: reviews, total, mutate } = useGetStudentReview({ offset, limit: PAGE_SIZE });

  const { data: partners } = useGetEducationPartner();
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

  // Helper to get partner name
  const getPartnerName = (id: string) => {
    const partner = partners?.find((p: any) => p.id === id);
    return partner ? partner.name : "Unknown";
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
              <th>Education Partner</th>
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
                      src={`${baseUrl}${API_URLS.UPLOAD}${API_URLS.STUDENTREVIEW}/${review.student_img}`}
                      alt={review.name.substring(0, 10)}
                    />
                  </td>
                  <td>{getPartnerName(review.educationPartnerId)}</td>
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
