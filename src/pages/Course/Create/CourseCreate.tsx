import { FormProvider } from "react-hook-form";
import InputText from "../../../components/forms/InputText";
import SkillsInput from "../../../components/forms/SkillsInput";
import Breadcrumb from "../../../components/layouts/common/Breadcrumb";
import Layout from "../../../components/layouts/Layout";
import { useCourseCreateForm } from "./useCourseCreateForm";
import TextArea from "../../../components/forms/TextArea";
import InputFile from "../../../components/forms/InputFile";
import RadioInput from "../../../components/forms/RadioInput";
import { Link } from "react-router-dom";
import Alert from "../../../components/forms/Alert";

const CourseCreate = () => {
  const { onSubmit, loading, success, message, show, ...methods } =
    useCourseCreateForm();

  return (
    <Layout>
      <FormProvider {...methods}>
        <form
          className="grid grid-cols-1 lg:grid-cols-2 gap-0 lg:gap-6"
          onSubmit={methods.handleSubmit(onSubmit)}
        >
          <div className="card card-bordered w-full bg-base-100">
            <div className="card-body">
              <Breadcrumb
                items={[
                  { label: "Home", path: "/" },
                  { label: "Courses", path: "/courses" },
                  { label: "Add Course" },
                ]}
              />
              <h3 className="text-2xl font-bold my-4">Create Course</h3>

              {show && <Alert success={success} message={message} />}

              <InputText
                label="Course Name"
                name="name"
                placeholder="Enter course name"
                required
              />
              <TextArea
                label="Program Overview"
                name="programOverview"
                required
              />
              <TextArea label="Course Level" name="level" />
              <InputText
                label="Course Duration"
                name="duration"
                placeholder="Enter course duration"
                required
              />
              <RadioInput
                name="location"
                label="Location"
                options={[
                  { label: "Online", value: "online" },
                  { label: "Onsite", value: "onsite" },
                ]}
                required
              />
              <RadioInput
                name="programType"
                label="Program Type"
                options={[
                  { label: "ART & DESIGN PROGRAMS", value: "ART_DESIGN" },
                  { label: "TECHNOLOGY PROGRAMS", value: "TECHNOLOGY" },
                  {
                    label: "CHILDREN’S CREATIVE PROGRAMS",
                    value: "CHILDRENS_CREATIVE",
                  },
                ]}
                required
              />
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="card card-bordered w-full bg-base-100">
            <div className="card-body">
              <InputText
                label="Course Expiration Date"
                name="expireDate"
                placeholder="Enter course expiration date"
                type="date"
                min={new Date().toISOString().split("T")[0]}
              />
              <InputText
                label="Course Price"
                name="price"
                placeholder="Enter course price"
              />
              <InputText
                label="Course quiz link"
                name="quiz"
                placeholder="Enter course quiz link"
              />
              <InputFile label="Background Image" name="image" required />
              <SkillsInput
                name="skills"
                label="Course Skills"
                placeholder="Enter course skills"
              />
              <div className="pt-4 card-actions flex justify-between">
                <Link to="/courses" className="btn btn-soft">
                  Back to Courses
                </Link>
                <button className="btn btn-primary" disabled={loading}>
                  {loading ? "Loading..." : "Create Course"}
                </button>
              </div>
            </div>
          </div>
        </form>
      </FormProvider>
    </Layout>
  );
};

export default CourseCreate;
