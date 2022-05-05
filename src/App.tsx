import logo from './logo.svg';
import style from './App.module.scss';
import Table from './modules/Header/Table';
import { HeaderTable, tableData } from './modules/Header/Data';

const App = () => {
  return (
    <div className={style.App}>
      <Table headers={HeaderTable} data={tableData} />
      <img src={logo} className={style.AppLogo} alt="logo" />
    </div>
  );
};

export default App;
