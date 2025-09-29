import Layout from "../../components/layouts/Layout";
import Breadcrumb from "../../components/layouts/common/Breadcrumb";
import StudentTable from "../../components/tables/StudentTable";

const Student = () => {
    return (
    <Layout>
      <div className="flex justify-start">
        <div className="card card-bordered w-full bg-base-100">
          <div className="card-body">
            <Breadcrumb
              items={[{ label: "Home", path: "/" }, { label: "Student" }]}
            />
            <div className="flex justify-between items-center">
              <h3 className="text-2xl font-bold my-4">Student List</h3>
            </div>
            <StudentTable />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Student;
