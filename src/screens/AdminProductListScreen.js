import React,{
useEffect,
useState,
} from 'react';

import {
View,
Text,
FlatList,
Pressable,
Alert,
} from 'react-native';

import api from '../services/api';

const AdminProductListScreen = ({
navigation,
}) => {

const [products,
setProducts] =
useState([]);

const fetchProducts =
async () => {

try {

const response =
await api.get(
'/products'
);

setProducts(
response.data
);

} catch (error) {

console.log(error);

}

};

useEffect(() => {
fetchProducts();
}, []);

const deleteProduct =
async id => {

Alert.alert(
'Delete Product',
'Are you sure?',
[
{
text:'Cancel',
},
{
text:'Delete',
onPress:
async () => {

try {

await api.delete(
`/products/${id}`
);

fetchProducts();

Alert.alert(
'Success',
'Product Deleted'
);

} catch (error) {

console.log(error);

}

},
},
]
);

};

return (
<FlatList
data={products}
keyExtractor={item =>
item._id
}
renderItem={({item}) => (

<View
style={{
padding:15,
borderBottomWidth:1,
}}>

<Text>
{item.title}
</Text>

<Text>
₹ {item.price}
</Text>

<Text>
Stock:
{item.stock}
</Text>

<Pressable
style={{
backgroundColor:
'#2563EB',
padding:10,
borderRadius:8,
marginTop:10,
}}
onPress={() =>
navigation.navigate(
'EditProduct',
{
product:item,
}
)
}>

<Text
style={{
color:'#fff',
textAlign:
'center',
}}>
Edit
</Text>

</Pressable>

<Pressable
style={{
backgroundColor:
'#EF4444',
padding:10,
borderRadius:8,
marginTop:10,
}}
onPress={() =>
deleteProduct(
item._id
)
}>

<Text
style={{
color:'#fff',
textAlign:
'center',
}}>
Delete
</Text>

</Pressable>

</View>

)}
/>
);

};

export default AdminProductListScreen;