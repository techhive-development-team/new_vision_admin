import { Link } from "react-router-dom";
import Layout from "../../components/layouts/Layout";
import Breadcrumb from "../../components/layouts/common/Breadcrumb";
import BatchTable from "../../components/tables/BatchTable";

const BatchPage = () => {
  return (
    <Layout>
      <div className="flex justify-start">
        <div className="card card-bordered w-full bg-base-100">
          <div className="card-body">
            <Breadcrumb
              items={[{ label: "Home", path: "/" }, { label: "Batches" }]}
            />
            <div className="flex justify-between items-center">
              <h3 className="text-2xl font-bold my-4">Batch List</h3>\
              <Link to="/batches/create" className="btn btn-primary">
                Create Batch
              </Link>
            </div>
            <BatchTable />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default BatchPage;
