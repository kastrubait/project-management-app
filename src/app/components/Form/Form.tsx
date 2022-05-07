import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { validationSchema } from './validationSchema';
import { IBoard } from '../../Interfaces/IBoard';
import { ActionForm } from '../../Interfaces/IActionForm';

import style from './Form.module.scss';

interface FormProps {
  action: ActionForm;
  type: string;
  data?: IBoard;
}

export const Form = ({ action, type = 'board', data }: FormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    // formState: { errors, isDirty }, // TODO
  } = useForm<IBoard>({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = (data: IBoard) => {
    console.log(data);
    // TODO
  };

  return (
    <form
      action="POST"
      className={style.userForm}
      onSubmit={handleSubmit(onSubmit)}
      data-testid="form"
    >
      <div className={style.topForm}>
        <label htmlFor="title" className={style.labelInput}>
          <strong>title</strong>
          <span className={style.error}>{errors.title?.message}</span>
          <br />
          <input type="text" {...register('title')} name="title" />
        </label>
      </div>
      <input type="submit" value="create" className={style.button} />
    </form>
  );
};
