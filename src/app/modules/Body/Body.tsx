import { SyntheticEvent, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { BoardInfo } from './BoardInfo/BoardInfo';
import { IBoardPreview } from '../../Interfaces/BoardPreview';
import { ActionForm } from '../../Interfaces/ActionForm';
import { Form } from '../../components/Form/Form';
import { Modal } from '../../components/Modal/Modal';
import { getAllBoardThunk, updateBoardThunk } from '../../store/reducers/BodySlice';
import { useAppDispatch, useAppSelector } from '../../store/redux';
import { ACTION, BOARD } from '../../shared/constants';
import { IFormData } from '../../Interfaces/FormData';

import style from './Body.module.scss';

const Body = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const [showForm, setShowForm] = useState(false);
  const [entityAction, setEntityAction] = useState({} as ActionForm);
  const selectorBoards = useAppSelector((state) => state.body.boards);
  const [boards, setBoards] = useState(selectorBoards);

  const { edit, type } = entityAction;
  const title = edit ? `${t('Edit')} ${t(type)}` : `${t('Create')} ${t(type)}`;

  const onEdit = (event: SyntheticEvent<HTMLSpanElement>) => {
    event.stopPropagation();
    const { id } = event.currentTarget.dataset;
    const data = boards.find((el) => el.id === id);
    setEntityAction(
      ACTION.EDIT(
        BOARD,
        { title: data?.title ?? '', description: data?.description ?? '' },
        { boardId: id }
      )
    );
    setShowForm(true);
  };

  const onSubmitForm = (data: IFormData) => {
    const { title, description } = data;
    const { boardId } = entityAction.bindingFields;
    switch (type) {
      case 'board':
        if (edit && boardId) {
          dispatch(updateBoardThunk({ id: boardId, title, description }));
        }
        break;
      default:
        return null;
    }
    setShowForm(false);
  };

  useEffect(() => {
    dispatch(getAllBoardThunk());
  }, [dispatch]);

  useEffect(() => {
    setBoards(selectorBoards);
  }, [selectorBoards]);

  return (
    <section className={style.cardsConteiner}>
      {boards.map((item: IBoardPreview) => (
        <div key={item.id} className={style.element}>
          {!showForm && <BoardInfo {...item} handleEdit={onEdit} />}
          <Modal
            key={item.id}
            isVisible={showForm}
            title={title}
            content={<Form {...entityAction} onSubmitForm={onSubmitForm} />}
            onClose={() => setShowForm(false)}
          />
        </div>
      ))}
    </section>
  );
};

export default Body;
