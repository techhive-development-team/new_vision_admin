import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useGetStudentById } from "../../../hooks/useGetStudent";
import { useForm, type UseFormReturn } from "react-hook-form";
import { type StudentEditForm, StudentSchema } from "../StudentValidationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { studentRepository } from "../../../repositories/studentRepository";
import { useFormState } from "../../../hooks/useFormState";

export const useStudentEditForm = () => {
  const { id } = useParams();
  const { data: studentData } = useGetStudentById(id?.toString() || "");

  const methods: UseFormReturn<StudentEditForm> = useForm<StudentEditForm>({
    resolver: zodResolver(StudentSchema(!!studentData?.studentImage)),
    defaultValues: {
      name: "",
      parentName: "",
      parentJob: "",
      dob: "",
      email: "",
      address: "",
      postalCode: "",
      phone: "",
      studentImage: undefined,
      school: "GOVERNMENT",
      studyAbroad: false,
      futurePlan: "",
      futureCountryId: "",
      futureCountryName: "",
      futureuniversityName: "",
      potentialYearOfStudy: "",
      joinRaffles: "NO",
      paymentOption: "CASH",
      status: "NONE",
      transactionId: "",
      coursesId: "",
    },
  });

  const { reset } = methods;
  const { loading, success, message, show, handleSubmit } = useFormState<StudentEditForm>();

  useEffect(() => {
    if (studentData) {
      reset({
        name: studentData.name,
        parentName: studentData.parentName,
        parentJob: studentData.parentJob,
        dob: studentData.dob ? new Date(studentData.dob).toISOString().split("T")[0] : "",
        email: studentData.email,
        address: studentData.address,
        postalCode: studentData.postalCode,
        phone: studentData.phone,
        studentImage: studentData.studentImage ?? null,
        school: studentData.school,
        studyAbroad: studentData.studyAbroad,
        futurePlan: studentData.futurePlan,
        futureCountryId: studentData.futureCountryId?.toString() || "",
        futureCountryName: studentData.futureCountryName || "",
        futureuniversityName: studentData.futureuniversityName || "",
        potentialYearOfStudy: studentData.potentialYearOfStudy
          ? new Date(studentData.potentialYearOfStudy).toISOString().split("T")[0]
          : "",
        joinRaffles: studentData.joinRaffles,
        paymentOption: studentData.paymentOption,
        status: studentData.status,
        transactionId: studentData.transactionId || "",
        coursesId: studentData?.courseId.toString() || "",
      });
    }
  }, [studentData, reset]);

  const onSubmit = (data: StudentEditForm) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("parentName", data.parentName);
    formData.append("parentJob", data.parentJob);
    formData.append("dob", data.dob);
    formData.append("email", data.email);
    formData.append("address", data.address);
    formData.append("postalCode", data.postalCode);
    formData.append("phone", data.phone);

    if (data.studentImage instanceof File) {
      formData.append("studentImage", data.studentImage);
    }

    formData.append("school", data.school);
    formData.append("studyAbroad", data.studyAbroad.toString());
    formData.append("futurePlan", data.futurePlan);
    formData.append("futureCountryId", data.futureCountryId || "");
    formData.append("futureCountryName", data.futureCountryName || "");
    formData.append("futureuniversityName", data.futureuniversityName || "");
    formData.append("potentialYearOfStudy", data.potentialYearOfStudy || "");
    formData.append("joinRaffles", data.joinRaffles);
    formData.append("paymentOption", data.paymentOption);
    formData.append("status", data.status);
    formData.append("transactionId", data.transactionId || "");
    formData.append("coursesId", data.coursesId || "");

    handleSubmit(() =>
      studentRepository.updateStudent(id?.toString() || "", formData)
    );
  };

  return { ...methods, onSubmit, loading, success, message, show };
};
