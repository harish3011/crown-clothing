import { children, createContext, useEffect, useState } from "react";


const addCartItem=(cartItems,productsToAdd)=>
{
    const existingCartItem=cartItems.find((cartItem)=>
    {
          return cartItem.id===productsToAdd.id;
    }


    
)
    if(existingCartItem)
    {
        return cartItems.map((cartItem)=>
            cartItem.id===productsToAdd.id 
            ? {...cartItem,quantity:cartItem.quantity+1}
            :cartItem
        );
    }

    return [...cartItems,{...productsToAdd,quantity:1}]
}

const removeCartItem=(cartItems,cartItemToRemove)=>
{
    const existingCartItem=cartItems.find((cartItem)=>
        {
              return cartItem.id===cartItemToRemove.id;
        }
    )

    if(existingCartItem.quantity===1)
    {
        return cartItems.filter((cartItem)=>cartItem.id!==cartItemToRemove.id);
    }

    return cartItems.map((cartItem)=>
        cartItem.id===cartItemToRemove.id 
        ? {...cartItem,quantity:cartItem.quantity-1}
        :cartItem
    );


}

const clearCartItem = (cartItems, cartItemToClear) => {
    return cartItems.filter((cartItem) => cartItem.id !== cartItemToClear.id);
}

export const CartContext=createContext({
    isCartOpen:false,
    setIsCartOpen:()=>{ },
    cartItems:[],
    addItemToCart:()=>{ },
    cartCount:0,
    removeItemFromCart:()=>{ },
    clearItemFromCart: () => { },
    total: 0,
})


export const CartProvider=({children})=>
{
    const [isCartOpen,setIsCartOpen]=useState(false);
    const [cartItems,setCartItems]=useState([]);
    const [cartCount,setCartCount]=useState(0);
    const [cartTotal, setCartTotal] = useState(0);

    useEffect(()=>
    {
        const newCartCount=cartItems.reduce((total,cartItem)=>total+cartItem.quantity,0);
        setCartCount(newCartCount)
    },[cartItems])

    useEffect(() => {
        const newCartTotal = cartItems.reduce((total, cartItem) => total + cartItem.quantity * cartItem.price, 0);
        setCartTotal(newCartTotal)
    },[cartItems])

    const addItemToCart=(productsToAdd)=>
    {
        setCartItems(addCartItem(cartItems,productsToAdd))
    }

    const removeItemFromCart=(cartItemToRemove)=>
    {
        setCartItems(removeCartItem(cartItems,cartItemToRemove))
    }
    const clearItemFromCart = (cartItemToClear) => {
        setCartItems(clearCartItem(cartItems, cartItemToClear))
    }
    const value={cartItems,isCartOpen,setIsCartOpen,addItemToCart,cartCount,removeItemFromCart,clearItemFromCart, cartTotal}
    return(
        
        <CartContext.Provider value={value}>{children}</CartContext.Provider>
    )
}