import axios from 'axios';

export const fetchStores = async (pageParam: number) => {
  const { data } = await axios(`/api/stores`, {
    params: {
      page: pageParam,
    },
  });

  return data;
};

export const fetchStoreDetail = async (id: string) => {
  const { data } = await axios(`/api/stores?id=${id}`);

  return data;
};
