import React, { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  LoginFormType,
  LoginErrorType,
  FormError,
} from "../../types/formTypes";
import { toast } from "react-toastify";
import Modal from "../common/Modal";
import { useDispatch } from "react-redux";
import { setUserData } from "../../features/authentication/userSlice";
import { setAgentData } from "../../features/authentication/AgentDataSlice";
import Spinner from "../common/Spinner";
import { useGoogleLogin } from "@react-oauth/google";
import googleAuth from "../../services/Auth/GoogleAuth";
import { LoginResponse } from "../../types/userTypes";
import { Eye, EyeOff } from "lucide-react";
import { loginUser, passwordForget } from "../../services/Auth/Auth";
import { Link } from "react-router-dom";
import type { CodeResponse } from "@react-oauth/google";
const Login: React.FC = () => {
  const [formData, setFormData] = useState<LoginFormType>({
    email: "",
    password: "",
  });
  const [isLoading, setLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [formError, setFormError] = useState<LoginErrorType>({});
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [eyeClosed, setEyeClosed] = useState(true);
  const toggleEye = (e: React.MouseEvent) => {
    e.preventDefault();
    setEyeClosed(!eyeClosed);
  };
  const userAuthorize = (data: LoginResponse) => {
    const { accessToken, user, isVerified } = data;
    localStorage.setItem(`accessToken`, accessToken);
    localStorage.setItem("userId", user.id);
    dispatch(setUserData(user));
    switch (user.role) {
      case "Admin":
        navigate("/admin/adminDashboard/view", { replace: true });
        break;
      case "User":
        navigate("/", { replace: true });
        break;
      case "Agent":
        dispatch(setAgentData(user));
        if (isVerified === "Pending") {
          navigate("/agent/agentVerification", { state: { status: false } });
        } else if (isVerified === "Uploaded") {
          navigate("/agent/agentVerification", { state: { status: true } });
        } else {
          navigate("/agent/agentDashboard/view", { replace: true });
        }
        break;
      default:
        toast.error("Error occured !!");
        break;
    }
  };
  const handleGoogleSuccess = async (
    codeResponse: Omit<
      CodeResponse,
      "error" | "error_description" | "error_uri"
    >
  ) => {
    try {
      if (codeResponse.code) {
        const result = await googleAuth(codeResponse.code);
        userAuthorize(result.data);
        toast.success("Successfully Logged in!");
      } else {
        throw new Error("Google Auth Error: No code received");
      }
    } catch (e) {
      console.log(e);
      toast.error("Google login failed.");
    }
  };

  const handleGoogleError = (
    errorResponse: Pick<
      CodeResponse,
      "error" | "error_description" | "error_uri"
    >
  ) => {
    console.error("Google login error:", errorResponse);
    toast.error("Google login failed.");
  };

  const googleLogin = useGoogleLogin({
    onSuccess: handleGoogleSuccess,
    onError: handleGoogleError,
    flow: "auth-code",
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((preData) => ({ ...preData, [name]: value }));
  };
  const clearFormData = () => {
    setFormData({
      email: "",
      password: "",
    });
  };
  const toggleModal = () => setIsModalOpen(!isModalOpen);

  const handleSubmit = async (e: React.FormEvent) => {
    setLoading(true);
    e.preventDefault();
    if (!validation()) {
      setLoading(false);
      return;
    }
    try {
      const data = await loginUser(formData.email, formData.password);
      if (data.success) {
        toast.success(data?.message);
        userAuthorize(data.data);
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.log("Error in Login :", err.message);
      }
      clearFormData();
      setLoading(false);
    }
  };
  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const forgetPassword = async (e: FormEvent) => {
    try {
      e.preventDefault();
      const data = await passwordForget(email);
      if (data.success) {
        toast.success(data.message);
        setIsModalOpen(false);
      } else {
        toast.success(data.message);
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        toast.error(err.message);
        console.error("Error in Forgot Password !!", err);
      }
    }
  };
  const validation = (): boolean => {
    const errors: FormError = {};
    if (!formData.email.trim()) {
      errors.name = "Email required !";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.name = "Invalid Email ! ";
    }
    if (!formData.password.trim()) {
      errors.password = " Password Required !";
    } else {
      const regEx =
        /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
      if (!regEx.test(formData.password)) {
        errors.password = "Invalid Password ";
      }
    }
    setFormError(errors);
    return Object.keys(errors).length === 0;
  };
  return (
    <>
      <div className="flex flex-col mt-12 md:flex-row h-screen bg-gradient-to-tr from-gray-100 via-white to-gray-200">
        <div className="w-full md:w-1/2 flex flex-col justify-center items-center bg-white ">
          <img
            src="/images/travel.jpg"
            alt="Login Illustration"
            className="rounded-lg shadow-xl w-[250px] h-[180px] md:w-[350px] md:h-[240px]"
          />
          <p className="mt-8 text-center text-2xl tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-gray-600 via-emerald-400 to-gray-500 font-[Playfair_Display]">
            Escape the ordinary. Embrace the journey.
          </p>
        </div>
        <div className="w-full md:w-1/2 flex items-center justify-center px-6 py-12">
          <div className="w-full max-w-md bg-white rounded-xl shadow-xl p-8 space-y-6">
            <h2 className="text-3xl font-bold text-center text-gray-700">
              Log In | Wanderlust
            </h2>

            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
                {formError.email && (
                  <p className="text-red-600 text-sm">{formError.email}</p>
                )}
              </div>

              <div>
                <div className="flex flex-row justify-between">
                  <label className="block text-sm text-gray-600 mb-1">
                    Password
                  </label>
                  <div className="text-center">
                    <button
                      onClick={toggleModal}
                      className="text-sm text-blue-600 hover:text-blue-800 hover:underline"
                    >
                      Forgot your password?
                    </button>
                  </div>
                </div>
                <div className="relative">
                  <input
                    type={eyeClosed ? "password" : "text"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                  <button
                    type="button"
                    onClick={toggleEye}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-800"
                  >
                    {eyeClosed ? <Eye size={18} /> : <EyeOff size={18} />}
                  </button>
                </div>
                {formError.password && (
                  <p className="text-red-600 text-sm">{formError.password}</p>
                )}
              </div>
              {isLoading ? (
                <Spinner />
              ) : (
                <button
                  type="submit"
                  className="w-full py-2 bg-gray-500 text-white rounded-md hover:bg-gray-700 transition"
                >
                  Login
                </button>
              )}
            </form>
            <div className="flex items-center gap-4">
              <hr className="flex-1 border-gray-300" />
              <span className="text-sm text-gray-400">OR</span>
              <hr className="flex-1 border-gray-300" />
            </div>

            <div className="flex justify-center border">
              <button onClick={googleLogin}>
                <img
                  src="https://developers.google.com/identity/images/btn_google_signin_light_normal_web.png"
                  alt="Sign in with Google"
                  className="cursor-pointer"
                />
              </button>
            </div>

            {/* Register Link */}
            <div className="text-center text-sm text-gray-600">
              Don’t have an account?{" "}
              <Link
                to="/register"
                className="text-teal-600 hover:text-teal-800 font-semibold hover:underline"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Modal for Forgot Password */}
      <Modal
        isOpen={isModalOpen}
        closeModal={toggleModal}
        title="Reset Your Password"
      >
        <form onSubmit={forgetPassword}>
          <label htmlFor="email" className="block mb-2 text-sm text-gray-700">
            Email address
          </label>
          <input
            name="email"
            type="email"
            required
            onChange={handleEmail}
            placeholder="Enter your email"
            className="w-full px-4 py-2 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
          <button
            type="submit"
            className="w-full py-2 bg-gray-600 text-white rounded-md hover:bg-gray-500 transition"
          >
            Submit
          </button>
        </form>
      </Modal>
    </>
  );
};

export default Login;
