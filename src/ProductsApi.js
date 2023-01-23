import axios from 'axios'
import { useState,useEffect,useCallback, useMemo } from 'react'
import { toast } from 'react-toastify'

const url = `https://dummyjson.com`

// custom hook
function useProductsApi() {
    const [product,setProduct] = useState([])
    const [cart,setCart] = useState([])

    // states to calculate of cart subtotal, total,tax,delivery charges
    const [subTotal,setSubTotal] = useState(0)
    const [discount,setDiscount] = useState(0)
    const [gst,setGst] = useState(0)
    const [dc,setDc] = useState(0)



    // using callback hook

//     const readProducts = async () =>{
//         const op = await axios.get(`${url}/products`)
//         console.log(op.data);
//             setProduct(op.data)
//     }

//     const initValues = useCallback(() => {
//         readProducts()
//     },[])

//     useEffect(() => {
//         initValues()
//     },[initValues])
//   return {
//     products: [product,setProduct]
//   }


        // using useMemo hook
    const readProducts = async () => {
        const out = await axios.get(`${url}/products`)
        setProduct(out.data.products)
    }

    const initValue = useMemo(() => (
        {value: [product,setProduct]}
    ))

    useEffect(() => {
        readProducts()
    },[])


    // add product to cart
    const addToCart = async (data) => {
        // console.log('cart = ',product)

    //product exist in cart or not
    const check = cart.every(item => {
        return item.id !== data.id;
    });

        if(check) {
            toast.success('product added to cart');
            setCart([...cart,{...data, quantity:1}])
        } else {
            toast.warning('Product already in cart.')
        }
    }

    return {
        products:initValue,
        cart: [cart,setCart],
        addToCart: addToCart,
        subTotal: [subTotal,setSubTotal],
        gst:[gst,setGst],
        dc:[dc,setDc],
        discount:[discount,setDiscount]
    }
}

export default useProductsApi
