import axios from 'axios';

export const getData = async (url: string, count: number, pageIndex: number): Promise<any> => {
  url = `${url}/${count}/${pageIndex}`;

  return axios.get(url);
};
