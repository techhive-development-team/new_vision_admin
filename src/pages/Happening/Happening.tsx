import Layout from "../../components/layouts/Layout";
import Breadcrumb from "../../components/layouts/common/Breadcrumb";
import { Link } from "react-router-dom";
import HappeningTable from "../../components/tables/HappeningTable";

const Dashboard = () => {
  return (
    <Layout>
      <div className="flex justify-start">
        <div className="card card-bordered w-full bg-base-100">
          <div className="card-body">
            <Breadcrumb
              items={[{ label: "Home", path: "/" }, { label: "Happening" }]}
            />
            <div className="flex justify-between items-center">
              <h3 className="text-2xl font-bold my-4">Happening List</h3>
              <Link to="/happenings/create" className="btn btn-primary">
                Create Happening
              </Link>
            </div>
            <HappeningTable />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
