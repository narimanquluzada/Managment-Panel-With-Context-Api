import * as yup from 'yup';


const validations = yup.object().shape({
    title: yup.string().required('Daxil edin.'),
    context: yup.string().required('Daxil edin.'),
    price : yup.number().required('Daxil edin.'),
 
  });

 export default validations;