import Breadcrumb from "../../components/layouts/common/Breadcrumb";
import Layout from "../../components/layouts/Layout";
import { Link } from "react-router-dom";
import HappeningTypeTable from "../../components/tables/HappeningTypeTable";

const Dashboard = () => {
  return (
    <Layout>
      <div className="flex justify-start">
        <div className="card card-bordered w-full bg-base-100">
          <div className="card-body">
            <Breadcrumb
              items={[
                { label: "Home", path: "/" },
                { label: "Happening Types" },
              ]}
            />
            <div className="flex justify-between items-center">
              <h3 className="text-2xl font-bold my-4">Happening Type List</h3>
              <Link to="/happeningtypes/create" className="btn btn-primary">
                Create Happening Type
              </Link>
            </div>
            <HappeningTypeTable />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
