import './App.css';
import { useState, useEffect } from "react";
import {
  handleSearch,
  calcularSaldoTotal,
  calcularSaldoPeriodo,
} from './api/transferenciaApi';
import TablePagination from "./components/TablePagination";

function App() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [operatorName, setOperatorName] = useState("");
  const [saldoTotal, setSaldoTotal] = useState(0);
  const [saldoPeriodo, setSaldoPeriodo] = useState(0);
  const  [data, setData]= useState([]);

  const fetchData = async () => {
    try {
      const data = await handleSearch(startDate, endDate, operatorName);
      setSaldoTotal(calcularSaldoTotal(data));
      setSaldoPeriodo(calcularSaldoPeriodo(data, startDate, endDate));                                                                                                                                         setData(data);                                   
      
    } catch (error) {
      console.error('Erro ao buscar dados de transferência:', error);
    }
  };

  const handleSearchClick = () => {
    fetchData();
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <div className='centerAll'>
        <header>
          <div className='container'>
            <div className='bloco'>
              <label>Data de Início:</label>
              <input
                type="datetime-local"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
            <div className='bloco'>
              <label>Data de Fim:</label>
              <input
                type="datetime-local"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
            <div className='bloco'>
              <label>Nome operador Transacionado:</label>
              <input
                type="text"
                value={operatorName}
                onChange={(e) => setOperatorName(e.target.value)}
              />
            </div>
          </div>
          <div className='button'>
            <button className='sendButton' onClick={handleSearchClick}>Pesquisar</button>
          </div>
        </header>
        <footer>
          <div className='centerTable'>
            <div className='tabela'>
            <TablePagination
              data={data}
              startDate={startDate}
              endDate={endDate}
              saldoPeriodo={saldoPeriodo}
              saldoTotal={saldoTotal}
             />
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;
