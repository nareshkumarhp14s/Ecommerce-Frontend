import React,{
useState,
} from 'react';

import {
View,
Text,
TextInput,
Pressable,
Alert,
ScrollView,
StyleSheet,
} from 'react-native';

import api from '../services/api';

const EditProductScreen = ({
route,
navigation,
}) => {

const { product } =
route.params;

const [title,setTitle] =
useState(product.title);

const [description,
setDescription] =
useState(product.description);

const [price,setPrice] =
useState(
String(product.price)
);

const [stock,setStock] =
useState(
String(product.stock)
);

const [category,
setCategory] =
useState(
product.category
);

const updateProduct =
async () => {

try {

await api.put(
`/products/${product._id}`,
{
title,
description,
price:
Number(price),
stock:
Number(stock),
category,
}
);

Alert.alert(
'Success',
'Product Updated'
);

navigation.goBack();

} catch (error) {

console.log(error);

Alert.alert(
'Error',
'Update Failed'
);

}

};

return (
<ScrollView
style={styles.container}
>

<Text
style={styles.heading}>
Edit Product
</Text>

<TextInput
style={styles.input}
value={title}
onChangeText={
setTitle
}
placeholder="Title"
/>

<TextInput
style={styles.input}
value={description}
onChangeText={
setDescription
}
placeholder="Description"
/>

<TextInput
style={styles.input}
value={price}
onChangeText={
setPrice
}
keyboardType="numeric"
placeholder="Price"
/>

<TextInput
style={styles.input}
value={stock}
onChangeText={
setStock
}
keyboardType="numeric"
placeholder="Stock"
/>

<TextInput
style={styles.input}
value={category}
onChangeText={
setCategory
}
placeholder="Category"
/>

<Pressable
style={styles.button}
onPress={
updateProduct
}>

<Text
style={styles.buttonText}>
Update Product
</Text>

</Pressable>

</ScrollView>
);

};

const styles =
StyleSheet.create({

container: {
flex: 1,
padding: 20,
backgroundColor:
'#fff',
},

heading: {
fontSize: 28,
fontWeight: 'bold',
marginBottom: 20,
},

input: {
borderWidth: 1,
borderColor:
'#d1d5db',
padding: 14,
borderRadius: 10,
marginBottom: 15,
},

button: {
backgroundColor:
'#2563EB',
padding: 15,
borderRadius: 10,
},

buttonText: {
color: '#fff',
fontWeight: '600',
textAlign: 'center',
},

});

export default EditProductScreen;