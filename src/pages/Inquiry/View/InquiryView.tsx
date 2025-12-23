import { Link, useLocation } from "react-router-dom";
import Layout from "../../../components/layouts/Layout";
import Breadcrumb from "../../../components/layouts/common/Breadcrumb";
import InputText from "../../../components/forms/InputText";
import TextArea from "../../../components/forms/TextArea";
import { useForm, FormProvider } from "react-hook-form";
import type { Course } from "../../../components/tables/CourseTable";

type Form = {
  name: string;
  email: string;
  phone?: string;
  description: string;
  course?: Course;
};

const InquiryView = () => {
  const { state } = useLocation();
  const inquiry = state?.inquiry;

  if (!inquiry) {
    return (
      <Layout>
        <div className="flex justify-center mt-10">
          <p className="text-red-500">No inquiry data to display</p>
          <Link to="/inquiry" className="btn btn-soft mt-4">
            Back to Inquiry
          </Link>
        </div>
      </Layout>
    );
  }

  // Create form with default values
  const methods = useForm<Form>({
    defaultValues: {
      name: inquiry.name,
      email: inquiry.email,
      phone: inquiry.phone,
      description: inquiry.description,
      course: inquiry.course,
    },
  });

  return (
    <Layout>
      <div className="flex justify-start">
        <div className="card card-bordered w-full max-w-2xl bg-base-100">
          <div className="card-body">
            <Breadcrumb
              items={[
                { label: "Home", path: "/" },
                { label: "Inquiry", path: "/inquiry" },
                { label: "View Inquiry" },
              ]}
            />
            <h3 className="text-2xl font-bold my-4">View Inquiry</h3>

            <FormProvider {...methods}>
              <form className="space-y-4">
                <InputText label="Name" name="name" type="text" />
                <InputText label="Email" name="email" type="email" />
                <InputText label="Phone" name="phone" type="text" />
                <InputText label="Course" name="course.name" type="text" readonly />
                <TextArea label="Description" name="description" />

                <div className="pt-4 card-actions">
                  <Link to="/inquiry" className="btn btn-soft">
                    Back to Inquiry
                  </Link>
                </div>
              </form>
            </FormProvider>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default InquiryView;
