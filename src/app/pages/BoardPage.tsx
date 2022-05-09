import { SyntheticEvent } from 'react';
import { MOCK_COLUMN } from '../mockData/data';
import { Column } from '../modules/Board/Column/Column';
import style from './BoardPage.module.scss';

function BoardPage() {
  const handleDelete = (event: SyntheticEvent<HTMLSpanElement>) => {
    event.stopPropagation();
    // TODO
    console.log('delete column');
  };
  return (
    <div className={style.columnContainer}>
      welcome board
      <br />
      <Column {...MOCK_COLUMN} handleDelete={handleDelete} />
      <Column {...MOCK_COLUMN} handleDelete={handleDelete} />
      <Column {...MOCK_COLUMN} handleDelete={handleDelete} />
      <Column {...MOCK_COLUMN} handleDelete={handleDelete} />
    </div>
  );
}
export default BoardPage;
