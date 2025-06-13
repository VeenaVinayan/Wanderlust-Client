import * as yup from 'yup';

import { addDays, addYears, startOfDay } from 'date-fns';

const today = startOfDay(new Date());
const minDate = startOfDay(addDays(today, 4)); 
const maxDate = startOfDay(addYears(today, 1));

const schema = yup.object().shape({
     tripDate: yup
                .date()
                .required("Trip Date is Required !")
                .min(minDate, 'Trip date shoud be 4 days prior to Today !')
                .max(maxDate, 'Trip date must be within 1 year from today !'),
     email: yup.string()
                .email('Invalid email address')
                .required('Email is required '),
     totalAmount: yup.number()
                .required()
                .min(500,'Price must be greater than 500'),
     travellers: yup.object().shape({
            adult: yup.number().min(1,' At least 1 adult required').required().max(10,'Maximum of 10 adult alloed'),
            children: yup.number().min(0).max(3,'Children limit exceeded, children should be atmost 3'),
            infant:yup.number().min(0).max(2,'Infant limit exceeded. Only up to 2 infants are allowed'),
      }),              
     phone: yup.string()
               .required('Phone number is required ')
               .matches(/^\d{10}$/, 'Phone number must be 10 digits'),    
});

export default schema;

 
