import style from './App.module.scss';
import Sticky from './app/modules/Header/Sticky';
import Header from './app/modules/Header/Header';
import AppRouter from './app/Api/AppRouter';
import { BrowserRouter } from 'react-router-dom';
import Footer from './app/modules/Footer/Footer';
import { ErrorBoundary } from 'react-error-boundary';
import NotFoundPage from './app/pages/NotFoundPage';

const App = () => {
  return (
    <div className={style.App}>
      <BrowserRouter>
        <ErrorBoundary fallback={<NotFoundPage />}>
          <Sticky>
            <Header />
          </Sticky>
          <AppRouter />
          <Footer />
        </ErrorBoundary>
      </BrowserRouter>
    </div>
  );
};

export default App;
