import { useState } from "react";
import { useGetRegistration } from "../../hooks/useGetRegistration";
import { registrationRepository } from "../../repositories/registrationRepository";

type Registration = {
  id: number;
  paymentOption?: string;
  paymentStatus?: string;
  transactionId?: string | null;
  status?: string;
  registeredAt: string;
  student?: { id: number; name: string };
  batch?: { id: number; name: string; course?: { id: number; name: string } };
};

const PAGE_SIZE = 10;

const RegistrationTable = () => {
  const [page, setPage] = useState(1);
  const offset = (page - 1) * PAGE_SIZE;

  const { data: regs, total, mutate } = useGetRegistration({
    limit: PAGE_SIZE,
    offset,
  });

  const totalPages = total ? Math.ceil(total / PAGE_SIZE) : 1;

  const handleDelete = async (id: number) => {
    const res = await registrationRepository.deleteRegistration(String(id));
    if (res?.statusCode === 200) await mutate();
  };

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>No</th>
              <th>Student</th>
              <th>Course</th>
              <th>Batch</th>
              <th>Payment Option</th>
              <th>Payment Status</th>
              <th>Transaction Id</th>
              <th>Status</th>
              <th>Registered At</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {regs && regs.length > 0 ? (
              regs.map((r: Registration, idx: number) => (
                <tr key={r.id}>
                  <td>{offset + idx + 1}</td>
                  <td>{r.student?.name ?? '-'}</td>
                  <td>{r.batch?.course?.name ?? '-'}</td>
                  <td>{r.batch?.name ?? '-'}</td>
                  <td>{r.paymentOption ?? '-'}</td>
                  <td>{r.paymentStatus ?? '-'}</td>
                  <td>{r.transactionId ?? '-'}</td>
                  <td>{r.status ?? '-'}</td>
                  <td>{new Date(r.registeredAt).toLocaleString()}</td>
                  <td className="flex gap-2">
                    <button
                      className="btn btn-sm btn-error"
                      onClick={() => handleDelete(r.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={10} className="text-center py-4">
                  No registrations found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="join flex justify-end my-4">
        {[...Array(totalPages)].map((_, i) => {
          const pageNumber = i + 1;
          return (
            <input
              key={pageNumber}
              className="join-item btn btn-square"
              type="radio"
              name="reg-pagination"
              aria-label={String(pageNumber)}
              defaultChecked={page === pageNumber}
              onClick={() => setPage(pageNumber)}
            />
          );
        })}
      </div>
    </div>
  );
};

export default RegistrationTable;


