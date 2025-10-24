import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useGetUser } from "../../hooks/useGetUser";
import { userRepository } from "../../repositories/userRepository";

type User = {
  id: string;
  name: string;
  email: string;
  createdAt: string;
};

type UserTableProps = {
  userName?: string;
  userEmail?: string;
};

const PAGE_SIZE = 10;

const UserTable: React.FC<UserTableProps> = ({ userName, userEmail }) => {
  const [page, setPage] = useState(1);
  const offset = (page - 1) * PAGE_SIZE;

  const {
    data: users,
    mutate,
    total,
  } = useGetUser({
    limit: PAGE_SIZE,
    offset,
    name: userName,
    email: userEmail,
  });
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const totalPages = total ? Math.ceil(total / PAGE_SIZE) : 1;

  const handleDelete = (user: User) => {
    setSelectedUser(user);
    (document.getElementById("delete_modal") as HTMLDialogElement).showModal();
  };

  const confirmDelete = async () => {
    if (!selectedUser) return;
    try {
      const response = await userRepository.deleteUser(selectedUser.id);
      if (response?.statusCode === 200) {
        await mutate();
      } else {
        console.error("Delete failed:", response);
      }
    } catch (err) {
      console.error("Delete failed:", err);
    } finally {
      setSelectedUser(null);
      (document.getElementById("delete_modal") as HTMLDialogElement).close();
    }
  };

  return (
    <div>
      {/* Table */}
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>No</th>
              <th>Name</th>
              <th>Email</th>
              <th>Created At</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users && users.length > 0 ? (
              users.map((user: User, index: number) => (
                <tr key={user.id}>
                  <th>{offset + index + 1}</th>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{new Date(user.createdAt).toLocaleString()}</td>
                  <td className="flex gap-2">
                    <Link
                      to={`/users/${user.id}/edit`}
                      className="btn btn-sm btn-primary"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(user)}
                      className="btn btn-sm btn-error"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="text-center py-4">
                  No users found
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
            <span className="font-semibold">{selectedUser?.name}</span>?
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

export default UserTable;
