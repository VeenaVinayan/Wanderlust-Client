import * as yup from "yup";

const PasswordResetschema = yup.object().shape({
      oldPassword: yup.string()
            .min(8,'Password must be atleast 8 characters long')
            .matches(/[a-zA-Z]/,' Password must contains atleast one letter ' )
            .matches(/[0-9]/,'Must contains atleast one number')
            .matches(/[@#$.]/,'Must includes a special character ')
            .required("Password is required "),
       newPassword :    yup.string()
             .min(8,'Password must be atleast 8 characters long')
             .matches(/[a-zA-Z]/,' Password contains atlest one letter ' )
             .matches(/[0-9]/,'Must contains atleast one number')
             .matches(/[@#$.]/,'Must includes a special character ')
             .required("Password is required "),   
       confirmPassword : yup.string()
            .oneOf([yup.ref("newPassword")]," Password should match !") 
            .required("Confirm password is required"),
  });

  export default PasswordResetschema;