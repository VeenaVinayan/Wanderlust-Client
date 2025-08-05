import * as yup from "yup";

const schema = yup.object().shape({
  name: yup
    .string()
    .required("Name is required")
    .matches(/^[a-zA-Z\s\-&,.]*$/)
    .min(5, "Name must be at least 5 characters!")
    .max(25,"Name limit exceed"),
  
  description: yup
    .string()
    .required("Description required!")
    .min(20, "One valid sentence needed!")
    .max(150,"Description limit exceed"),
});

export default schema;
