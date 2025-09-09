import { useState } from "react";

export const useFormState = <T>() => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState<string | string[]>("");

  const handleSubmit = async (asyncFn: () => Promise<any>) => {
    setLoading(true);
    setShow(false);
    setMessage("");
    setSuccess(false);

    try {
      const response = await asyncFn();

      if (response?.statusCode === 200) {
        setSuccess(true);
        setMessage("Operation successful");
      } else if (response?.statusCode === 401) {
        setSuccess(false);
        setMessage("Please Log In Again");
      } else if (response?.statusCode === 400) {
        setSuccess(false);
        if (Array.isArray(response?.data)) {
          setShow(true)
          setSuccess(false)
          setMessage(response.data.map((err: any) => err.message));
        } else {
          setMessage(response?.data || "Invalid data");
        }
      } else {
        setSuccess(false);
        setMessage("Something went wrong");
      }
      return response;
    } catch (error: any) {
      setSuccess(false);
      console.log(error);
      setMessage(error?.response?.data || "Something went wrong");
      throw error;
    } finally {
      setShow(true);
      setLoading(false);
    }
  };

  return { loading, success, message, show, handleSubmit };
};
