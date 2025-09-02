import Layout from "../../../components/layouts/Layout";
import Breadcrumb from "../../../components/layouts/common/Breadcrumb";
import TextArea from "../../../components/forms/TextArea";
import InputText from "../../../components/forms/InputText";
import SelectBox from "../../../components/forms/SelectBox";
import { useImageCreate } from "./useImageCreate";
import { FormProvider } from "react-hook-form";
import InputFile from "../../../components/forms/InputFile";
import Alert from "../../../components/forms/Alert";
import { useGetImageType } from "../../../hooks/useGetImageType";

const ImageCreate = () => {
  const { onSubmit, loading, success, message, show, ...methods } =
    useImageCreate();
  const {
    data,
    isLoading: imageTypeLoading,
    error: imageTypeError,
  } = useGetImageType();
  return (
    <Layout>
      <div className="flex justify-start">
        <div className="card card-bordered w-full max-w-2xl bg-base-100">
          <div className="card-body">
            <Breadcrumb
              items={[
                { label: "Home", path: "/" },
                { label: "Images", path: "/images" },
                { label: "Create Image" },
              ]}
            />
            <h3 className="text-2xl font-bold mb-6">Create Image</h3>
            <FormProvider {...methods}>
              <form
                className="space-y-4"
                onSubmit={methods.handleSubmit(onSubmit)}
              >
                {show && <Alert success={success} message={message} />}
                <InputFile label="Background Image" name="bg_img" required />
                <TextArea label="Main Text" name="mainText" required />
                <TextArea label="Sub Text" name="subText" />
                <SelectBox
                  label="Image Type"
                  name="imageTypeId"
                  items={
                    imageTypeLoading
                      ? [{ value: "", showValue: "Loading..." }]
                      : imageTypeError
                      ? [{ value: "", showValue: "Failed to load types" }]
                      : data?.map((type: { id: string; typeName: string }) => ({
                          value: type.id,
                          showValue: type.typeName,
                        })) || []
                  }
                  required
                />
                <InputText label="Link" name="link" />
                <div className="flex justify-end mt-4">
                  <button className="btn btn-primary" disabled={loading}>
                    {loading ? "Loading..." : "Create Image"}
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

export default ImageCreate;
