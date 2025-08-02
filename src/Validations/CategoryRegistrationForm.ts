import * as yup from "yup";

const schema = yup.object().shape({
  name: yup
    .string()
    .required("Name is required")
    .matches(/^[a-zA-Z\s\-&,.]*$/)
    .min(5, "Name must be at least 3 characters!"),
  
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
      const file = value as File;
      if (!value) return false; 
      return ["image/jpeg", "image/png", "image/jpg"].includes(file.type);
    }),
});

export default schema;
// import * as yup from "yup";

// const SUPPORTED_FORMATS = ["image/jpeg", "image/png", "image/jpg"];
// const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB

// const schema = yup.object().shape({
//   name: yup
//     .string()
//     .required("Name is required")
//     .min(3, "Name must be at least 3 characters!"),

//   description: yup
//     .string()
//     .required("Description required!")
//     .min(20, "One valid sentence needed!"),

//   image: yup
//     .mixed<File | string>()
//     .test("fileOrString", "Image is required", (value) => {
//       return value instanceof File || (typeof value === "string" && value.trim() !== "");
//     })
//     .test("fileType", "Only image files are allowed", (value) => {
//       if (value instanceof File) {
//         return SUPPORTED_FORMATS.includes(value.type);
//       }
//       return true; // Skip for string (existing URL)
//     })
//     .test("fileSize", "Image must be less than 2MB", (value) => {
//       if (value instanceof File) {
//         return value.size <= MAX_FILE_SIZE;
//       }
//       return true; 
//     }),
// });

// export default schema;


