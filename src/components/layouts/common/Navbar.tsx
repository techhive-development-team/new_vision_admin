import { useRef } from "react";
import ThemeSelector from "../../forms/ThemeSelector";

const Navbar = () => {
  const logoutModalRef = useRef<HTMLDialogElement>(null);

  const openLogoutModal = () => {
    logoutModalRef.current?.showModal();
  };

  const handleLogout = () => {
    logoutModalRef.current?.close();
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <>
      <div className="w-full navbar bg-base-100 px-4 shadow-md">
        <label
          htmlFor="my-drawer"
          className="btn btn-square btn-ghost lg:hidden"
        >
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
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </label>

        <div className="flex-1 hidden md:block">
          <h1 className="text-xl font-bold">
            New Vision Art & Science Institute
          </h1>
        </div>
        <div className="flex justify-center items-center gap-2 ">
          <ThemeSelector />
          <button onClick={openLogoutModal} className="btn btn-error">
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
