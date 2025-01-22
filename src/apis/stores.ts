import axios from 'axios';

export const fetchStores = async (pageParam: number) => {
  const { data } = await axios(`/api/stores`, {
    params: {
      page: pageParam,
    },
  });

  return data;
};
