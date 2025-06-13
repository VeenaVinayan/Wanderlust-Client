 
 import * as Yup from "yup";

const editPackageSchema = Yup.object().shape({
  name: Yup.string()
    .required("Package name is required")
    .min(10, "Package name must be at least 10 characters long")
    .max(50, "Package name must not exceed 30 characters"),
    
  description: Yup.string()
    .required("Description is required")
    .min(20, "Description must be at least 20 characters long")
    .max(1000, "Description must not exceed 1000 characters"),
    
  category: Yup.string()
    .required("Category is required")
    .matches(/^[0-9a-fA-F]{24}$/, "Invalid category ID"),

  day: Yup.number()
      .required("Number of days is required")
      .min(1, "Day count must be at least 1"),
  night: Yup.number()
    .required("Number of nights is required")
    .min(0, "Night count must be at least 0"),
  price: Yup.number()
     .required("Price is required")
    .min(0, "Price must be a positive value"),
  itinerary: Yup.array()
    .of(
      Yup.object().shape({
       description: Yup.string()
          .min(5, "Itinerary description must be at least 5 characters long")
          .required("Itinerary description is required"),
        activities: Yup.string().required("Activities are required"),
        meals: Yup.array()
          .min(1, "At least one meal option must be selected")
          .required("Meals are required"),
        stay: Yup.string().required("Stay details are required"),
        transfer: Yup.string().required("Transfer details are required"),
      })
    )
    .min(1, "At least one itinerary item is required")
    .required("Itinerary is required"),
});

 export default editPackageSchema;