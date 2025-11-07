import { FormProvider } from "react-hook-form";
import InputText from "../../../components/forms/InputText";
import TextArea from "../../../components/forms/TextArea";
import SelectBox from "../../../components/forms/SelectBox";
import InputFile from "../../../components/forms/InputFile";
import Breadcrumb from "../../../components/layouts/common/Breadcrumb";
import Layout from "../../../components/layouts/Layout";
import Alert from "../../../components/forms/Alert";
import { Link } from "react-router-dom";
import { useHappeningEditForm } from "./useHappeningEditForm";
import { useGetHappeningType } from "../../../hooks/useGetHappeningType";
import { API_URLS, imageUrl } from "../../../enum/urls";
import MultiFileUpload from "../../../components/forms/MultiFileUpload";

const HappeningEdit = () => {
  const {
    onSubmit,
    loading,
    success,
    message,
    show,
    defaultAlbumUrls,
    handleExistingImagesChange,
    ...methods
  } = useHappeningEditForm();

  const { data, isLoading, error } = useGetHappeningType();

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
              <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-4">
                {show && <Alert success={success} message={message} />}
                <InputText label="Happening Name" name="title" required />
                <TextArea label="Description" name="description" required />
                <InputText
                  label="Embedded Link"
                  name="embeddedLink"
                  placeholder="Enter embedded link"
                />
                <SelectBox
                  label="Happening Type"
                  name="happeningTypeId"
                  items={
                    isLoading
                      ? [{ value: "", showValue: "Loading..." }]
                      : error
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
                  defaultImage={`${imageUrl}${API_URLS.HAPPENING}/${methods.getValues("mainImage")}`}
                />

                <MultiFileUpload
                  name="album_images"
                  label="Album Images"
                  defaultUrls={defaultAlbumUrls}
                  accept="image/*"
                  allowedTypes={[
                    "image/jpeg",
                    "image/png",
                    "image/webp",
                    "image/gif",
                  ]}
                  fileTypeLabel="images"
                  onExistingImagesChange={handleExistingImagesChange}
                />

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
