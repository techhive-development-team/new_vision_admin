import Layout from "../../components/layouts/Layout";
import Breadcrumb from "../../components/layouts/common/Breadcrumb";
import { Link } from "react-router-dom";
import ImageTable from "../../components/tables/ImageTable";

const Dashboard = () => {
  return (
    <Layout>
      <div className="flex justify-start">
        <div className="card card-bordered w-full bg-base-100">
          <div className="card-body">
            <Breadcrumb
              items={[{ label: "Home", path: "/" }, { label: "Images" }]}
            />
            <div className="flex justify-between items-center">
              <h3 className="text-2xl font-bold my-4">Image List</h3>
              <Link to="/images/create" className="btn btn-primary">
                Create Image
              </Link>
            </div>
            <ImageTable />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
