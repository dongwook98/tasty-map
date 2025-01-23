import axios from 'axios';

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

export const fetchStoreDetail = async (id: string) => {
  const { data } = await axios(`/api/stores?id=${id}`);

  return data;
};
