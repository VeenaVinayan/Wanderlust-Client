
import * as yup from "yup";

const schema = yup.object().shape({
  name: yup
    .string()
    .required("Name is required")
    .min(3, "Name must be at least 3 characters!"),
  
  description: yup
    .string()
    .required("Description required!")
    .min(20, "One valid sentence needed!"),

  image: yup
    .mixed()
    .test("required", "Image is required", (value) => {
      return value instanceof File; 
    })
    .test("fileType", "Only image files are allowed", (value) => {
      if (!value) return false; 
      return ["image/jpeg", "image/png", "image/jpg"].includes(value.type);
    }),
});

export default schema;

