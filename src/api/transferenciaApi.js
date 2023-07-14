import { obterTransferencias, obterTransferenciasPorPeriodo, obterTransferenciasPorOperador, obterTransferenciasPorPeriodoEOperador } from './service/transferenciaService';

export const handleSearch = (startDate, endDate, operatorName) => {
  if (!startDate && !endDate && !operatorName) {
    return obterTransferencias();
  } else if (startDate && endDate && !operatorName) {
    const dates = {
      dataInicio: startDate,
      dataFim: endDate,
    };
    return obterTransferenciasPorPeriodo(dates);
  } else if (!startDate && !endDate && operatorName) {
    const operadorRequest = {
      nomeOperador: operatorName,
    };
    return obterTransferenciasPorOperador(operadorRequest);
  } else if (startDate && endDate && operatorName) {
    const transferenciaRequest = {
        dataInicio: startDate,
        dataFim: endDate,
        nomeOperador: operatorName
    };
    console.log(transferenciaRequest)
    return obterTransferenciasPorPeriodoEOperador(transferenciaRequest);
  }
};

export const calcularSaldoTotal = (data) => {
  let saldoTotal = 0;

  data.forEach((transferencia) => {
    const { valor } = transferencia;
    saldoTotal += valor;
  });
  return saldoTotal;
};

export const calcularSaldoPeriodo = (data, startDate, endDate) => {
  let saldoPeriodo = 0;

  data.forEach((transferencia) => {
    const { valor, dataTransferencia } = transferencia;

    if (isDateInRange(dataTransferencia, startDate, endDate)) {
      saldoPeriodo += valor;
    }
  });
  return saldoPeriodo;
};

export const isDateInRange = (date, startDate, endDate) => {
  const transferenciaDate = new Date(date);
  const rangeStartDate = new Date(startDate);
  const rangeEndDate = new Date(endDate);

  return (
    transferenciaDate >= rangeStartDate && transferenciaDate <= rangeEndDate
  );
};
