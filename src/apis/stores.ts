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

export const fetchStoreDetail: (storeId: string) => Promise<StoreType> = async (
  storeId: string
) => {
  const { data } = await axios(`/api/stores?id=${storeId}`);

  return data;
};
