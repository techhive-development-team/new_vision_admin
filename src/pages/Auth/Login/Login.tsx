import { useState } from "react";
import { FormProvider } from "react-hook-form";
import InputText from "../../../components/forms/InputText";
import { useLoginForm } from "./useLoginForm";
import { useNavigate } from "react-router-dom";
import logo from "/logo.png";

const Login = () => {
  const navigate = useNavigate();
  const { methods, onSubmit } = useLoginForm();
  const [loading, setLoading] = useState(false);

  const handleLogin = async (data: any) => {
    setLoading(true);
    try {
      const result: string = await onSubmit(data);
      localStorage.setItem("token", result);
      navigate("/");
    } catch (err: any) {
      console.log("Login failed:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50 bg-base-100">
      <div className="relative z-10 w-96 flex justify-center">
        <div className="bg-[rgba(0,77,128,0.2)] backdrop-blur-sm rounded-xl shadow-xl pt-16 pb-8 px-8 flex flex-col items-center w-full border border-white/30">
          <div className="absolute -top-20 w-36 h-36 rounded-full overflow-hidden border-2 border-[rgba(0,77,128,0.5)] shadow-lg">
            <img
              src={logo}
              alt="User Avatar"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="mt-4 text-center">
            <h1 className="text-lg font-semibold text-black mb-6">
              Welcome to New Vision <br />Admin Dashboard
            </h1>
          </div>

          <FormProvider {...methods}>
            <form
              className="flex flex-col w-full"
              onSubmit={methods.handleSubmit(handleLogin)}
            >
              <InputText label="Email" name="email" type="email" required />
              <InputText
                label="Password"
                name="password"
                type="password"
                required
              />

              <div className="flex gap-2 mt-4">
                <button
                  type="submit"
                  className="btn btn-primary flex-1"
                  disabled={loading}
                >
                  {loading ? (
                    <span className="loading loading-dots loading-sm"></span>
                  ) : (
                    "Login"
                  )}
                </button>
              </div>
            </form>
          </FormProvider>
        </div>
      </div>
    </div>
  );
};

export default Login;
