import { BoardInfo } from './BoardInfo/BoardInfo';
import { IBoardPreview } from '../../Interfaces/BoardPreview';
import { MOCK_DATA } from '../../mockData/data';
import style from './Body.module.scss';

const { boards } = MOCK_DATA;

const Body = () => (
  <section className={style.cardsConteiner}>
    {boards.map((item: IBoardPreview) => (
      <div key={item.id} className={style.element}>
        <BoardInfo {...item} />
      </div>
    ))}
  </section>
);

export default Body;
