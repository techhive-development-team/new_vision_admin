import { FormProvider } from "react-hook-form";
import InputText from "../../../components/forms/InputText";
import Breadcrumb from "../../../components/layouts/common/Breadcrumb";
import Layout from "../../../components/layouts/Layout";
import InputFile from "../../../components/forms/InputFile";
import SelectBox from "../../../components/forms/SelectBox";
import { Link } from "react-router-dom";
import Alert from "../../../components/forms/Alert";
import { useStudentEditForm } from "./useStudentEditForm";
import { API_URLS, baseUrl } from "../../../enum/urls";

const StudentEdit = () => {
  const { onSubmit, loading, success, message, show, ...methods } =
    useStudentEditForm();

  return (
    <Layout>
      <FormProvider {...methods}>
        <form
          className="grid grid-cols-1 lg:grid-cols-2 gap-0 lg:gap-6"
          onSubmit={methods.handleSubmit(onSubmit)}
        >
          <div className="card card-bordered w-full bg-base-100">
            <div className="card-body">
              <Breadcrumb
                items={[
                  { label: "Home", path: "/" },
                  { label: "Students", path: "/students" },
                  { label: "Edit Student" },
                ]}
              />
              <h3 className="text-2xl font-bold my-4">Edit Student</h3>

              {show && <Alert success={success} message={message} />}

              <InputFile
                label="Student Image"
                name="studentImage"
                defaultImage={`${baseUrl}${API_URLS.UPLOAD}${API_URLS.STUDENT}/${
                  methods.getValues("studentImage") || ""
                }`}
              />
              <InputText label="Name" name="name" required />
              <InputText label="Parent Name" name="parentName" required />
              <InputText label="Parent Job" name="parentJob" required />
              <InputText label="Date of Birth" name="dob" type="date" required />
              <InputText label="Email" name="email" type="email" required />
              <InputText label="Address" name="address" required />
              <InputText label="Postal Code" name="postalCode" required />
              <InputText label="Phone" name="phone" required />
            </div>
          </div>

          <div className="card card-bordered w-full bg-base-100">
            <div className="card-body">
              <SelectBox
                label="School Type"
                name="school"
                required
                items={[
                  { value: "GOVERNMENT", showValue: "Government" },
                  { value: "PRIVATE", showValue: "Private" },
                ]}
              />
              <SelectBox
                label="Study Abroad?"
                name="studyAbroad"
                required
                items={[
                  { value: "true", showValue: "Yes" },
                  { value: "false", showValue: "No" },
                ]}
              />
              <InputText label="Future Plan" name="futurePlan" required />
              <InputText label="Future Country" name="futureCountryName" />
              <InputText label="Future University" name="futureuniversityName" />
              <InputText
                label="Potential Year of Study"
                name="potentialYearOfStudy"
                type="date"
              />
              <SelectBox
                label="Join Raffles"
                name="joinRaffles"
                required
                items={[
                  { value: "YES", showValue: "Yes" },
                  { value: "NO", showValue: "No" },
                  { value: "MAYBE", showValue: "Maybe" },
                ]}
              />
              <SelectBox
                label="Payment Option"
                name="paymentOption"
                required
                items={[
                  { value: "CASH", showValue: "Cash" },
                  { value: "BANK_TRANSFER", showValue: "Bank Transfer" },
                ]}
              />
              <SelectBox
                label="Payment Status"
                name="status"
                required
                items={[
                  { value: "NONE", showValue: "None" },
                  { value: "PENDING", showValue: "Pending" },
                  { value: "COMPLETED", showValue: "Completed" },
                  { value: "FAILED", showValue: "Failed" },
                ]}
              />
              <InputText label="Transaction ID" name="transactionId" />

              <div className="pt-4 card-actions flex justify-between">
                <Link to="/students" className="btn btn-soft">
                  Back to Students
                </Link>
                <button className="btn btn-primary" disabled={loading}>
                  {loading ? "Loading..." : "Edit Student"}
                </button>
              </div>
            </div>
          </div>
        </form>
      </FormProvider>
    </Layout>
  );
};

export default StudentEdit;
