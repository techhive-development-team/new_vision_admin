import { useState } from "react";
import { useGetBatch } from "../../hooks/useGetBatch";
import { batchRepository } from "../../repositories/batchRepository";

type Course = {
  id: number;
  name: string;
};

type Batch = {
  id: number;
  name: string;
  startDate: string;
  endDate: string;
  capacity?: number | null;
  courseId: number;
  course?: Course;
  createdAt: string;
};

const PAGE_SIZE = 10;

const BatchTable = () => {
  const [page, setPage] = useState(1);
  const offset = (page - 1) * PAGE_SIZE;

  const { data: batches, total, mutate } = useGetBatch({
    limit: PAGE_SIZE,
    offset,
  });

  const totalPages = total ? Math.ceil(total / PAGE_SIZE) : 1;

  const handleDelete = async (id: number) => {
    const res = await batchRepository.deleteBatch(String(id));
    if (res?.statusCode === 200) await mutate();
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
              <th>Start</th>
              <th>End</th>
              <th>Capacity</th>
              <th>Created At</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {batches && batches.length > 0 ? (
              batches.map((b: Batch, idx: number) => (
                <tr key={b.id}>
                  <td>{offset + idx + 1}</td>
                  <td>{b.name}</td>
                  <td>{b.course?.name ?? '-'}</td>
                  <td>{new Date(b.startDate).toLocaleDateString()}</td>
                  <td>{new Date(b.endDate).toLocaleDateString()}</td>
                  <td>{b.capacity ?? '-'}</td>
                  <td>{new Date(b.createdAt).toLocaleString()}</td>
                  <td className="flex gap-2">
                    <button
                      className="btn btn-sm btn-error"
                      onClick={() => handleDelete(b.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={8} className="text-center py-4">
                  No batches found
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
              name="batch-pagination"
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

export default BatchTable;


