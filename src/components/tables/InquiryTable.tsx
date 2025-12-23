import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useGetInquiry } from "../../hooks/useGetInquiry";
import { inquiryRepository } from "../../repositories/inquiryRepository";
import type { Course } from "./CourseTable";

type Inquiry = {
  id: string;
  name: string;
  email: string;
  phone?: string;
  course?: Course;
  description: string;
  createdAt: string;
};

const PAGE_SIZE = 10;

const InquiryTable: React.FC = () => {
  const [page, setPage] = useState(1);
  const offset = (page - 1) * PAGE_SIZE;
  const {
    data: inquiries,
    mutate,
    total,
  } = useGetInquiry({
    limit: PAGE_SIZE,
    offset,
  });

  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);

  const totalPages = total ? Math.ceil(total / PAGE_SIZE) : 1;

  const handleDelete = (inquiry: Inquiry) => {
    setSelectedInquiry(inquiry);
    (document.getElementById("delete_modal") as HTMLDialogElement).showModal();
  };

  const confirmDelete = async () => {
    if (!selectedInquiry) return;
    try {
      const response = await inquiryRepository.deleteInquiry(
        selectedInquiry.id
      );
      if (response?.statusCode === 200) {
        await mutate();
      } else {
        console.error("Delete failed:", response);
      }
    } catch (err) {
      console.error("Delete failed:", err);
    } finally {
      setSelectedInquiry(null);
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
              <th>Course</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Description</th>
              <th>Created At</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {inquiries && inquiries.length > 0 ? (
              inquiries.map((inquiry: Inquiry, index: number) => (
                <tr key={inquiry.id}>
                  <th>{offset + index + 1}</th>
                  <td>{inquiry.name}</td>
                  <td>
                    {inquiry.course
                      ? [
                          inquiry.course.name,
                          inquiry.course.level,
                          inquiry.course.location,
                        ]
                          .filter(Boolean)
                          .join(" - ")
                      : "-"}
                  </td>
                  <td>{inquiry.email}</td>
                  <td>{inquiry.phone || "-"}</td>
                  <td>{inquiry.description}</td>
                  <td>{new Date(inquiry.createdAt).toLocaleString()}</td>
                  <td className="flex gap-2">
                    <Link
                      to="/inquiry/view"
                      state={{ inquiry }}
                      className="btn btn-sm btn-info"
                    >
                      View
                    </Link>

                    <button
                      onClick={() => handleDelete(inquiry)}
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
                  No Inquiry found
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
            Are you sure you want to delete inquiry from{" "}
            <span className="font-semibold">{selectedInquiry?.name}</span>?
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

export default InquiryTable;
