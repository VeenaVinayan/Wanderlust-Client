import * as Yup from "yup";

export const AgentValidationSchema = Yup.object().shape({
    name: Yup.string()
             .min(3, 'Must be at least 3 characters')
             .required('Name is required!'),
    email: Yup.string()
              .email("Invalid email format")
              .required('Email is required!'),
    password: Yup.string()
            .min(8, 'Password must be at least 8 characters long')
            .matches(/[a-zA-Z]/, "Password must contain at least one letter")
            .matches(/[0-9]/, "Password must contain at least one number!")
            .matches(/[!@#$.]/, "Password must contain at least one special character")
            .required("Password is required!"),
    conPassword: Yup.string()
              .oneOf([Yup.ref("password")], "Passwords must match")
              .required("Confirm password is required"),
    address: Yup.object().shape({
             home: Yup.string().min(6, 'Must be at least 6 characters').required('Home address is required!'),
             street: Yup.string().min(6, 'Must be at least 6 characters').required('Street is required!'),
             city: Yup.string().min(6, 'Must be at least 6 characters').required('City name required!'),
             state: Yup.string().min(3, 'Must be at least 3 characters').required('State required'),
             country: Yup.string().min(3, 'Must be at least 3 characters').required('Country required!'),
             zipcode: Yup.string()
                        .matches(/^\d{6}$/, "Pincode must be exactly 6 digits")
                        .required("Pincode is required!")    
    }),
    image: Yup.mixed<File>()
                .required('Certificate is required')
                .test("fileType", "Only PNG and JPG files are allowed", (value: File | null) => {
                    if (!value) return false;
                    return ["image/jpeg", "image/png"].includes(value.type);
                })  
                .test("fileSize", "File size must be less than 2MB", (value: File | null) => {
                    if (!value) return false;
                    return value.size <= 2 * 1024 * 1024;
                })    
});

export default AgentValidationSchema;
