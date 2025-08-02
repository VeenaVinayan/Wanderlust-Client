import * as yup from 'yup';

const schema = yup.object().shape({
     name:  yup
            .string()
            .required("Name is required")
            .min(3, "Name must be at least 3 characters long")
            .matches(/^[a-zA-Z \s]+$/, "Name must contain only letters and spaces")  
            .trim()
            .max(20, "Name must be at most 50 characters long"),
     phone:yup.string()
            .required("Phone number is required")
            .matches(/^\d{10}$/, "Phone number must be 10 digits"), 
});

export default schema;
