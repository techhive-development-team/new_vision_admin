import Layout from "../../../components/layouts/Layout";
import Breadcrumb from "../../../components/layouts/common/Breadcrumb";
import TextArea from "../../../components/forms/TextArea";
import InputText from "../../../components/forms/InputText";
import InputFile from "../../../components/forms/InputFile";
import Alert from "../../../components/forms/Alert";
import { FormProvider } from "react-hook-form";
import { Link } from "react-router-dom";
import { useEducationPartnerCreateForm } from "./useEducationPartnerCreateForm";
import RadioInput from "../../../components/forms/RadioInput";

const EducationPartnerCreate = () => {
  const { onSubmit, loading, success, message, show, ...methods } =
    useEducationPartnerCreateForm();

  return (
    <Layout>
      <div className="flex justify-start">
        <div className="card card-bordered w-full max-w-2xl bg-base-100">
          <div className="card-body">
            <Breadcrumb
              items={[
                { label: "Home", path: "/" },
                { label: "Education Partners", path: "/education-partners" },
                { label: "Create Partner" },
              ]}
            />
            <h3 className="text-2xl font-bold mb-6">
              Create Education Partner
            </h3>
            <FormProvider {...methods}>
              <form
                className="space-y-4"
                onSubmit={methods.handleSubmit(onSubmit)}
              >
                {show && <Alert success={success} message={message} />}

                <InputFile label="Logo Image" name="logo_img" required />
                <InputFile label="Background Image" name="bg_img" required />
                <TextArea label="Overview" name="overview" required />
                <InputText label="Location" name="location" required />
                <InputText label="Founded Date" name="foundedDate" />
                <RadioInput
                  name="partnerType"
                  label="Partner Type"
                  options={[
                    { value: "INSTITUTE", label: "Institute" },
                    { value: "UNIVERSITY", label: "University" },
                    { value: "COLLEGE", label: "College" },
                  ]}
                  required
                />

                <div className="pt-4 flex justify-between">
                  <Link to="/education-partners" className="btn btn-soft">
                    Back to Partners
                  </Link>
                  <button className="btn btn-primary" disabled={loading}>
                    {loading ? "Loading..." : "Create Partner"}
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

export default EducationPartnerCreate;
