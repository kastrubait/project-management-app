import { SyntheticEvent, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { Form } from '../components/Form/Form';
import { Modal } from '../components/Modal/Modal';
import { ActionForm } from '../Interfaces/ActionForm';
import { IColumnData } from '../Interfaces/IColumn';
import { MOCK_DATA } from '../mockData/data';
import { Column } from '../modules/Board/Column/Column';
import { ACTION } from '../shared/constants';
import style from './BoardPage.module.scss';

type QuizParams = {
  id: string;
};

function BoardPage() {
  const { columns } = MOCK_DATA; // TODO
  // const columns: IColumnData[] = [];
  const [showForm, setShowForm] = useState(false);
  const [entityAction, setEntityAction] = useState({} as ActionForm);

  const { id } = useParams<QuizParams>();
  const navigate = useNavigate();

  const handleDelete = (event: SyntheticEvent<HTMLSpanElement>) => {
    event.stopPropagation();
    // TODO
    console.log('delete column');
  };

  const handleCreate = () => {
    setEntityAction(ACTION.CREATE('column', { boardId: id }));
    setShowForm(true);
  };

  const handleGoBack = (event: SyntheticEvent<HTMLButtonElement>) => {
    event.preventDefault();
    navigate(-1);
  };

  return (
    <section className={style.boardContainer}>
      <div className={style.boardHeader}>
        <h3>Test crete board #1</h3>
        <span>
          <button className={style.boardHederButton} onClick={handleGoBack}>
            Go back
          </button>
          <button className={style.boardHederButton} onClick={handleCreate}>
            Create column
          </button>
          {Boolean(columns.length) && (
            <button
              className={style.boardHederButton}
              onClick={() => console.log('click Add task')} // TODO
            >
              Add task
            </button>
          )}
        </span>
      </div>

      <div className={style.boardContent}>
        {columns.map((item: IColumnData) => (
          <div key={item.id} className={style.element}>
            {!showForm && <Column {...item} handleDelete={handleDelete} />}
            <Modal
              key={item.id}
              isVisible={showForm}
              title={`Create ${entityAction.type}`}
              content={<Form {...entityAction} />}
              onClose={() => setShowForm(false)}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
export default BoardPage;
