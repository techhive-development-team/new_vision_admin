
import Breadcrumb from "../../../components/layouts/common/Breadcrumb";
import { useFutureCountryCreateForm } from "../Create/useFutureCountryCreateForm";
import { FormProvider } from "react-hook-form";
import InputText from "../../../components/forms/InputText";
import Alert from "../../../components/forms/Alert";
import Layout from "../../../components/layouts/Layout";
import { Link } from "react-router-dom";

const FutureCountryEdit = () => {
  const { onSubmit, loading, success, message, show, ...methods } =
    useFutureCountryCreateForm();

  return (
    <Layout>
      <div className="flex justify-start">
        <div className="card card-bordered w-full max-w-2xl bg-base-100">
          <div className="card-body">
            <Breadcrumb
              items={[
                { label: "Home", path: "/" },
                { label: "Future Country", path: "/futureCountry" },
                { label: "Edit FutureCountry" },
              ]}
            />
            <h3 className="text-2xl font-bold my-4">Edit Future Country</h3>
            <FormProvider {...methods}>
              <form
                className="space-y-4"
                onSubmit={methods.handleSubmit(onSubmit)}
              >
                {show && <Alert success={success} message={message} />}
                <InputText label="Country" name="country" required />

                <div className="pt-4 card-actions flex justify-between">
                  <Link to="/futureCountry" className="btn btn-soft">
                    Back to Future Country
                  </Link>
                  <button className="btn btn-primary">
                    Edit Future Country
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

export default FutureCountryEdit;