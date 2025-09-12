import Layout from "../../components/layouts/Layout";
import Breadcrumb from "../../components/layouts/common/Breadcrumb";
import { Link } from "react-router-dom";
import EducationPartnerTable from "../../components/tables/EducationPartnerTable";

const EducationPartner = () => {
  return (
    <Layout>
      <div className="flex justify-start">
        <div className="card card-bordered w-full bg-base-100">
          <div className="card-body">
            <Breadcrumb
              items={[{ label: "Home", path: "/" }, { label: "Education Partners" }]}
            />
            <div className="flex justify-between items-center">
              <h3 className="text-2xl font-bold my-4">Education Partner List</h3>
              <Link to="/education-partners/create" className="btn btn-primary">
                Create Partner
              </Link>
            </div>
            <EducationPartnerTable />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default EducationPartner;
