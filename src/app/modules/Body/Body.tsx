import { SyntheticEvent, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { BoardInfo } from './BoardInfo/BoardInfo';
import { IBoardPreview } from '../../Interfaces/BoardPreview';
import { ActionForm } from '../../Interfaces/ActionForm';
import { Form } from '../../components/Form/Form';
import { Modal } from '../../components/Modal/Modal';
import { MOCK_DATA } from '../../mockData/data';
import { ACTION } from '../../shared/constants';

import style from './Body.module.scss';

const { boards } = MOCK_DATA;

const Body = () => {
  const { t } = useTranslation();
  const [showForm, setShowForm] = useState(false);
  const [entityAction, setEntityAction] = useState({} as ActionForm);

  const { edit, type } = entityAction;
  const title = edit ? `${t('Edit')} ${type}` : `${t('Create')} ${type}`;

  const handleEdit = (event: SyntheticEvent<HTMLSpanElement>) => {
    event.stopPropagation();
    const data = { title: 'board' }; // TODO
    setEntityAction(ACTION.EDIT('board', { ...data }));
    // setEntityAction(ACTION.CREATE('board'));
    setShowForm(true);
  };

  const handleDelete = (event: SyntheticEvent<HTMLSpanElement>) => {
    event.stopPropagation();
    // TODO
    console.log('delete board');
  };

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
