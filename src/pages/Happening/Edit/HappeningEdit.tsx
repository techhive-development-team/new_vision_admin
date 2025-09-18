import { useHappeningEditForm } from "./useHappeningEditForm";
import { useGetHappeningType } from "../../../hooks/useGetHappeningType";
import { FormProvider } from "react-hook-form";
import MultiImageUpload from "../../../components/forms/MultiImageUpload";
import Breadcrumb from "../../../components/layouts/common/Breadcrumb";
import Layout from "../../../components/layouts/Layout";
import InputText from "../../../components/forms/InputText";
import TextArea from "../../../components/forms/TextArea";
import SelectBox from "../../../components/forms/SelectBox";
import InputFile from "../../../components/forms/InputFile";
import { Link } from "react-router-dom";
import Alert from "../../../components/forms/Alert";
import { API_URLS, baseUrl } from "../../../enum/urls";

const HappeningEdit = () => {
  const { onSubmit, loading, success, message, show, ...methods } =
    useHappeningEditForm();
  console.log(methods.getValues());
  const {
    data,
    isLoading: happeningTypeLoading,
    error: happeningTypeError,
  } = useGetHappeningType();
  return (
    <Layout>
      <div className="flex justify-start">
        <div className="card card-bordered w-full bg-base-100">
          <div className="card-body">
            <Breadcrumb
              items={[
                { label: "Home", path: "/" },
                { label: "Happenings", path: "/happenings" },
                { label: "Edit Happening" },
              ]}
            />
            <h3 className="text-2xl font-bold my-4">Edit Happening</h3>
            <FormProvider {...methods}>
              <form onSubmit={methods.handleSubmit(onSubmit)}>
                {show && <Alert success={success} message={message} />}
                <InputText
                  required
                  label="Happening Name"
                  name="title"
                  placeholder="Enter happening name"
                />
                <TextArea label="Description" name="description" required />
                <SelectBox
                  label="Happening Type"
                  name="happeningTypeId"
                  items={
                    happeningTypeLoading
                      ? [{ value: "", showValue: "Loading..." }]
                      : happeningTypeError
                      ? [{ value: "", showValue: "Failed to load types" }]
                      : data?.map((type: { id: string; typeName: string }) => ({
                          value: type.id,
                          showValue: type.typeName,
                        })) || []
                  }
                  required
                />
                <InputFile
                  label="Background Image"
                  name="mainImage"
                  required
                  defaultImage={`${baseUrl}${API_URLS.UPLOAD}${
                    API_URLS.HAPPENING
                  }/${methods.getValues("mainImage")}`}
                />

                <MultiImageUpload name="album_images" label="Album Images" />
                <div className="pt-4 card-actions flex justify-between">
                  <Link to="/happenings" className="btn btn-soft">
                    Back to Happenings
                  </Link>
                  <button className="btn btn-primary" disabled={loading}>
                    {loading ? "Loading..." : "Update Happening"}
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

export default HappeningEdit;
