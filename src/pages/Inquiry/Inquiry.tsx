import Layout from "../../components/layouts/Layout";
import Breadcrumb from "../../components/layouts/common/Breadcrumb";
import { Link } from "react-router-dom";
import InquiryTable from "../../components/tables/InquiryTable";
const Dashboard = () => {
    return (
    <Layout>
      <div className="flex justify-start">
        <div className="card card-bordered w-full bg-base-100">
          <div className="card-body">
            <Breadcrumb
              items={[{ label: "Home", path: "/" }, { label: "Inquiry" }]}
            />
            <div className="flex justify-between items-center">
              <h3 className="text-2xl font-bold my-4">Inquiry List</h3>
              <Link to="/inquiry/create" className="btn btn-primary">
                Create Inquiry
              </Link>
            </div>
            <InquiryTable />
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Dashboard;