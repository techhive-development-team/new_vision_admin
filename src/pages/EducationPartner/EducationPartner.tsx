import { useState } from "react";
import Layout from "../../components/layouts/Layout";
import Breadcrumb from "../../components/layouts/common/Breadcrumb";
import { Link } from "react-router-dom";
import EducationPartnerTable from "../../components/tables/EducationPartnerTable";

const EducationPartnerDashboard = () => {
  const [showSearch, setShowSearch] = useState(true);
  const [name, setName] = useState("");
  const [partnerType, setPartnerType] = useState("");
  const [searchName, setSearchName] = useState("");
  const [searchPartnerType, setSearchPartnerType] = useState("");

  const handleSearch = () => {
    setSearchName(name);
    setSearchPartnerType(partnerType);
  };

  const handleReset = () => {
    setName("");
    setPartnerType("");
    setSearchName("");
    setSearchPartnerType("");
  };

  return (
    <Layout>
      <div className="card card-bordered w-full bg-base-100 mb-6">
        <div className="card-body">
          <div className="flex items-center justify-between">
            <Breadcrumb
              items={[
                { label: "Home", path: "/" },
                { label: "Education Partners" },
              ]}
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
                placeholder="Search by Name..."
                className="input input-bordered w-full md:max-w-xs rounded-lg"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />

              <select
                className="select select-bordered w-full md:max-w-xs rounded-lg"
                value={partnerType}
                onChange={(e) => setPartnerType(e.target.value)}
              >
                <option value="">All Partner Types</option>
                <option value="INSTITUTE">Institute</option>
                <option value="UNIVERSITY">University</option>
                <option value="COLLEGE">College</option>
              </select>

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
            <h3 className="text-2xl font-bold my-4">Education Partner List</h3>
            <Link
              to="/education-partners/create"
              className="btn btn-primary rounded-lg"
            >
              Create Partner
            </Link>
          </div>

          <EducationPartnerTable
            name={searchName}
            partnerType={searchPartnerType}
          />
        </div>
      </div>
    </Layout>
  );
};

export default EducationPartnerDashboard;
