export type  FormDataType = {
     name: string;
     email: string;
     phone:string;
     password:string;
     conPassword:string;
}

export type FormError = {
     name?: string;
     email?: string;
     phone?: string;
     password?: string;
     conPassword?: string;
}

export type LoginFormType ={
     email : string;
     password: string;
}

export type LoginErrorType = {
      email?: string;
      password?: string;
}

export type AgentFormDataType = FormDataType &  {
    address:{
       home: string;
       street?:string;
       city:string;
       state:string;
       country:string;
       zipcode:string;
    },
}

