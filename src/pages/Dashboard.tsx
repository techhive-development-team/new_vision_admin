import Layout from "../components/layouts/Layout";
import Breadcrumb from "../components/layouts/common/Breadcrumb";

const Dashboard = () => {
  return (
    <Layout>
      <div className="flex justify-start">
        <div className="card card-bordered w-full bg-base-100">
          <div className="card-body">
            <Breadcrumb
              items={[
                { label: "Home", path: "/" },
              ]}
            />
            <h3 className="text-2xl font-bold my-4">Dashboard</h3>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
