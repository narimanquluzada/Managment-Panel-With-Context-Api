import * as yup from 'yup';


const validations = yup.object().shape({
    firstName: yup.string().required('Daxil edin.'),
    lastName: yup.string(),
    email : yup.string().email('Duzgun email daxil edin').required('Daxil edin.'),
    password : yup.string().min(6, 'Minimum 6 daxil edin').required('Daxil edin.'),
    passwordConfirm:yup.string().oneOf([yup.ref('password')],'Sifreler eyni deyil.').required('Daxil edin.'),
  });

 export default validations;