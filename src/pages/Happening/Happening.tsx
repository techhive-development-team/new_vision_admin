import { useState, useEffect } from "react";
import Layout from "../../components/layouts/Layout";
import Breadcrumb from "../../components/layouts/common/Breadcrumb";
import { Link } from "react-router-dom";
import HappeningTable from "../../components/tables/HappeningTable";
import { happeningTypeRepository } from "../../repositories/happeningTypeRepository";

const Dashboard = () => {
  const [showSearch, setShowSearch] = useState(true);
  const [title, setTitle] = useState("");
  const [happeningType, setHappeningType] = useState("");
  const [searchTitle, setSearchTitle] = useState("");
  const [searchHappeningType, setSearchHappeningType] = useState("");
  const [happeningTypes, setHappeningTypes] = useState<{ id: string; typeName: string }[]>([]);

  useEffect(() => {
    const fetchTypes = async () => {
      const res = await happeningTypeRepository.getAll();
      if (res?.data) setHappeningTypes(res.data);
    };
    fetchTypes();
  }, []);

  const handleSearch = () => {
    setSearchTitle(title);
    setSearchHappeningType(happeningType);
  };

  return (
    <Layout>
      <div className="card card-bordered w-full bg-base-100 mb-6">
        <div className="card-body">
          <div className="flex items-center justify-between">
            <Breadcrumb
              items={[{ label: "Home", path: "/" }, { label: "Happenings" }]}
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
                placeholder="Search by Title..."
                className="input input-bordered w-full md:max-w-xs rounded-lg"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />

              <select
                className="select select-bordered w-full md:max-w-xs rounded-lg"
                value={happeningType}
                onChange={(e) => setHappeningType(e.target.value)}
              >
                <option value="">All Happening Types</option>
                {happeningTypes.map((type) => (
                  <option key={type.id} value={type.id}>
                    {type.typeName}
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
      <div className="card card-bordered w-full bg-base-100">
        <div className="card-body">
          <div className="flex justify-between items-center">
            <h3 className="text-2xl font-bold my-4">Happening List</h3>
            <Link
              to="/happenings/create"
              className="btn btn-primary rounded-lg"
            >
              Create Happening
            </Link>
          </div>
          <HappeningTable
            title={searchTitle}
            happeningTypeId={searchHappeningType}
          />
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
