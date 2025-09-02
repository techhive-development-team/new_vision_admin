import { Link } from "react-router-dom";
import Layout from "../../../components/layouts/Layout";
import Breadcrumb from "../../../components/layouts/common/Breadcrumb";
import InputText from "../../../components/forms/InputText";
import { FormProvider } from "react-hook-form";
import Alert from "../../../components/forms/Alert";
import { useImageEditForm } from "./useImageEditForm";
import { useGetImageType } from "../../../hooks/useGetImageType";
import InputFile from "../../../components/forms/InputFile";
import TextArea from "../../../components/forms/TextArea";
import SelectBox from "../../../components/forms/SelectBox";

const ImageEdit = () => {
  const { onSubmit, loading, success, message, show, ...methods } =
    useImageEditForm();

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
                { label: "Image", path: "/images" },
                { label: "Edit Image" },
              ]}
            />
            <h3 className="text-2xl font-bold my-4">Edit Image</h3>
            <FormProvider {...methods}>
              <form
                className="space-y-4"
                onSubmit={methods.handleSubmit(onSubmit)}
              >
                {show && <Alert success={success} message={message} />}
                <InputFile label="Background Image" name="bgImg" required />
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
                <div className="pt-4 flex justify-between">
                  <Link to="/images" className="btn btn-soft">
                    Back to Images
                  </Link>
                  <button className="btn btn-primary text-white">
                    Edit Image
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

export default ImageEdit;
