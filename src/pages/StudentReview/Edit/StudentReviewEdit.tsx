import { Link } from "react-router-dom";
import Layout from "../../../components/layouts/Layout";
import Breadcrumb from "../../../components/layouts/common/Breadcrumb";
import InputText from "../../../components/forms/InputText";
import { FormProvider } from "react-hook-form";
import Alert from "../../../components/forms/Alert";
import InputFile from "../../../components/forms/InputFile";
import TextArea from "../../../components/forms/TextArea";
import SelectBox from "../../../components/forms/SelectBox";
import { API_URLS, baseUrl } from "../../../enum/urls";
import { useStudentReviewEditForm } from "./useStudentReviewEditForm";
import { useGetEducationPartner } from "../../../hooks/useGetEducationPartner";

const StudentReviewEdit = () => {
  const { onSubmit, loading, success, message, show, ...methods } =
    useStudentReviewEditForm();

  const {
    data,
    isLoading: partnerLoading,
    error: partnerError,
  } = useGetEducationPartner();

  return (
    <Layout>
      <div className="flex justify-start">
        <div className="card card-bordered w-full max-w-2xl bg-base-100">
          <div className="card-body">
            <Breadcrumb
              items={[
                { label: "Home", path: "/" },
                { label: "Student Reviews", path: "/studentReview" },
                { label: "Edit Review" },
              ]}
            />
            <h3 className="text-2xl font-bold my-4">Edit Student Review</h3>
            <FormProvider {...methods}>
              <form
                className="space-y-4"
                onSubmit={methods.handleSubmit(onSubmit)}
              >
                {show && <Alert success={success} message={message} />}

                <InputFile
                  label="Student Image"
                  name="student_img"
                  required
                  defaultImage={`${baseUrl}${API_URLS.UPLOAD}${API_URLS.STUDENTREVIEW}/${methods.getValues("student_img") || ""}`}
                />
                <InputText label="Name" name="name" required />
                <InputText label="Batch" name="batch" required />

                <SelectBox
                  label="Education Partner"
                  name="educationPartnerId"
                  items={
                    partnerLoading
                      ? [{ value: "", showValue: "Loading..." }]
                      : partnerError
                      ? [{ value: "", showValue: "Failed to load partners" }]
                      : data?.map((partner: { id: string; name: string }) => ({
                          value: partner.id,
                          showValue: partner.name,
                        })) || []
                  }
                  required
                />

                <TextArea label="Review" name="review" required />

                <div className="pt-4 flex justify-between">
                  <Link to="/studentReview" className="btn btn-soft">
                    Back to Student Review
                  </Link>
                  <button className="btn btn-primary" disabled={loading}>
                    {loading ? "Loading..." : "Edit Student Review"}
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

export default StudentReviewEdit;
