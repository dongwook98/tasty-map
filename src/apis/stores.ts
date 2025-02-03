import axios from 'axios';

import { StoreType } from '@/interface';

interface searchParamsType {
  q?: string;
  district?: string;
}

export const fetchStores = async (
  pageParam: number,
  searchParams?: searchParamsType
) => {
  const { data } = await axios(`/api/stores`, {
    params: {
      limit: 10,
      page: pageParam,
      ...searchParams,
    },
  });

  return data;
};

export const fetchStoreDetail: (storeId: number) => Promise<StoreType> = async (
  storeId
) => {
  const { data } = await axios(`/api/stores?id=${storeId}`);

  return data;
};

export const createStore = async (data: StoreType) => {
  const result = await axios.post('/api/stores', data);

  return result;
};

export const updateStore = async (data: StoreType) => {
  const result = await axios.put('/api/stores', data);

  return result;
};

export const deleteStore = async (id: string) => {
  const result = await axios.delete(`/api/stores?id=${id}`);

  return result;
};
