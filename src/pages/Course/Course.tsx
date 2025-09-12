import Layout from "../../components/layouts/Layout";
import Breadcrumb from "../../components/layouts/common/Breadcrumb";
import { Link } from "react-router-dom";
import CourseTable from "../../components/tables/CourseTable";

const Course = () => {
  return (
    <Layout>
      <div className="flex justify-start">
        <div className="card card-bordered w-full bg-base-100">
          <div className="card-body">
            <Breadcrumb
              items={[{ label: "Home", path: "/" }, { label: "Courses" }]}
            />
            <div className="flex justify-between items-center">
              <h3 className="text-2xl font-bold my-4">Course List</h3>
              <Link to="/courses/create" className="btn btn-primary">
                Create Course
              </Link>
            </div>
            <CourseTable />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Course;
