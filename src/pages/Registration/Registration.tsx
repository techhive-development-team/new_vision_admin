import Layout from "../../components/layouts/Layout";
import Breadcrumb from "../../components/layouts/common/Breadcrumb";
import RegistrationTable from "../../components/tables/RegistrationTable";

const RegistrationPage = () => {
  return (
    <Layout>
      <div className="flex justify-start">
        <div className="card card-bordered w-full bg-base-100">
          <div className="card-body">
            <Breadcrumb items={[{ label: "Home", path: "/" }, { label: "Registrations" }]} />
            <div className="flex justify-between items-center">
              <h3 className="text-2xl font-bold my-4">Registration List</h3>
            </div>
            <RegistrationTable />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default RegistrationPage;


