import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useGetUser } from "../../hooks/useGetUser";

type User = {
  id: number;
  name: string;
  email: string;
  createdAt: string;
};

const UserTable: React.FC = () => {
  const { data: users } = useGetUser();

  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const handleDelete = (user: User) => {
    setSelectedUser(user);
    (document.getElementById("delete_modal") as HTMLDialogElement).showModal();
  };

  const confirmDelete = () => {
    setSelectedUser(null);
    (document.getElementById("delete_modal") as HTMLDialogElement).close();
  };

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
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
                  <th>{index + 1}</th>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.createdAt}</td>
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

      <div className="flex justify-end w-full mt-4">
        <div className="join">
          <input
            className="join-item btn btn-square"
            type="radio"
            name="options"
            aria-label="1"
            defaultChecked
          />
          <input
            className="join-item btn btn-square"
            type="radio"
            name="options"
            aria-label="2"
          />
          <input
            className="join-item btn btn-square"
            type="radio"
            name="options"
            aria-label="3"
          />
          <input
            className="join-item btn btn-square"
            type="radio"
            name="options"
            aria-label="4"
          />
        </div>
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
