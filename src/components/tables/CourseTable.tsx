import { useState } from "react";
import { useGetCourse } from "../../hooks/useGetCourse";
import { API_URLS, baseUrl } from "../../enum/urls";
import { courseRepository } from "../../repositories/courseRepository";
import { Link } from "react-router-dom";

const PAGE_SIZE = 10;

export type Course = {
  id: string;
  name: string;
  programOverview: string;
  quiz: string;
  skills: string[];
  price: number;
  isOpened: boolean;
  expireDate: string;
  duration: string;
  location: string;
  level: string;
  createdAt: string;
  image: string;
};

const CourseTable = () => {
  const [page, setPage] = useState(1);
  const offset = (page - 1) * PAGE_SIZE;
  const {
    data: courses,
    total,
    mutate,
  } = useGetCourse({ offset, limit: PAGE_SIZE });
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  const totalPages = total ? Math.ceil(total / PAGE_SIZE) : 1;

  const handleDelete = (course: Course) => {
    setSelectedCourse(course);
    (document.getElementById("delete_modal") as HTMLDialogElement).showModal();
  };

  const confirmDelete = async () => {
    if (!selectedCourse) return;
    try {
      const response = await courseRepository.deleteCourse(selectedCourse.id);
      if (response?.statusCode === 200) {
        await mutate();
      } else {
        console.error("Delete failed:", response);
      }
    } catch (err) {
      console.error("Delete failed:", err);
    } finally {
      setSelectedCourse(null);
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
                      src={`${baseUrl}${API_URLS.UPLOAD}${API_URLS.COURSE}/${course.image}`}
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
                  <td>{course.price} MMK</td>
                  <td>
                    {course.isOpened ? (
                      <div className="badge badge-primary">Open</div>
                    ) : (
                      <div className="badge badge-error">Closed</div>
                    )}
                  </td>
                  <td>{new Date(course.expireDate).toLocaleDateString()}</td>
                  <td>{course.duration}</td>
                  <td>
                    {course.location == "onsite" ? (
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

      <dialog id="delete_modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Confirm Delete</h3>
          <p className="py-4">
            Are you sure you want to delete{" "}
            <span className="font-semibold">{selectedCourse?.name}</span>?
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

export default CourseTable;
