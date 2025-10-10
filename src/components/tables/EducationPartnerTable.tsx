import { useState } from "react";
import { Link } from "react-router-dom";
import { useGetEducationPartner } from "../../hooks/useGetEducationPartner";
import { API_URLS, baseUrl } from "../../enum/urls";
import { educationPartnerRepository } from "../../repositories/educationPartnerRepository";

type Partner = {
  id: string;
  name: string;
  overview: string;
  location: string;
  foundedDate?: string;
  partnerType?: string;
  logo_img?: string;
  bg_img?: string;
  createdAt: string;
};

const PAGE_SIZE = 10;

const EducationPartnerTable = () => {
  const [page, setPage] = useState(1);
  const offset = (page - 1) * PAGE_SIZE;

  const {
    data: partners,
    total,
    mutate,
  } = useGetEducationPartner({
    offset,
    limit: PAGE_SIZE,
  });

  const [selectedPartner, setSelectedPartner] = useState<Partner | null>(null);
  const totalPages = total ? Math.ceil(total / PAGE_SIZE) : 1;

  const handleDelete = (partner: Partner) => {
    setSelectedPartner(partner);
    (document.getElementById("delete_modal") as HTMLDialogElement).showModal();
  };

  const confirmDelete = async () => {
    if (!selectedPartner) return;
    try {
      const response = await educationPartnerRepository.deleteEducationPartner(
        selectedPartner.id
      );
      if (response?.statusCode === 200) {
        await mutate();
      } else {
        console.error("Delete failed:", response);
      }
    } catch (err) {
      console.error("Delete failed:", err);
    } finally {
      setSelectedPartner(null);
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
              <th>Logo</th>
              <th>Background</th>
              <th>Name</th>
              <th>Overview</th>
              <th>Location</th>
              <th>Partner Type</th>
              <th>Founded Date</th>
              <th>Created At</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {partners && partners.length > 0 ? (
              partners.map((partner: Partner, index: number) => (
                <tr key={partner.id}>
                  <th>{offset + index + 1}</th>
                  <td>
                    {partner.logo_img && (
                      <img
                        src={`${baseUrl}${API_URLS.UPLOAD}${API_URLS.EDUCATION_PARTNER}/${partner.logo_img}`}
                        alt="Logo"
                        className="w-16 h-16 object-cover rounded-md border"
                      />
                    )}
                  </td>
                  <td>
                    {partner.bg_img && (
                      <img
                        src={`${baseUrl}${API_URLS.UPLOAD}${API_URLS.EDUCATION_PARTNER}/${partner.bg_img}`}
                        alt="Background"
                        className="w-16 h-16 object-cover rounded-md border"
                      />
                    )}
                  </td>
                  <td>{partner.name}</td>
                  <td>{partner.overview}</td>
                  <td>{partner.location}</td>
                  <td>
                    {partner.partnerType === "UNIVERSITY" && (
                      <div className="badge badge-primary">University</div>
                    )}
                    {partner.partnerType === "INSTITUTE" && (
                      <div className="badge badge-info">Institute</div>
                    )}
                    {partner.partnerType === "COLLEGE" && (
                      <div className="badge badge-success">College</div>
                    )}
                  </td>
                  <td>{partner.foundedDate || "-"}</td>
                  <td>
                    {new Date(partner.createdAt).toLocaleString("en-GB", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                      second: "2-digit",
                    })}
                  </td>
                  <td className="flex gap-2">
                    <Link
                      to={`/education-partners/${partner.id}/edit`}
                      className="btn btn-sm btn-primary"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(partner)}
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
                  No Education Partners found
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
            <span className="font-semibold">{selectedPartner?.overview}</span>?
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

export default EducationPartnerTable;
