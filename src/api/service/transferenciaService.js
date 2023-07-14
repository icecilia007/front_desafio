import axios from 'axios';

const apiUrl = 'http://localhost:8080/api/v1/transferencias';

export const obterTransferencias = () => {
  return axios.get(apiUrl)
    .then(response => response.data)
    .catch(error => {
      console.error('Erro ao buscar transferências:', error);
      throw error;
    });
};

export const obterTransferenciasPorPeriodo = (dates) => {
  return axios.get(`${apiUrl}/periodo`, {
      params: dates
    })
    .then(response => response.data)
    .catch(error => {
      console.error('Erro ao buscar transferências por período:', error);
      throw error;
    });
};

export const obterTransferenciasPorOperador = (operadorRequest) => {
  return axios.get(`${apiUrl}/operador`, {
      params: operadorRequest
    })
    .then(response => response.data)
    .catch(error => {
      console.error('Erro ao buscar transferências por operador:', error);
      throw error;
    });
};

export const obterTransferenciasPorPeriodoEOperador = (transferenciaRequest) => {
  return axios.get(`${apiUrl}/periodo-operador`, {
      params: transferenciaRequest
    })
    .then(response => response.data)
    .catch(error => {
      console.error('Erro ao buscar transferências por período e operador:', error);
      throw error;
    });
};
