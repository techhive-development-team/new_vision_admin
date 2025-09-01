import Layout from "../../components/layouts/Layout";
import UserTable from "../../components/tables/UserTable";
import Breadcrumb from "../../components/layouts/common/Breadcrumb";
import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <Layout>
      <div className="flex justify-start">
        <div className="card card-bordered w-full bg-base-100">
          <div className="card-body">
            <Breadcrumb
              items={[{ label: "Home", path: "/" }, { label: "Users" }]}
            />
            <div className="flex justify-between items-center">
              <h3 className="text-2xl font-bold my-4">User List</h3>
              <Link to="/users/create" className="btn btn-primary">
                Create User
              </Link>
            </div>
            <UserTable />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
