import logo from './logo.svg';
import style from './App.module.scss';
import Table from './modules/Header/Table';
import { HeaderTable, tableData } from './modules/Header/Data';

const App = () => {
  return (
    <div className={style.App}>
      <Table headers={HeaderTable} data={tableData} />
      <header className={style.AppHeader}>
        <img src={logo} className={style.AppLogo} alt="logo" />
      </header>
    </div>
  );
};

export default App;
