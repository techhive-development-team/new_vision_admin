import { FormProvider } from "react-hook-form";
import InputText from "../../../components/forms/InputText";
import Breadcrumb from "../../../components/layouts/common/Breadcrumb";
import Layout from "../../../components/layouts/Layout";
import TextArea from "../../../components/forms/TextArea";
import InputFile from "../../../components/forms/InputFile";
import RadioInput from "../../../components/forms/RadioInput";
import { Link, useSearchParams } from "react-router-dom";
import Alert from "../../../components/forms/Alert";
import { useCourseEditForm } from "./useCourseEditForm";
import { API_URLS, imageUrl } from "../../../enum/urls";
import { useState, useEffect } from "react";

const DAYS_OPTIONS = [
  { label: "Monday", value: "MONDAY" },
  { label: "Tuesday", value: "TUESDAY" },
  { label: "Wednesday", value: "WEDNESDAY" },
  { label: "Thursday", value: "THURSDAY" },
  { label: "Friday", value: "FRIDAY" },
  { label: "Saturday", value: "SATURDAY" },
  { label: "Sunday", value: "SUNDAY" },
];

const CourseEdit = () => {
  const { onSubmit, loading, success, message, show, ...methods } =
    useCourseEditForm();

  const [selectedDays, setSelectedDays] = useState<Set<string>>(new Set());

  const [searchParams] = useSearchParams();
  const page = searchParams.get("page") || "1";
  
  // Sync selectedDays with form data when schedules are loaded
  useEffect(() => {
    const schedules = methods.getValues("schedules");
    if (schedules && schedules.length > 0) {
      const daysWithData = new Set<string>();
      
      // Map through DAYS_OPTIONS to check if each day has data
      DAYS_OPTIONS.forEach((day, index) => {
        const schedule = schedules[index];
        if (schedule && (schedule.startTime || schedule.endTime)) {
          daysWithData.add(day.value);
        }
      });
      
      setSelectedDays(daysWithData);
    }
  }, [methods.formState.isLoading, methods.watch("schedules")]);

  const handleDayCheckbox = (dayValue: string, checked: boolean, index: number) => {
    setSelectedDays((prev) => {
      const newSet = new Set(prev);
      if (checked) {
        newSet.add(dayValue);
      } else {
        newSet.delete(dayValue);
        // Clear the time values when unchecking
        methods.setValue(`schedules.${index}.startTime`, "");
        methods.setValue(`schedules.${index}.endTime`, "");
      }
      return newSet;
    });
  };

  return (
    <Layout>
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 lg:gap-6">
            <div className="card card-bordered w-full bg-base-100">
              <div className="card-body">
                <Breadcrumb
                  items={[
                    { label: "Home", path: "/" },
                    { label: "Courses", path: "/courses" },
                    { label: "Edit Course" },
                  ]}
                />
                <h3 className="text-2xl font-bold my-4">Edit Course</h3>

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
                      label: "CHILDREN'S CREATIVE PROGRAMS",
                      value: "CHILDRENS_CREATIVE",
                    },
                  ]}
                  required
                />
              </div>
            </div>
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
                <InputFile
                  label="Background Image"
                  name="image"
                  required
                  defaultImage={`${imageUrl}${API_URLS.COURSE}/${methods.getValues("image") || ""
                    }`}
                />
                <InputText
                  type="checkbox"
                  name="isOpened"
                  label="Is Opened"
                  variant="toggle"
                  required
                />
              </div>
            </div>
          </div>
          <div className="card card-bordered w-full bg-base-100 mt-6 shadow-sm">
            <div className="card-body">
              <div className="flex items-center gap-2 mb-4">
                <h4 className="text-lg font-semibold">Course Schedule</h4>
              </div>
              <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                  <thead>
                    <tr>
                      <th>Select</th>
                      <th>Day</th>
                      <th>Start Time</th>
                      <th>End Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    {DAYS_OPTIONS.map((day, index) => {
                      const isSelected = selectedDays.has(day.value);
                      return (
                        <tr key={day.value}>
                          <td>
                            <input
                              type="checkbox"
                              className="checkbox checkbox-primary"
                              checked={isSelected}
                              onChange={(e) =>
                                handleDayCheckbox(day.value, e.target.checked, index)
                              }
                            />
                          </td>
                          <td>
                            <span className="font-medium">{day.label}</span>
                            <input
                              type="hidden"
                              {...methods.register(`schedules.${index}.day`)}
                              value={day.value}
                            />
                          </td>
                          <td>
                            <input
                              type="time"
                              className={`input input-bordered input-sm w-full max-w-xs ${!isSelected ? "opacity-50" : ""
                                }`}
                              placeholder="09:00"
                              disabled={!isSelected}
                              {...methods.register(
                                `schedules.${index}.startTime`
                              )}
                            />
                            {methods.formState.errors.schedules?.[index]
                              ?.startTime && (
                                <span className="text-error text-xs mt-1">
                                  {
                                    methods.formState.errors.schedules[index]
                                      ?.startTime?.message
                                  }
                                </span>
                              )}
                          </td>
                          <td>
                            <input
                              type="time"
                              className={`input input-bordered input-sm w-full max-w-xs ${!isSelected ? "opacity-50" : ""
                                }`}
                              placeholder="17:00"
                              disabled={!isSelected}
                              {...methods.register(`schedules.${index}.endTime`)}
                            />
                            {methods.formState.errors.schedules?.[index]
                              ?.endTime && (
                                <span className="text-error text-xs mt-1">
                                  {
                                    methods.formState.errors.schedules[index]
                                      ?.endTime?.message
                                  }
                                </span>
                              )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="card card-bordered w-full bg-base-100 mt-6 shadow-sm">
            <div className="card-body">
              <div className="flex justify-between items-center">
                <Link to={`/courses?page=${page}`} className="btn btn-soft">
                  Back to Courses
                </Link>
                <button className="btn btn-primary" disabled={loading}>
                  {loading ? "Loading..." : "Update Course"}
                </button>
              </div>
            </div>
          </div>
        </form>
      </FormProvider >
    </Layout >
  );
};

export default CourseEdit;