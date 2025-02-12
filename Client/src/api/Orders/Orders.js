import axios from 'axios';
axios.defaults.withCredentials = true
const URL_BASE = process.env.NODE_ENV === 'production' ? process.env.REACT_APP_API_URL_PROD : process.env.REACT_APP_API_URL_DEV

export const saveOrder = async (data) => {    
    const url = `${URL_BASE}/orders/save`;
    const query = await axios.post(url, data)
    return query.data.acknowledged
}

export const listAllOrders = async () => {    
    const url = `${URL_BASE}/orders/list`;
    const query = await axios.get(url)
    return query.data
}

export const listOrdersById = async(id) => {
    const url = `${URL_BASE}/orders/list/${id}`
    const query = await axios.get(url)
    return query.data
}

export const updateOrder = async(data) => {  
    const url = `${URL_BASE}/orders/update/${data.id}`
    const query = await axios.put(url, {status:data.status})
    return query.data
}

export const deleteOrders = async() => {
    const url = `${URL_BASE}/orders/deleteall`
    await axios.delete(url)

}

export const deleteOrder = async(id) => {
    const url = `${URL_BASE}/orders/delete/${id}`
    await axios.delete(url)
}

