import { Link } from "react-router-dom";
import Layout from "../../../components/layouts/Layout";import { useInquiryCreateForm } from "./useInquiryCreateForm";
import Breadcrumb from "../../../components/layouts/common/Breadcrumb";
import { FormProvider } from "react-hook-form";
import Alert from "../../../components/forms/Alert";
import InputText from "../../../components/forms/InputText";
import TextArea from "../../../components/forms/TextArea";

const InquiryCreate = ()=> {
    const { onSubmit, loading, success, message, show, ...methods } =
        useInquiryCreateForm();
    return(
        <Layout>
      <div className="flex justify-start">
        <div className="card card-bordered w-full max-w-2xl bg-base-100">
          <div className="card-body">
            <Breadcrumb
              items={[
                { label: "Home", path: "/" },
                { label: "Inquiry", path: "/inquiry" },
                { label: "Add Inquiry" },
              ]}
            />
            <h3 className="text-2xl font-bold my-4">Create Inquiry</h3>
            <FormProvider {...methods}>
              <form
                className="space-y-4"
                onSubmit={methods.handleSubmit(onSubmit)}
              >
                {show && <Alert success={success} message={message} />}
                <InputText label="Name" name="name" required />
                <InputText label="Email" name="email" type="email" required />
                <InputText label="Phone" name="phone" />
                <TextArea
                  label="Description"
                  name="description"
                  required
                />
                <div className="pt-4 card-actions flex justify-between">
                  <Link to="/inquiry" className="btn btn-soft">
                    Back to Inquiry 
                  </Link>
                  <button className="btn btn-primary" disabled={loading}>
                    {loading ? "Loading..." : "Create Inquiry"}
                  </button>
                </div>
              </form>
            </FormProvider>
          </div>
        </div>
      </div>
    </Layout>
    );
}
export default InquiryCreate;