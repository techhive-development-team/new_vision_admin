import { Link, useLocation } from "react-router-dom";
import Layout from "../../../components/layouts/Layout";
import Breadcrumb from "../../../components/layouts/common/Breadcrumb";
import InputText from "../../../components/forms/InputText";
import InputFile from "../../../components/forms/InputFile";
import { useForm, FormProvider } from "react-hook-form";
import { API_URLS, baseUrl } from "../../../enum/urls";

type Form = {
  name: string;
  parentName: string;
  parentJob: string;
  dob: string;
  email: string;
  address: string;
  postalCode: string;
  phone: string;
  studentImage?: string;
  school: string;
  studyAbroad: string;
  futurePlan: string;
  futureCountryName?: string;
  futureuniversityName?: string;
  potentialYearOfStudy?: string;
  joinRaffles: string;
  paymentOption: string;
  status: string;
  transactionId?: string;
};

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

  const methods = useForm<Form>({
    defaultValues: {
      name: student.name,
      parentName: student.parentName,
      parentJob: student.parentJob,
      dob: student.dob,
      email: student.email,
      address: student.address,
      postalCode: student.postalCode,
      phone: student.phone,
      studentImage: student.studentImage,
      school: student.school,
      studyAbroad: student.studyAbroad.toString(),
      futurePlan: student.futurePlan,
      futureCountryName: student.futureCountryName,
      futureuniversityName: student.futureuniversityName,
      potentialYearOfStudy: student.potentialYearOfStudy,
      joinRaffles: student.joinRaffles,
      paymentOption: student.paymentOption,
      status: student.status,
      transactionId: student.transactionId,
    },
  });

  return (
    <Layout>
      <div className="flex justify-start">
        <div className="card card-bordered w-full max-w-3xl bg-base-100">
          <div className="card-body">
            <Breadcrumb
              items={[
                { label: "Home", path: "/" },
                { label: "Students", path: "/students" },
                { label: "View Student" },
              ]}
            />
            <h3 className="text-2xl font-bold my-4">View Student</h3>

            <FormProvider {...methods}>
              <form className="space-y-4">
                <InputFile
                  label="Student Image"
                  name="studentImage"
                  defaultImage={
                    student.studentImage
                      ? `${baseUrl}${API_URLS.UPLOAD}${API_URLS.STUDENT}/${student.studentImage}`
                      : ""
                  }
                />
                <InputText label="Name" name="name" />
                <InputText label="Parent Name" name="parentName" />
                <InputText label="Parent Job" name="parentJob" />
                <InputText label="Date of Birth" name="dob" type="date" />
                <InputText label="Email" name="email" type="email" />
                <InputText label="Address" name="address" />
                <InputText label="Postal Code" name="postalCode" />
                <InputText label="Phone" name="phone" />
                <InputText label="School Type" name="school" />
                <InputText label="Study Abroad?" name="studyAbroad" />
                <InputText label="Future Plan" name="futurePlan" />
                <InputText label="Future Country" name="futureCountryName" />
                <InputText label="Future University" name="futureuniversityName" />
                <InputText
                  label="Potential Year of Study"
                  name="potentialYearOfStudy"
                  type="date"
                />
                <InputText label="Join Raffles" name="joinRaffles" />
                <InputText label="Payment Option" name="paymentOption" />
                <InputText label="Payment Status" name="status" />
                <InputText label="Transaction ID" name="transactionId" />

                <div className="pt-4 card-actions">
                  <Link to="/students" className="btn btn-soft">
                    Back to Students
                  </Link>
                </div>
              </form>
            </FormProvider>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default StudentView;
