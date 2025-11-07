import { Link } from "react-router-dom";
import Layout from "../../../components/layouts/Layout";
import Breadcrumb from "../../../components/layouts/common/Breadcrumb";
import InputText from "../../../components/forms/InputText";
import { FormProvider } from "react-hook-form";
import Alert from "../../../components/forms/Alert";
import InputFile from "../../../components/forms/InputFile";
import TextArea from "../../../components/forms/TextArea";
import { useEducationPartnerEditForm } from "./useEducationPartnerEditForm";
import { API_URLS, imageUrl } from "../../../enum/urls";
import RadioInput from "../../../components/forms/RadioInput";

const EducationPartnerEdit = () => {
  const { onSubmit, loading, success, message, show, ...methods } =
    useEducationPartnerEditForm();

  return (
    <Layout>
      <div className="flex justify-start">
        <div className="card card-bordered w-full max-w-2xl bg-base-100">
          <div className="card-body">
            <Breadcrumb
              items={[
                { label: "Home", path: "/" },
                { label: "Education Partners", path: "/education-partners" },
                { label: "Edit Partner" },
              ]}
            />
            <h3 className="text-2xl font-bold my-4">Edit Education Partner</h3>
            <FormProvider {...methods}>
              <form
                className="space-y-4"
                onSubmit={methods.handleSubmit(onSubmit)}
              >
                {show && <Alert success={success} message={message} />}

                <InputFile
                  label="Logo Image"
                  name="logo_img"
                  required
                  defaultImage={`${imageUrl}${API_URLS.EDUCATION_PARTNER}/${methods.getValues("logo_img") || ""}`}
                />
                <InputFile
                  label="Background Image"
                  name="bg_img"
                  required
                  defaultImage={`${imageUrl}${API_URLS.EDUCATION_PARTNER}/${methods.getValues("bg_img") || ""}`}
                />
                <InputText label="Name" name="name"required />
                <TextArea label="Overview" name="overview" required />
                <InputText label="Location" name="location" required />
                <InputText label="Founded Date" name="foundedDate" type="date" />
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
                  <button
                    className="btn btn-primary text-white"
                    disabled={loading}
                  >
                    Edit Partner
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

export default EducationPartnerEdit;
