import React, { useState } from 'react';
import './TablePagination.css';

const TablePagination = ({data,startDate, endDate, saldoPeriodo,saldoTotal}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;
  const totalPages = Math.ceil(data.length / itemsPerPage);

  const handleClick = (page) => {
    setCurrentPage(page);
  };

  function checkType(item){
    if(item.tipo.toString().includes("TRANSF")){
        if(item.valor<0){
            return item.conta.nomeResponsavel;
        }else{
            return item.nomeOperadorTransacao;
        }
        
    }else{
        return item.conta.nomeResponsavel;
    }
  }

  const renderTableData = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentData = data.slice(startIndex, endIndex);

    return currentData.map((item) => (
      <tr key={item.id}>
        <td>{item.dataTransferencia.substring(0, 10)}</td>
        <td>{item.valor}</td>
        <td>{item.tipo}</td>
        <td>{checkType(item)}</td>
      </tr>
    ));
  };

  const renderPagination = () => {
    const pages = [];

    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <button
          key={i}
          className={`buttonPag ${i === currentPage ? 'active' : 'inactive'}`}          
          onClick={() => handleClick(i)}
        >
          {i}
        </button>
      );
    }

    return (
      <div className="pagination">
        <div className="buttonPages">
        {pages}
        </div>
      </div>
    );
  };

  return (
    <div>
        {!startDate && !endDate &&<p>Saldo total: {saldoTotal.toFixed(2)}</p>}
        {startDate && endDate && <p>Saldo no período: {saldoPeriodo.toFixed(2)}</p>}
      <table>
        <thead>
          <tr>
            <th className="tableHeader ">Data de Transferência</th>
            <th className="tableHeader ">Valor</th>
            <th className="tableHeader ">Tipo</th>
            <th className="tableHeader "> Nome Operador Transacionado</th>
          </tr>
        </thead>
        <tbody>
          {renderTableData()}
        </tbody>
      </table>
      {renderPagination()}
    </div>
  );
};

export default TablePagination;
