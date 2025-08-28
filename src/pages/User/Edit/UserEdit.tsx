import { Link } from "react-router-dom";
import Layout from "../../../components/layouts/Layout";
import Breadcrumb from "../../../components/layouts/common/Breadcrumb";
import InputText from "../../../components/forms/InputText";
import { useUserEditForm } from "./userUserEditForm";
import { FormProvider } from "react-hook-form";
import Alert from "../../../components/forms/Alert";

const UserEdit = () => {
  const { onSubmit, loading, success, message, show, ...methods } =
    useUserEditForm();
  return (
    <Layout>
      <Breadcrumb />
      <div className="flex justify-between items-center">
        <h3 className="text-2xl font-bold my-4">Edit User</h3>
      </div>
      <div className="card bg-base-100 shadow-xl p-6 max-w-md">
        <FormProvider {...methods}>
          <form className="space-y-4" onSubmit={methods.handleSubmit(onSubmit)}>
            {show && <Alert success={success} message={message} />}
            <InputText label="Name" name="name" />
            <InputText label="Email" name="email" type="email" />
            <div className="pt-4 flex justify-between">
              <Link to="/users" className="btn btn-soft">
                Back to Users
              </Link>
              <button className="btn btn-primary text-white">Edit User</button>
            </div>
          </form>
        </FormProvider>
      </div>
    </Layout>
  );
};

export default UserEdit;
