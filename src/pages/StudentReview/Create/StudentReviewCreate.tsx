import Layout from "../../../components/layouts/Layout";
import Breadcrumb from "../../../components/layouts/common/Breadcrumb";
import TextArea from "../../../components/forms/TextArea";
import InputText from "../../../components/forms/InputText";
import InputFile from "../../../components/forms/InputFile";
import Alert from "../../../components/forms/Alert";
import { FormProvider } from "react-hook-form";
import { useStudentReviewCreate } from "./useStudentReviewCreateForm";
import { Link } from "react-router-dom";

const StudentReviewCreate = () => {
  const { onSubmit, loading, success, message, show, ...methods } =
    useStudentReviewCreate();

  return (
    <Layout>
      <div className="flex justify-start">
        <div className="card card-bordered w-full max-w-2xl bg-base-100">
          <div className="card-body">
            <Breadcrumb
              items={[
                { label: "Home", path: "/" },
                { label: "Student Reviews", path: "/studentReview" },
                { label: "Create Review" },
              ]}
            />
            <h3 className="text-2xl font-bold mb-6">Create Student Review</h3>
            <FormProvider {...methods}>
              <form
                className="space-y-4"
                onSubmit={methods.handleSubmit(onSubmit)}
              >
                {show && <Alert success={success} message={message} />}

                <InputText label="Name" name="name" required />
                <InputText label="Batch" name="batch" required />
                <InputFile label="Student Image" name="student_img" required />
                <InputText label="University" name="university" required />
                <InputFile label="University Logo" name="universityLogo" required />
                <TextArea label="Review" name="review" />
                <InputText label="Qualification" name="qualification" />

                <div className="flex justify-between mt-4">
                  <Link to="/studentReview" className="btn btn-soft">
                    Back to Student Review
                  </Link>
                  <button className="btn btn-primary" disabled={loading}>
                    {loading ? "Loading..." : "Create Student Review"}
                  </button>
                </div>
              </form>
            </FormProvider>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default StudentReviewCreate;
