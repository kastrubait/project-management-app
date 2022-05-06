import style from './App.module.scss';
import Sticky from './modules/Header/Sticky';
import Header from './modules/Header/Header';
import Body from './modules/Body/Body';

const App = () => {
  return (
    <div className={style.App}>
      <Sticky top={60}>
        <Header />
      </Sticky>
      <Body />
    </div>
  );
};

export default App;
