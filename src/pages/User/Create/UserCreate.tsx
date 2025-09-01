import { Link } from "react-router-dom";
import Layout from "../../../components/layouts/Layout";
import Breadcrumb from "../../../components/layouts/common/Breadcrumb";
import InputText from "../../../components/forms/InputText";
import { FormProvider } from "react-hook-form";
import Alert from "../../../components/forms/Alert";
import { useUserCreateForm } from "./useUserCreateForm";

const UserCreate = () => {
  const { onSubmit, loading, success, message, show, ...methods } =
    useUserCreateForm();
  return (
    <Layout>
      <div className="flex justify-start">
        <div className="card card-bordered w-full max-w-2xl bg-base-100">
          <div className="card-body">
            <Breadcrumb
              items={[
                { label: "Home", path: "/" },
                { label: "Users", path: "/users" },
                { label: "Add User" },
              ]}
            />
            <h3 className="text-2xl font-bold my-4">Create User</h3>
            <FormProvider {...methods}>
              <form
                className="space-y-4"
                onSubmit={methods.handleSubmit(onSubmit)}
              >
                {show && <Alert success={success} message={message} />}
                <InputText label="Name" name="name" required />
                <InputText label="Email" name="email" type="email" required />
                <InputText
                  label="Password"
                  name="password"
                  type="password"
                  required
                />
                <div className="pt-4 card-actions flex justify-between">
                  <Link to="/users" className="btn btn-soft">
                    Back to Users
                  </Link>
                  <button className="btn btn-primary" disabled={loading}>
                    {loading ? "Loading..." : "Create User"}
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

export default UserCreate;
