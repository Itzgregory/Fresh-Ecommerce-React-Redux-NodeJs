import axiosInstance from '../../Utils/axios/axiosInstance';
import handleError from '../../Utils/HandleErrors/ErrorHandler';

export const listProducts = async (id) => {
  try {
    const url = id ? `/products/category/${id}` : `/products/list/`;
    const query = await axiosInstance.get(url);
    return query.data;
  } catch (error) {
    handleError(error);
  }
};

export const listById = async (id) => {
  try {
    const url = `/products/detail/${id}`;
    const query = await axiosInstance.get(url);
    return query.data;
  } catch (error) {
    handleError(error);
  }
};

export const addProduct = async (data) => {
  try {
    const url = `/products/upload`;
    const query = await axiosInstance.post(url, data);
    return query.data;
  } catch (error) {
    handleError(error);
  }
};

export const deleteProduct = async (id) => {
  try {
    const url = `/products/delete/${id}`;
    const query = await axiosInstance.delete(url);
    return query.data;
  } catch (error) {
    handleError(error);
  }
};

export const updateProduct = async (data, id) => {
  try {
    const url = `/products/update/${id}`;
    const query = await axiosInstance.put(url, data);
    return query.data;
  } catch (error) {
    handleError(error);
  }
};
