import { useState, useEffect } from "react";
import Layout from "../../components/layouts/Layout";
import Breadcrumb from "../../components/layouts/common/Breadcrumb";
import { Link } from "react-router-dom";
import ImageTable from "../../components/tables/ImageTable";
import { imageTypeRepository } from "../../repositories/imageTypeRepository";

const Dashboard = () => {
  const [showSearch, setShowSearch] = useState(true);
  const [mainText, setMainText] = useState("");
  const [imageType, setImageType] = useState("");
  const [searchMainText, setSearchMainText] = useState("");
  const [searchImageType, setSearchImageType] = useState("");
  const [imageTypes, setImageTypes] = useState<{ id: string; typeName: string }[]>([]);

  useEffect(() => {
    const fetchImageTypes = async () => {
      const res = await imageTypeRepository.getAll();
      if (res?.data) setImageTypes(res.data);
    };
    fetchImageTypes();
  }, []);

  const handleSearch = () => {
    setSearchMainText(mainText);
    setSearchImageType(imageType);
  };

  return (
    <Layout>
      <div className="card card-bordered w-full bg-base-100 mb-6">
        <div className="card-body">
          <div className="flex items-center justify-between">
            <Breadcrumb
              items={[{ label: "Home", path: "/" }, { label: "Images" }]}
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
                placeholder="Search by Main Text..."
                className="input input-bordered w-full md:max-w-xs rounded-lg"
                value={mainText}
                onChange={(e) => setMainText(e.target.value)}
              />
              <select
                className="select select-bordered w-full md:max-w-xs rounded-lg"
                value={imageType}
                onChange={(e) => setImageType(e.target.value)} 
              >
                <option value="">All Image Types</option>
                {imageTypes.map((type) => (
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
            <h3 className="text-2xl font-bold my-4">Image List</h3>
            <Link to="/images/create" className="btn btn-primary rounded-lg">
              Create Image
            </Link>
          </div>

          <ImageTable mainText={searchMainText} imageTypeId={searchImageType} />
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
