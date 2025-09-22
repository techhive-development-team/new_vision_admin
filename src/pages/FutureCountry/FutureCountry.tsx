import Breadcrumb from "../../components/layouts/common/Breadcrumb";
import Layout from "../../components/layouts/Layout";
import { Link } from "react-router-dom";
import FutureCountryTable from "../../components/tables/FutureCountryTable";

const Dashboard = () => {
  return (
    <Layout>
      <div className="flex justify-start">
        <div className="card card-bordered w-full bg-base-100">
          <div className="card-body">
            <Breadcrumb
              items={[
                { label: "Home", path: "/" },
                { label: "Future Country" },
              ]}
            />
            <div className="flex justify-between items-center">
              <h3 className="text-2xl font-bold my-4">Future Country List</h3>
              <Link to="/futureCountry/create" className="btn btn-primary">
                Create Future Country
              </Link>
            </div>
            <FutureCountryTable />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;