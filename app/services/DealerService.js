import api from './api';

const DEALER_BASE = '/dealer';

const DealerService = {
  async list(params = {}) {
    const { data } = await api.get(DEALER_BASE, { params });
    return data;
  },

  async getById(id) {
    const { data } = await api.get(`${DEALER_BASE}/${id}`);
    return data;
  },
};

export default DealerService;
