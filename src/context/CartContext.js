import React,{
createContext,
useState,
useEffect,
} from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';

export const CartContext =
createContext();

export const CartProvider = ({
children,
}) => {

const [
cartItems,
setCartItems,
] = useState([]);

useEffect(() => {

loadCart();

}, []);

useEffect(() => {

AsyncStorage.setItem(
'cart',
JSON.stringify(
cartItems
)
);

}, [cartItems]);

const loadCart =
async () => {

try {

const data =
await AsyncStorage.getItem(
'cart'
);

if (data) {

setCartItems(
JSON.parse(data)
);

}

} catch (error) {

console.log(error);

}

};

const clearCart = () => {

setCartItems([]);

};

const addToCart = product => {

const exists =
cartItems.find(
item =>
item._id ===
product._id
);

if (exists) {

setCartItems(
cartItems.map(item =>
item._id ===
product._id
? {
...item,
quantity:
item.quantity + 1,
}
: item
)
);

} else {

setCartItems([
...cartItems,
{
...product,
quantity: 1,
},
]);

}

};

const removeFromCart =
productId => {

setCartItems(
cartItems.filter(
item =>
item._id !==
productId
)
);

};

const increaseQuantity =
id => {

setCartItems(
cartItems.map(item =>
item._id === id
? {
...item,
quantity:
item.quantity + 1,
}
: item
)
);

};

const decreaseQuantity =
id => {

setCartItems(
cartItems.map(item =>
item._id === id &&
item.quantity > 1
? {
...item,
quantity:
item.quantity - 1,
}
: item
)
);

};

return (

<CartContext.Provider
value={{
cartItems,
addToCart,
removeFromCart,
clearCart,
increaseQuantity,
decreaseQuantity,
}}

>

{children}

</CartContext.Provider>

);

};
