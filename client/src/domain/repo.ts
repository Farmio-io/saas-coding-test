import axiosInstance from "./axios";
import { IUpdatePricing } from "./interface";

const updatePricing = async (body: IUpdatePricing) => {
  const path = "/pricing";

  const result = await axiosInstance().post(path, body);
  return result.data.data;
};

const getHistoryById = async (id: string) => {
  const path = `/history/${id}`;

  const result = await axiosInstance().get(path);
  return result.data.data;
};

const repo = {
  updatePricing,
  getHistoryById,
};

export default repo;
