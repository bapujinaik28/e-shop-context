import React, { createContext } from 'react'
import useCategoryApi from './CategoryApi';
import useProductsApi from './ProductsApi';

export const ProductContext = createContext();

function ProductProvider(props) {

    const data = {
        categoryApi: useCategoryApi(),
        productsApi: useProductsApi()
    };
  return (
    <ProductContext.Provider value={data}>
        {props.children}
    </ProductContext.Provider>
  )
}

export default ProductProvider
