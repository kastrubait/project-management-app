import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
  title: Yup.string()
    .required('*is required')
    .min(5, '*is too shoot')
    .max(75, '*is too long title'),
  order: Yup.number().required('*is required').positive(),
});
