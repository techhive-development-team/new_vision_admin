import Breadcrumb from "../../components/layouts/common/Breadcrumb";
import Layout from "../../components/layouts/Layout";
import ImageTypeTable from "../../components/tables/ImageTypeTable";
import { Link } from "react-router-dom";


const Dashboard = () => {
  return (
    <Layout>
      <div className="flex justify-start">
        <div className="card card-bordered w-full bg-base-100">
          <div className="card-body">
            <Breadcrumb
              items={[{ label: "Home", path: "/" }, { label: "ImageTypes" }]}
            />
            <div className="flex justify-between items-center">
              <h3 className="text-2xl font-bold my-4">Image Type List</h3>
              <Link to="/imagetypes/create" className="btn btn-primary">
                Create Image Type
              </Link>
            </div>
            <ImageTypeTable />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
