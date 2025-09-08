import { useRef } from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const logoutModalRef = useRef<HTMLDialogElement>(null);

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    logoutModalRef.current?.close();
    navigate("/login");
  };

  return (
    <>
      <div className="navbar bg-base-200 shadow-md">
        <div className="flex-none lg:hidden">
          <label htmlFor="my-drawer" className="btn btn-square btn-ghost">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </label>
        </div>

        <div className="flex-1 px-2">
          <a className="text-lg font-bold">
            New Vision Art & Science Institute
          </a>
        </div>

        <div className="flex-none">
          <button
            className="btn btn-ghost"
            onClick={() => logoutModalRef.current?.showModal()}
          >
            Logout
          </button>
        </div>
      </div>

      <dialog id="logout_modal" className="modal" ref={logoutModalRef}>
        <div className="modal-box">
          <h3 className="font-bold text-lg">Confirm Logout</h3>
          <p className="py-4">Are you sure you want to logout?</p>
          <div className="modal-action">
            <form method="dialog" className="flex gap-2">
              <button className="btn">Cancel</button>
              <button
                type="button"
                onClick={handleLogout}
                className="btn btn-error"
              >
                Yes, Logout
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default Navbar;
