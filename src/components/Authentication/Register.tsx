import React, { useState } from "react";
import { FormDataType, FormError } from "../../types/formTypes";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setRegistrationData } from "../../features/authentication/registerSlice";
import { registerUser } from "../../services/Auth/Auth";

const Register: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormDataType>({
    name: "",
    email: "",
    phone: "",
    password: "",
    conPassword: "",
  });
  const [formErrors, setFormErrors] = useState<FormError>({});
  const dispatch = useDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };
  const validateForm = (): boolean => {
    const errors: FormError = {};
    if (!formData.name.trim()) {
      errors.name = "Name required !";
    } else if (formData.name.length < 3) {
      errors.name = "Name must be atlest 3 characters !";
    } else if (!/^[A-Za-z\s]+$/.test(formData.name)) {
      errors.name = "Name must be more than 3 characters !!";
    }
    // Validations for Email
    if (!formData.email) {
      errors.email = " Email is required !!";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email is invalid !";
    }
    // Validations for phone
    if (!formData.phone) {
      errors.phone = "Phone Number is required !";
    } else if (!/^[6-9]{4}\d{6}$/.test(formData.phone)) {
      errors.phone = "Phone number must be 10 digits and valid!";
    }

    if (!formData.password) {
      errors.password = "Password is Required !";
    }
    if (!formData.conPassword) {
      errors.conPassword = "COnfirm password Required !";
    }
    if (formData.password !== formData.conPassword) {
      errors.password = "Passwords Do Not Match !";
    } else {
      const regEx =
        /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,20}$/;
      if (!regEx.test(formData.password)) {
        errors.password =
          " Password must includes [ A-Z a-z 0-9 ! @ # $ % ^& *], minimum 8 characters long";
      }
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    try {
      const data = await registerUser(formData.email);
      console.log(data);
      dispatch(setRegistrationData(formData));
      setFormData({
        name: "",
        email: "",
        phone: "",
        password: "",
        conPassword: "",
      });
      const user: string = "User";
      navigate(`/otp/${user}`);
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.log(err.message);
      }
    }
  };
  return (
    <div className="flex items-center justify-center min-h-screen px-4 bg-gray-100">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6">Register</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your name"
            />
            {formErrors.name && (
              <p className="text-red-500 text-sm mt-1">{formErrors.name}</p>
            )}
          </div>

          {/* Email */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
            />
            {formErrors.email && (
              <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>
            )}
          </div>

          {/* Phone */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Phone Number
            </label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your phone number"
            />
            {formErrors.phone && (
              <p className="text-red-500 text-sm mt-1">{formErrors.phone}</p>
            )}
          </div>

          {/* Password */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
            />
            {formErrors.password && (
              <p className="text-red-500 text-sm mt-1">{formErrors.password}</p>
            )}
          </div>

          {/* Confirm Password */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Confirm Password
            </label>
            <input
              type="password"
              name="conPassword"
              value={formData.conPassword}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Confirm your password"
            />
            {formErrors.conPassword && (
              <p className="text-red-500 text-sm mt-1">
                {formErrors.conPassword}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-slate-700 text-white py-2 px-4 rounded-md hover:bg-slate-800 transition"
          >
            Register
          </button>
        </form>

        {/* Links */}
        <p className="text-sm text-center text-gray-600 mt-4">
          Already have an account?{" "}
          <a href="/login" className="text-blue-500 hover:underline">
            Login
          </a>
        </p>
        <p className="text-sm text-center text-gray-600 mt-2">
          <a href="/agentRegister" className="text-gray-400 hover:underline">
            Be a partner?
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;
