import style from './App.module.scss';
import Sticky from './app/modules/Header/Sticky';
import Header from './app/modules/Header/Header';
import Body from './app/modules/Body/Body';
import AppRouter from './app/Api/AppRouter';
import { BrowserRouter } from 'react-router-dom';

const App = () => {
  return (
    <div className={style.App}>
      <BrowserRouter>
        <Sticky top={60}>
          <Header />
        </Sticky>
        <AppRouter />
      </BrowserRouter>
    </div>
  );
};

export default App;
