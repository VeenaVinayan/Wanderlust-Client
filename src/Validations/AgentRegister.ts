import * as Yup from "yup";

export const AgentValidationSchema = Yup.object().shape({
    name: Yup.string()
             .min(3, 'Must be at least 3 characters')
             .required('Name is required!'),
    email: Yup.string()
              .email("Invalid email format")
              .required('Email is required!'),
    phone: Yup.string()
              .matches(/^\d{10}$/, "Phone number must be exactly 10 digits")
              .required('Phone number is required!'),
    password: Yup.string()
            .min(8, 'Password must be at least 8 characters long')
            .matches(/[a-zA-Z]/, "Password must contain at least one letter")
            .matches(/[0-9]/, "Password must contain at least one number!")
            .matches(/[!@#$.]/, "Password must contain at least one special character")
            .required("Password is required!"),
    conPassword: Yup.string()
              .oneOf([Yup.ref("password")], "Passwords must match")
              .required("Confirm password is required"),
    home: Yup.string().min(6,'Must be at least 6 characters').required('Home address is required!'),
    street: Yup.string().min(6, 'Must be at least 6 characters').required('Street is required!'),
    city: Yup.string().min(6, 'Must be at least 6 characters').required('City name required!'),
    state: Yup.string().min(3, 'Must be at least 3 characters').required('State required'),
    country: Yup.string().min(3, 'Must be at least 3 characters').required('Country required!'),
    zipcode: Yup.string()
            .matches(/^\d{6}$/, "Pincode must be exactly 6 digits")
            .required("Pincode is required!")    
    
});

export default AgentValidationSchema;
