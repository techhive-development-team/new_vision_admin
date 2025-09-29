import { useState } from "react";
import { Link } from "react-router-dom";
import { useGetStudent } from "../../hooks/useGetStudent";
import { API_URLS, baseUrl } from "../../enum/urls";
import { studentRepository } from "../../repositories/studentRepository";

export type Student = {
  id: string;
  name: string;
  parentName: string;
  parentJob: string;
  dob: string;
  email: string;
  address: string;
  postalCode: string;
  phone: string;
  studentImage: string;
  school: string;
  studyAbroad: boolean;
  futurePlan: string;
  futureCountryName: string;
  futureuniversityName: string;
  potentialYearOfStudy: string;
  joinRaffles: string;
  paymentOption: string;
  status: string;
  transactionId: string;
  courseId?: string;
  createdAt: string;
};

const PAGE_SIZE = 10;

const StudentTable = () => {
  const [page, setPage] = useState(1);
  const offset = (page - 1) * PAGE_SIZE;

  const {
    data: students,
    total,
    mutate,
  } = useGetStudent({ offset, limit: PAGE_SIZE });
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  const totalPages = total ? Math.ceil(total / PAGE_SIZE) : 1;

  const handleDelete = (student: Student) => {
    setSelectedStudent(student);
    (document.getElementById("delete_modal") as HTMLDialogElement).showModal();
  };

  const confirmDelete = async () => {
    if (!selectedStudent) return;
    try {
      const response = await studentRepository.deleteStudent(
        selectedStudent.id
      );
      if (response?.statusCode === 200) {
        await mutate();
      } else {
        console.error("Delete failed:", response);
      }
    } catch (err) {
      console.error("Delete failed:", err);
    } finally {
      setSelectedStudent(null);
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
              <th>Parent Name</th>
              <th>Parent Job</th>
              <th>Email</th>
              <th>Phone</th>
              <th>School</th>
              <th>Study Abroad</th>
              <th>Future Plan</th>
              <th>Join Raffles</th>
              <th>Payment Option</th>
              <th>Status</th>
              <th>Course</th>
              <th>Created At</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {students && students.length > 0 ? (
              students.map((student: Student, index: number) => (
                <tr key={student.id}>
                  <td>{offset + index + 1}</td>
                  <td>
                    <img
                      className="w-16 h-16 object-cover rounded-md border"
                      src={`${baseUrl}${API_URLS.UPLOAD}${API_URLS.STUDENT}/${student.studentImage}`}
                      alt={student.name.substring(0, 10)}
                    />
                  </td>
                  <td>{student.name}</td>
                  <td>{student.parentName}</td>
                  <td>{student.parentJob}</td>
                  <td>{student.email}</td>
                  <td>{student.phone}</td>
                  <td>{student.school}</td>
                  <td>{student.studyAbroad ? "Yes" : "No"}</td>
                  <td>{student.futurePlan}</td>
                  <td>{student.joinRaffles}</td>
                  <td>{student.paymentOption}</td>
                  <td>{student.status}</td>
                  <td>{student.courseId}</td>
                  <td>{new Date(student.createdAt).toLocaleString()}</td>
                  <td className="flex gap-2">
                    <Link
                      to={`/students/${student.id}/view`}
                      state={{ student }}
                      className="btn btn-sm btn-info"
                    >
                      View
                    </Link>
                    <Link
                      to={`/students/${student.id}/edit`}
                      className="btn btn-sm btn-primary"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(student)}
                      className="btn btn-sm btn-error"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={15} className="text-center py-4">
                  No students found
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
            <span className="font-semibold">{selectedStudent?.name}</span>?
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

export default StudentTable;
