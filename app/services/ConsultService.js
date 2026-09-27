import api from './api';

export const CONSULT_BASE = '/consult';

// Fonte unica do path, usada tanto nas requisicoes quanto nos diagnosticos da tela.
export const buildConsultPath = (type, value) => `${CONSULT_BASE}/${type}/${value}`;

const ConsultService = {
  async byId(id) {
    const { data } = await api.get(buildConsultPath('ID', id));
    return data;
  },

  // Busca pela PK do registro de manutencao (base diferente de `ID`, que e a
  // PK do registro de dados). Regressao: usar um ID de registro aqui devolve 404.
  async byMaintenanceId(maintenanceId) {
    const { data } = await api.get(buildConsultPath('MaintenanceID', maintenanceId));
    return data;
  },

  async byVinHash(vinHash) {
    const { data } = await api.get(buildConsultPath('VIN_Hash', vinHash));
    return data;
  },
};

export default ConsultService;
