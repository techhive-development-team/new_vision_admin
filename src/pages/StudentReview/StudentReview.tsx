import { useState, useEffect } from "react";
import Layout from "../../components/layouts/Layout";
import Breadcrumb from "../../components/layouts/common/Breadcrumb";
import { Link } from "react-router-dom";
import StudentReviewTable from "../../components/tables/StudentReviewTable";
import { educationPartnerRepository } from "../../repositories/educationPartnerRepository";

const Dashboard = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [name, setName] = useState("");
  const [educationPartnerId, setEducationPartnerId] = useState("");
  const [searchName, setSearchName] = useState("");
  const [searchEducationPartnerId, setSearchEducationPartnerId] = useState("");
  const [partners, setPartners] = useState<{ id: string; name: string }[]>([]);

  useEffect(() => {
    const fetchPartners = async () => {
      const res = await educationPartnerRepository.getAll();
      if (res?.data) setPartners(res.data);
    };
    fetchPartners();
  }, []);

  const handleSearch = () => {
    setSearchName(name);
    setSearchEducationPartnerId(educationPartnerId);
  };

  return (
    <Layout>
      <div className="card card-bordered w-full bg-base-100 mb-6">
        <div className="card-body">
          <div className="flex items-center justify-between">
            <Breadcrumb
              items={[{ label: "Home", path: "/" }, { label: "StudentReview" }]}
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
                value={educationPartnerId}
                onChange={(e) => setEducationPartnerId(e.target.value)}
              >
                <option value="">All Education Partners</option>
                {partners.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
              </select>

              <button
                className="btn btn-primary w-full md:w-auto rounded-lg"
                onClick={handleSearch}
              >
                Search
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Table Section */}
      <div className="card card-bordered w-full bg-base-100">
        <div className="card-body">
          <div className="flex justify-between items-center">
            <h3 className="text-2xl font-bold my-4">Student Review List</h3>
            <Link to="/studentReview/create" className="btn btn-primary">
              Create Student Review
            </Link>
          </div>

          <StudentReviewTable
            name={searchName}
            educationPartnerId={searchEducationPartnerId}
          />
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
