import { SyntheticEvent, useEffect, useState } from 'react';
import { BoardInfo } from './BoardInfo/BoardInfo';
import { IBoardPreview } from '../../Interfaces/BoardPreview';
import { ActionForm } from '../../Interfaces/ActionForm';
import { Form } from '../../components/Form/Form';
import { Modal } from '../../components/Modal/Modal';
import { deleteBoardThunk, getAllBoardThunk } from '../../store/reducers/HeaderSlice';
import { useAppDispatch, useAppSelector } from '../../store/redux';
import { ACTION } from '../../shared/constants';

import style from './Body.module.scss';

// const { boards } = MOCK_DATA;

const Body = () => {
  const dispatch = useAppDispatch();
  const [showForm, setShowForm] = useState(false);
  const [entityAction, setEntityAction] = useState({} as ActionForm);
  const [isConfirmAction, setIsConfirmAction] = useState<boolean>(false);

  const boards = useAppSelector((state) => state.header.boards);

  const { edit, type } = entityAction;
  const title = edit ? `Edit ${type}` : `Create ${type}`;

  const handleEdit = (event: SyntheticEvent<HTMLSpanElement>) => {
    event.stopPropagation();
    const { id } = event.currentTarget.dataset;
    const data = boards.find((el) => el.id === id);
    setEntityAction(ACTION.EDIT('board', { title: data?.title ?? '' }));
    setShowForm(true);
  };

  const handleDelete = (event: SyntheticEvent<HTMLSpanElement>) => {
    event.stopPropagation();
    dispatch(deleteBoardThunk(event.currentTarget.dataset.id as string));
    setIsConfirmAction(true);
    setTimeout(() => {
      setIsConfirmAction(false);
    }, 2300);
  };

  useEffect(() => {
    dispatch(getAllBoardThunk());
  }, [isConfirmAction]);

  return (
    <section className={style.cardsConteiner}>
      {boards.map((item: IBoardPreview) => (
        <div key={item.id} className={style.element}>
          {!showForm && <BoardInfo {...item} handleEdit={handleEdit} handleDelete={handleDelete} />}
          <Modal
            key={item.id}
            isVisible={showForm}
            title={title}
            content={<Form {...entityAction} />}
            onClose={() => setShowForm(false)}
          />
        </div>
      ))}
    </section>
  );
};

export default Body;
