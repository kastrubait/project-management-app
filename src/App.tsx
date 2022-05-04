import logo from './logo.svg';
import style from './App.module.scss';

const App = () => {
  return (
    <div className={style.App}>
      <header className={style.AppHeader}>
        <img src={logo} className={style.AppLogo} alt="logo" />
      </header>
    </div>
  );
};

export default App;
