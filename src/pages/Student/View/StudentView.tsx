import { Link, useLocation } from "react-router-dom";
import Layout from "../../../components/layouts/Layout";
import Breadcrumb from "../../../components/layouts/common/Breadcrumb";
import { API_URLS, baseUrl } from "../../../enum/urls";

const StudentView = () => {
  const { state } = useLocation();
  const student = state?.student;

  if (!student) {
    return (
      <Layout>
        <div className="flex justify-center mt-10">
          <p className="text-red-500">No student data to display</p>
          <Link to="/students" className="btn btn-soft mt-4">
            Back to Students
          </Link>
        </div>
      </Layout>
    );
  }

  const formatDate = (date?: string) => (date ? date.split("T")[0] : "");

  return (
    <Layout>
     <div className="flex min-w-full justify-center px-4">
        <div className="card card-bordered w-full max-w-4xl bg-base-100">
          <div className="card-body">
            <Breadcrumb
              items={[
                { label: "Home", path: "/" },
                { label: "Students", path: "/students" },
                { label: "View Student" },
              ]}
            />
            <h3 className="text-2xl font-bold my-4">View Student</h3>
            {student.studentImage && (
              <div className="flex justify-center mb-6">
                <img
                  src={`${baseUrl}${API_URLS.UPLOAD}${API_URLS.STUDENT}/${student.studentImage}`}
                  alt="Student"
                  className="w-32 h-32 rounded-full object-cover shadow-md"
                />
              </div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                ["Course", student.Courses?.name || ""],
                ["Name", student.name],
                ["Parent Name", student.parentName],
                ["Parent Job", student.parentJob],
                ["Date of Birth", formatDate(student.dob)],
                ["Email", student.email],
                ["Address", student.address],
                ["Postal Code", student.postalCode],
                ["Phone", student.phone],
                ["School Type", student.school],
                ["Study Abroad?", student.studyAbroad ? "Yes" : "No"],
                ["Future Plan", student.futurePlan],
                ["Future Country", student.futureCountry?.country],
                ["Other Countries", student.futureCountryName],
                ["Other Countries", student.futureCountryName],
                ["Future University", student.futureuniversityName],
                [
                  "Potential Year of Study",
                  formatDate(student.potentialYearOfStudy),
                ],
                ["Join Raffles", student.joinRaffles],
                ["Payment Option", student.paymentOption],
                ["Payment Status", student.status],
                ["Transaction ID", student.transactionId],
                ["Bank", student.bank],
                ["Message", student.message],
              ].map(([label, value]) => (
                <div
                  key={label}
                  className="flex justify-between border-b border-gray-200 py-2"
                >
                  <span className="font-medium">{label}</span>
                  <span className="text-right break-words ml-4">
                    {value || "-"}
                  </span>
                </div>
              ))}
            </div>
            <div className="pt-6">
              <Link to="/students" className="btn btn-soft">
                Back to Students
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default StudentView;
