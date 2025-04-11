 
import * as Yup from "yup";

const packageValidationSchema = Yup.object().shape({
  name: Yup.string()
    .min(5, "Package name must be at least 3 characters long")
    .max(100, "Package name must not exceed 100 characters")
    .required("Package name is required"),
  
  description: Yup.string()
    .min(20, "Description must be at least 10 characters long")
    .max(1000, "Description must not exceed 1000 characters")
    .required("Description is required"),
  
  images: Yup.array()
    .of(Yup.string().url("Each image must be a valid URL"))
    .min(1, "At least one image is required")
    .required("Images are required"),
  
  category: Yup.string()
    .required("Category is required")
    .matches(/^[0-9a-fA-F]{24}$/, "Invalid category ID"),
  
  status: Yup.boolean()
    .required("Status is required"),
  
  day: Yup.number()
    .min(1, "Day count must be at least 1")
    .required("Number of days is required"),
  
  night: Yup.number()
    .min(0, "Night count must be at least 0")
    .required("Number of nights is required"),
  
  price: Yup.number()
    .min(0, "Price must be a positive value")
    .required("Price is required"),
  
  isBlocked: Yup.boolean()
    .required("Blocked status is required"),
  itinerary: Yup.array()
    .of(
      Yup.object().shape({
        day: Yup.number().min(1, "Itinerary day must be at least 1").required("Itinerary day is required"),
        description: Yup.string().min(5, "Itinerary description must be at least 5 characters long").required("Itinerary description is required"),
        activities: Yup.string().required("Activities are required"),
        meals: Yup.array()
                .min(2, "At least one option must be selected"),
        stay: Yup.string().required("Stay details are required"),
        transfer: Yup.string().required("Transfer details are required"),
      })
    )
    .min(1, "At least one itinerary item is required")
    .required("Itinerary is required"),
 });

export default packageValidationSchema;