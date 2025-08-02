import * as Yup from "yup";
const packageValidationSchema = Yup.object().shape({
  name: Yup.string()
    .required("Package name is required")
    .min(5, "Package name must be at least 5 characters long")
    .max(100, "Package name must not exceed 100 characters")
    .matches(/^[a-zA-Z ]*$/, "Special characters are not allowed"),
    
  description: Yup.string()
    .required("Description is required")
    .min(20, "Description must be at least 20 characters long")
    .max(1000, "Description must not exceed 1000 characters"),

  images: Yup.array()
    .of(
      Yup.mixed()
        .required("Image is required")
        .test("fileType", "Only JPG, PNG, or AVIF files are allowed", (value) => {
          const file = value as File;
          return file && ["image/jpeg", "image/png", "image/avif", "image/webp"].includes(file.type);
        })
    )
    .min(1, "At least one image is required")
    .required("Images are required"),

  category: Yup.string()
    .required("Category is required")
    .matches(/^[0-9a-fA-F]{24}$/, "Invalid category ID"),

  day: Yup.number()
    .required("Number of days is required")
    .min(1, "Day count must be at least 1")
    .max(10, "Day count must not exceed 10"),

  night: Yup.number()
    .required("Number of nights is required")
    .min(0, "Night count must be at least 0")
    .max(9, "Night count must not exceed 9")
    .test(
      "night-less-than-day",
      "Night should be exactly one less than day",
      function (night) {
        const { day } = this.parent;
        return night === day - 1;
      }
    ),

  price: Yup.number()
    .required("Price is required")
    .min(500, "Price must be at least 500"),

  totalCapacity: Yup.number()
    .required("Total capacity field is required!")
    .min(1, "At least 1 is required!")
    .max(15, "Maximum capacity is 15"),

  itinerary: Yup.array()
    .of(
      Yup.object().shape({
        description: Yup.string()
          .required("Itinerary description is required")
          .matches(/^[a-zA-Z ]*$/, "Special characters are not allowed")
          .min(5, "Itinerary description must be at least 5 characters long"),
        activities: Yup.string()
                       .required("Activities are required")
                       .matches(/^[a-zA-Z0-9 ]*$/, "Special characters are not allowed"),
        meals: Yup.array().min(1, "At least one meal option must be selected"),
        stay: Yup.string().required("Stay details are required")
                          .matches(/^[a-zA-Z ]*$/, "Special characters are not allowed"),
                      
        transfer: Yup.string()
                     .required("Transfer details are required")
                     .matches(/^[a-zA-Z /-]*$/, "Special characters are not allowed"),
      })
    )
    .required("Itinerary is required")
    .min(1, "At least one itinerary item is required")
    .test(
      "itinerary-length-matches-days",
      "Number of itinerary items must match the number of days",
      function (itinerary) {
        const { day } = this.parent;
        return Array.isArray(itinerary) && itinerary.length === day;
      }
    ),
});

export default packageValidationSchema;
