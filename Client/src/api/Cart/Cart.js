import axios from 'axios';
axios.defaults.withCredentials = true
const URL_BASE = process.env.NODE_ENV === 'production' ? process.env.REACT_APP_API_URL_PROD : process.env.REACT_APP_API_URL_DEV

export const addProductToCart = async (data) => {
    const product = {
        ...data.product, 
        count: data.count
    }   
   const url = `${URL_BASE}/cart/save`;
    const query = await axios.post(url, product)
    return query.data  
}

export const listProductCart = async () => {  
    const url = `${URL_BASE}/cart/list`
    const query = await axios.get(url)
    return query.data
}

export const updateCart = async(data) =>{ 
   const url = `${URL_BASE}/cart/update/`
    const query = await axios.put(url, data);
    return query.data
}

export const deleteProductCart = async(product) =>{    
    const url = `${URL_BASE}/cart/delete/${product._id}`
    const query = await axios.delete(url,  { data: product });  
     return query.data
 }

