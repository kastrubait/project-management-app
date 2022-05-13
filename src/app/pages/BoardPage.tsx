/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { SyntheticEvent, useRef, useState } from 'react';
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
  // const { columns } = MOCK_DATA; // TODO
  // const columns: IColumnData[] = [];
  const [columns, setColumns] = useState([...MOCK_DATA.columns]);
  const [showForm, setShowForm] = useState(false);
  const [entityAction, setEntityAction] = useState({} as ActionForm);

  const { id } = useParams<QuizParams>();

  const navigate = useNavigate();

  const dragItem = useRef() as React.MutableRefObject<number>;
  const dragOverItem = useRef() as React.MutableRefObject<number>;

  const dragStart = (event: any, position: any) => {
    dragItem.current = position;
    console.log(event.target.innerHTML);
  };

  const dragEnter = (event: any, position: any) => {
    dragOverItem.current = position;
    console.log(event.target.innerHTML);
  };

  const drop = (e: any) => {
    const copyListItems = [...columns];
    const dragItemContent = copyListItems[dragItem.current];
    copyListItems.splice(dragItem.current, 1);
    copyListItems.splice(dragOverItem.current, 0, dragItemContent);
    dragItem.current = -1;
    dragOverItem.current = -1;
    setColumns(copyListItems);
  };

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
        <h3>Test create board #1</h3>
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

      <ul className={style.boardContent}>
        {columns.map((item: IColumnData, index) => (
          <li
            key={item.id}
            className={style.element}
            onDragStart={(e) => dragStart(e, index)}
            onDragEnter={(e) => dragEnter(e, index)}
            onDragEnd={drop}
            onDragOver={(e) => e.preventDefault()}
            draggable
          >
            {!showForm && <Column {...item} handleDelete={handleDelete} />}
            <Modal
              key={item.id}
              isVisible={showForm}
              title={`Create ${entityAction.type}`}
              content={<Form {...entityAction} />}
              onClose={() => setShowForm(false)}
            />
          </li>
        ))}
      </ul>
    </section>
  );
}
export default BoardPage;
