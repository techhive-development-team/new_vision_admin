import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useGetFutureCountry } from "../../hooks/useGetFutureCountry";
import { futureCountryRepository } from "../../repositories/futureCountryRepository";

type FutureCountry = {
    id : string;
    country : string;
    createdAt : string;
};

const PAGE_SIZE = 10;

const FutureCountryTable: React.FC = () => {
  const [page, setPage] = useState(1);
  const offset = (page - 1) * PAGE_SIZE;

  const {
    data: futurecountry,
    mutate,
    total,
  } = useGetFutureCountry( { limit: PAGE_SIZE, offset } );
  const [ selectedFutureCountry, setSelectedFutureCountry ] =
    useState<FutureCountry | null>(null);

  const totalPages = total ? Math.ceil(total / PAGE_SIZE) : 1;

  const handleDelete = ( futureCountry: FutureCountry ) => {
    setSelectedFutureCountry( futureCountry );
    (document.getElementById( "delete_modal" ) as HTMLDialogElement ).showModal();
  };

  const confirmDelete = async () => {
    if (!selectedFutureCountry) return;
    try {
      const response = await futureCountryRepository.deleteFutureCountry(
        selectedFutureCountry.id
      );
      if ( response?.statusCode === 200 ) {
        await mutate();
      } else {
        console.error( "Delete failed:", response );
      }
    } catch ( err ) {
      console.error( "Delete failed:", err );
    } finally {
      setSelectedFutureCountry( null );
      ( document.getElementById( "delete_modal") as HTMLDialogElement ).close();
    }
  };

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>No</th>
              <th>Future Country</th>
              <th>Created At</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {futurecountry && futurecountry.length > 0 ? (
              futurecountry.map(
                ( futureCountry: FutureCountry, index: number ) => (
                  <tr key={ futureCountry.id }>
                    <th>{ offset + index + 1 }</th>
                    <td>{ futureCountry.country }</td>
                    <td>
                      { new Date( futureCountry.createdAt ).toLocaleString() }
                    </td>
                    <td className="flex gap-2">
                      <Link
                        to={`/futureCountry/${ futureCountry.id }/edit`}
                        className="btn btn-sm btn-primary"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={ () => handleDelete( futureCountry ) }
                        className="btn btn-sm btn-error"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                )
              )
            ) : (
              <tr>
                <td colSpan={5} className="text-center py-4">
                  No Future Country found
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
            <span className="font-semibold">
              {selectedFutureCountry?.country}
            </span>
            ?
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

export default FutureCountryTable;