import Layout from "../components/layouts/Layout";
import Breadcrumb from "../components/layouts/common/Breadcrumb";

const Dashboard = () => {
  return (
    <Layout>
      <Breadcrumb items={[{ label: "Home", path: "/" }]} />
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold my-4">Dashboard</h3>
      </div>
    </Layout>
  );
};

export default Dashboard;
