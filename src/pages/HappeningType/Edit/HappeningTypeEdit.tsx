import { Link } from "react-router-dom";
import Layout from "../../../components/layouts/Layout";
import Breadcrumb from "../../../components/layouts/common/Breadcrumb";
import { FormProvider } from "react-hook-form";
import Alert from "../../../components/forms/Alert";
import InputText from "../../../components/forms/InputText";
import { useHappeningTypeEditForm } from "./useHappeningTypeEditForm";

const HappeningTypeEdit = () => {
  const { onSubmit, loading, success, message, show, ...methods } =
    useHappeningTypeEditForm();

  return (
    <Layout>
      <div className="flex justify-start">
        <div className="card card-bordered w-full max-w-2xl bg-base-100">
          <div className="card-body">
            <Breadcrumb
              items={[
                { label: "Home", path: "/" },
                { label: "HappeningType", path: "/happeningtypes" },
                { label: "Edit HappeningType" },
              ]}
            />
            <h3 className="text-2xl font-bold my-4">Edit Happening Type</h3>
            <FormProvider {...methods}>
              <form
                className="space-y-4"
                onSubmit={methods.handleSubmit(onSubmit)}
              >
                {show && <Alert success={success} message={message} />}
                <InputText label="Type Name" name="typeName" required />

                <div className="pt-4 card-actions flex justify-between">
                  <Link to="/happeningtypes" className="btn btn-soft">
                    Back to Happening Type
                  </Link>
                  <button className="btn btn-primary text-white">
                    Edit Happening Type
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

export default HappeningTypeEdit;
