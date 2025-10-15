import { useBatchCreateForm } from "./useBatchCreateForm";
import Layout from "../../../components/layouts/Layout";
import { FormProvider } from "react-hook-form";
import Alert from "../../../components/forms/Alert";
import InputText from "../../../components/forms/InputText";
import { Link } from "react-router-dom";
import Breadcrumb from "../../../components/layouts/common/Breadcrumb";
import SelectBox from "../../../components/forms/SelectBox";
import { useGetCourse } from "../../../hooks/useGetCourse";

const BatchCreate = () => {
  const { onSubmit, loading, success, message, show, ...methods } =
    useBatchCreateForm();
  const { data, isLoading: courseLoading, error: courseError } = useGetCourse();
  return (
    <Layout>
      <div className="flex justify-start">
        <div className="card card-bordered w-full max-w-2xl bg-base-100">
          <div className="card-body">
            <Breadcrumb
              items={[
                { label: "Home", path: "/" },
                { label: "Batches", path: "/batches" },
                { label: "Add Batch" },
              ]}
            />
            <h3 className="text-2xl font-bold my-4">Create Batch</h3>
            <FormProvider {...methods}>
              <form
                className="space-y-4"
                onSubmit={methods.handleSubmit(onSubmit)}
              >
                {show && <Alert success={success} message={message} />}
                <InputText
                  label="Batch Name"
                  name="name"
                  placeholder="Enter batch name"
                  required
                />
                <InputText
                  label="Course Start Date"
                  name="startDate"
                  required
                  type="date"
                />
                <InputText
                  label="Course End Date"
                  name="endDate"
                  required
                  type="date"
                />
                <InputText
                  label="Capacity"
                  name="capacity"
                  placeholder="Enter capacity"
                  required
                />
                <SelectBox
                  label="Course"
                  name="courseId"
                  items={
                    courseLoading
                      ? [{ value: "", showValue: "Loading..." }]
                      : courseError
                      ? [{ value: "", showValue: "Failed to load types" }]
                      : data?.map((type: { id: string; name: string }) => ({
                          value: type.id,
                          showValue: type.name,
                        })) || []
                  }
                />
                <div className="pt-4 card-actions flex justify-between">
                  <Link to="/batches" className="btn btn-soft">
                    Back to Courses
                  </Link>
                  <button className="btn btn-primary" disabled={loading}>
                    {loading ? "Loading..." : "Create Batch"}
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

export default BatchCreate;
