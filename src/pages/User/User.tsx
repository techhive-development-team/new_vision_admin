import { useState } from "react";
import Layout from "../../components/layouts/Layout";
import UserTable from "../../components/tables/UserTable";
import Breadcrumb from "../../components/layouts/common/Breadcrumb";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [showSearch, setShowSearch] = useState(true);
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [searchName, setSearchName] = useState("");
  const [searchEmail, setSearchEmail] = useState("");

  const handleSearch = () => {
    setSearchName(userName);
    setSearchEmail(userEmail);
  };

  const handleReset = () => {
    setUserName("");
    setUserEmail("");
    setSearchName("");
    setSearchEmail("");
  };

  return (
    <Layout>
      <div className="card card-bordered w-full bg-base-100 mb-6">
        <div className="card-body">
          <div className="flex items-center justify-between">
            <Breadcrumb
              items={[{ label: "Home", path: "/" }, { label: "Users" }]}
            />
            <button
              className="btn btn-ghost btn-sm rounded-lg"
              onClick={() => setShowSearch(!showSearch)}
            >
              {showSearch ? "Hide Search" : "Show Search"}
            </button>
          </div>

          {showSearch && (
            <div className="mt-4 flex flex-col md:flex-row md:items-center md:space-x-4 space-y-4 md:space-y-0">
              <input
                type="text"
                placeholder="Search user name..."
                className="input input-bordered w-full md:max-w-xs rounded-lg"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
              <input
                type="text"
                placeholder="Search user email..."
                className="input input-bordered w-full md:max-w-xs rounded-lg"
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
              />
              <button
                className="btn btn-primary w-full md:w-auto rounded-lg"
                onClick={handleSearch}
              >
                Search
              </button>
              <button
                className="btn btn-secondary w-full md:w-auto rounded-lg"
                onClick={handleReset}
              >
                Reset
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="card card-bordered w-full bg-base-100">
        <div className="card-body">
          <div className="flex justify-between items-center">
            <h3 className="text-2xl font-bold my-4">User List</h3>
            <Link to="/users/create" className="btn btn-primary">
              Create User
            </Link>
          </div>
          <UserTable userName={searchName} userEmail={searchEmail} />
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
