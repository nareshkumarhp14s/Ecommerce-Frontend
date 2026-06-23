import React, {useContext,useState} from 'react';
import {View,Text,FlatList,Pressable,Alert,Linking} from 'react-native';
import api from '../services/api';
import {CartContext,} from '../context/CartContext';
import RazorpayCheckout from 'react-native-razorpay';



const CartScreen = ({navigation,}) => {
    

    const {cartItems,clearCart,increaseQuantity,decreaseQuantity,removeFromCart,} = useContext(CartContext);
    const [loading,setLoading] = useState(false);

    const total = cartItems.reduce((sum,item) =>sum +item.price *item.quantity,0);

    const placeOrder =
async address => {

try {

const totalAmount =
cartItems.reduce(
(total,item) =>
total +
item.price *
item.quantity,
0
);

const orderItems =
cartItems.map(item => ({
product:item._id,
title:item.title,
price:item.price,
quantity:item.quantity,
}));

const response =
await api.post(
'/orders',
{
items:orderItems,
totalAmount,
address,
}
);

Alert.alert(
'Success',
response.data.message
);

clearCart();

navigation.navigate(
'Orders'
);

} catch (error) {

console.log(error);

Alert.alert(
'Error',
'Order Failed'
);

}

};
const startPayment = async () => {

try {

setLoading(true);

const profile =await api.get('/auth/profile');

const address =profile.data.user?.address;

if (!address) {

Alert.alert(
'Address Required',
'Please add delivery address first',
[
{
text:'Cancel',
style:'cancel',
},
{
text:'Add Address',
onPress:() =>
navigation.navigate(
'Address'
),
},
]
);

setLoading(false);

return;
}

const totalAmount =
cartItems.reduce(
(total,item) =>
total +
item.price *
item.quantity,
0
);

const response = await api.post('/payment/create-order',{amount:totalAmount,});

const options = {

description:'Order Payment',

currency:'INR',


key:'rzp_test_T4eXrNKzht06Km',

amount:
response.data.amount,

order_id:
response.data.id,

name:
'My Ecommerce App',

prefill:{
email:
profile.data.user.email,
},

theme:{
color:'#2563EB',
},

};
console.log('RAZORPAY ORDER:',response.data);

RazorpayCheckout.open(options)

.then(async payment => {

console.log('PAYMENT:',payment);

const verify = await api.post('/payment/verify',{
razorpay_order_id:
payment.razorpay_order_id,

razorpay_payment_id:
payment.razorpay_payment_id,

razorpay_signature:
payment.razorpay_signature,
}
);

if (
verify.data.success
) {

await placeOrder(
address
);

}

})

.catch(error => {

console.log(
'RAZORPAY ERROR'
);

console.log(
error
);

Alert.alert(
'Payment Failed'
);

});


} finally {

setLoading(false);

}

};
return ( <View style={{flex:1}}>

{/* Your FlatList code here */}

<FlatList
data={cartItems}
keyExtractor={item =>
item._id
}
renderItem={({
item,
}) => (
<View style={{ padding: 15, borderBottomWidth: 1,}}>
<Text style={{ fontSize: 18,fontWeight: '600',}}>
{item.title} </Text>
<Text>
₹ {item.price}
</Text>
<Text>
Qty: {item.quantity}
</Text>
<View style={{ flexDirection: 'row', alignItems: 'center',marginTop: 10,}}>

<Pressable
onPress={() =>
decreaseQuantity(
item._id
)
}>
<Text
style={{
fontSize: 24,
paddingHorizontal: 15,
}}>
➖
</Text>
</Pressable>


<Text
style={{
fontSize: 18,
}}>
{item.quantity}
</Text>

<Pressable
onPress={() =>
increaseQuantity(
item._id
)
}>
<Text
style={{
fontSize: 24,
paddingHorizontal: 15,
}}>
➕
</Text>
</Pressable>
<Pressable
onPress={() =>
removeFromCart(
item._id
)
}
style={{
backgroundColor:
'#EF4444',
padding: 10,
borderRadius: 8,
marginTop: 10,
}}>

<Text
style={{
color: '#fff',
textAlign: 'center',
fontWeight: 'bold',
}}>
Remove

</Text>

</Pressable>
</View>


<Text>
Subtotal:
₹{' '}
{item.price *
item.quantity}
</Text>
</View>
)}
/>

<View
style={{
padding: 15,
borderTopWidth: 1,
}}>

<Text
style={{
fontSize: 22,
fontWeight: 'bold',
}}>
Total: ₹ {total} </Text>

<Pressable style={{backgroundColor:loading? '#94A3B8': '#16A34A',padding:15,borderRadius:10,marginTop:15,}}disabled={loading}onPress={startPayment}>
    <Text style={{color:'#fff',textAlign:'center',fontWeight:'bold',}}>
        {loading? 'Processing...': 'Place Order'}
    </Text>
</Pressable>

</View>

</View>
);

};

export default CartScreen;


