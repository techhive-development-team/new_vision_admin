import { useState } from "react";
import { useGetCourse } from "../../hooks/useGetCourse";
import { API_URLS, imageUrl } from "../../enum/urls";
import { courseRepository } from "../../repositories/courseRepository";
import { Link } from "react-router-dom";

const PAGE_SIZE = 10;

export type Course = {
  id: string;
  name: string;
  programOverview: string;
  quiz: string;
  price: number;
  isOpened: boolean;
  expireDate: string;
  duration: string;
  location: string;
  level: string;
  createdAt: string;
  image: string;
};

type CourseTableProps = {
  name?: string;
  programType?: string;
  fromDate?: string;
  toDate?: string;
};

const CourseTable: React.FC<CourseTableProps> = ({
  name = "",
  programType = "",
  fromDate = "",
  toDate = "",
}) => {
  const [page, setPage] = useState(1);
  const offset = (page - 1) * PAGE_SIZE;

  const {
    data: courses,
    total,
    mutate,
  } = useGetCourse({
    offset,
    limit: PAGE_SIZE,
    name,
    programType,
    fromDate,
    toDate,
  });

  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  const totalPages = total ? Math.ceil(total / PAGE_SIZE) : 1;

  const handleDelete = (course: Course) => {
    setSelectedCourse(course);
    setDeleteError(null);
    (document.getElementById("delete_modal") as HTMLDialogElement).showModal();
  };

  const closeModal = () => {
    setSelectedCourse(null);
    setDeleteError(null);
    (document.getElementById("delete_modal") as HTMLDialogElement).close();
  };

  const confirmDelete = async () => {
    if (!selectedCourse) return;
    setDeleteError(null);

    try {
      const response = await courseRepository.deleteCourse(selectedCourse.id);

      if (response?.statusCode === 200) {
        await mutate();
        closeModal();
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
              <th>Image</th>
              <th>Name</th>
              <th>Program Overview</th>
              <th>Quiz</th>
              <th>Price</th>
              <th>Status</th>
              <th>Expire Date</th>
              <th>Duration</th>
              <th>Location</th>
              <th>Level</th>
              <th>Created At</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {courses && courses.length > 0 ? (
              courses.map((course: Course, index: number) => (
                <tr key={course.id}>
                  <td>{offset + index + 1}</td>
                  <td>
                    <img
                      className="w-16 h-16 object-cover rounded-md border"
                      src={`${imageUrl}${API_URLS.COURSE}/${course.image}`}
                      alt={course.name.substring(0, 10)}
                    />
                  </td>
                  <td>{course.name.substring(0, 50)}</td>
                  <td>{course.programOverview.substring(0, 50)}</td>
                  <td>
                    {course.quiz && (
                      <a
                        href={course.quiz}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 underline"
                      >
                        Quiz Link
                      </a>
                    )}
                  </td>
                  <td>{course?.price ? `${course.price} MMK` : ""}</td>
                  <td>
                    {course.isOpened ? (
                      <div className="badge badge-primary">Open</div>
                    ) : (
                      <div className="badge badge-error">Closed</div>
                    )}
                  </td>
                  <td>{course.expireDate && new Date(course.expireDate).toLocaleDateString()}</td>
                  <td>{course.duration}</td>
                  <td>
                    {course.location === "onsite" ? (
                      <div className="badge badge-success">Onsite</div>
                    ) : (
                      <div className="badge badge-accent">Online</div>
                    )}
                  </td>
                  <td>{course.level}</td>
                  <td>{new Date(course.createdAt).toLocaleString()}</td>
                  <td className="flex gap-2">
                    <Link
                      to={`/courses/${course.id}/edit`}
                      className="btn btn-sm btn-primary"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(course)}
                      className="btn btn-sm btn-error"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={14} className="text-center py-4">
                  No courses found
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
            <span className="font-semibold">{selectedCourse?.name}</span>?
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

export default CourseTable;
