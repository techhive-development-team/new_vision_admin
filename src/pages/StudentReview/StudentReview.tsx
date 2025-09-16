import Layout from "../../components/layouts/Layout";
import Breadcrumb from "../../components/layouts/common/Breadcrumb";
import { Link } from "react-router-dom";
import StudentReviewTable from "../../components/tables/StudentReviewTable";

const Dashboard = () => {
  return (
    <Layout>
      <div className="flex justify-start">
        <div className="card card-bordered w-full bg-base-100">
          <div className="card-body">
            <Breadcrumb
              items={[{ label: "Home", path: "/" }, { label: "StudentReview" }]}
            />
            <div className="flex justify-between items-center">
              <h3 className="text-2xl font-bold my-4">Student Review List</h3>
              <Link to="/studentReview/create" className="btn btn-primary">
                Create Student Review
              </Link>
            </div>
            <StudentReviewTable />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
