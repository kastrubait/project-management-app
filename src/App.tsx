import style from './App.module.scss';
import Sticky from './app/modules/Header/Sticky';
import Header from './app/modules/Header/Header';
import AppRouter from './app/Api/AppRouter';
import { BrowserRouter } from 'react-router-dom';
import Footer from './app/modules/Footer/Footer';

const App = () => {
  return (
    <div className={style.App}>
      <BrowserRouter>
        <Sticky>
          <Header />
        </Sticky>
        <AppRouter />
        <Footer />
      </BrowserRouter>
    </div>
  );
};

export default App;
