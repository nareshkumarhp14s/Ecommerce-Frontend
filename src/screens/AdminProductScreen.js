import React, {useState,} from 'react';

import {View,Text,TextInput,Pressable,StyleSheet,Alert,ScrollView,Image,} from 'react-native';

import {launchImageLibrary,} from 'react-native-image-picker';

import api from '../services/api';

const AdminProductScreen = () => {

const [title,setTitle] =
useState('');

const [description,setDescription,] = useState('');

const [price,setPrice] =useState('');

const [stock,setStock] =useState('');

const [category,setCategory,] = useState('');

const [image,setImage] =useState(null);

const [imageUrl,setImageUrl] =useState('');

const pickImage = async () => {

    const result = await launchImageLibrary({mediaType: 'photo',});

    if (!result.didCancel &&result.assets) {
    setImage(result.assets[0]);
    }

};

const uploadImage = async () => {

    if (!image) {
        return Alert.alert('Select image first');
    }

try {
const formData =new FormData();

formData.append('image',{uri: image.uri,type:image.type,name:image.fileName ||'product.jpg',});

const response = await api.post('/upload',formData,{headers: {'Content-Type':'multipart/form-data',},});
console.log('UPLOAD RESPONSE:',response.data);
setImageUrl(response.data.imageUrl);
console.log('IMAGE URL:',response.data.imageUrl);
Alert.alert('Success','Image Uploaded Successfully');

} catch (error) {

console.log(error);

Alert.alert(
'Upload Failed'
);

}

};

const createProduct =
async () => {

if (!imageUrl) {
return Alert.alert(
'Upload image first'
);
}

try {

await api.post(
'/products',
{
title,
description,
price:
Number(price),
stock:
Number(stock),
category,
image:
imageUrl,
}
);

Alert.alert(
'Success',
'Product Created Successfully'
);

setTitle('');
setDescription('');
setPrice('');
setStock('');
setCategory('');
setImage(null);
setImageUrl('');

} catch (error) {

console.log(error);

Alert.alert(
'Error',
error.response?.data?.message ||
'Product Creation Failed'
);

}

};

return (
<ScrollView style={styles.container} showsVerticalScrollIndicator={false}>

<Text
style={styles.heading}>
Admin Panel
</Text>

<TextInput
placeholder="Product Title"
value={title}
onChangeText={setTitle}
style={styles.input}
placeholderTextColor='#333'
/>

<TextInput
placeholder="Description"
placeholderTextColor='#333'
value={description}
onChangeText={
setDescription
}
multiline
style={[
styles.input,
{
height: 100,
},
]}
/>

<TextInput
placeholder="Price"
placeholderTextColor='#333'
value={price}
onChangeText={setPrice}
keyboardType="numeric"
style={styles.input}
/>

<TextInput
placeholder="Stock"
placeholderTextColor='#333'
value={stock}
onChangeText={setStock}
keyboardType="numeric"
style={styles.input}
/>

<TextInput
placeholder="Category"
placeholderTextColor='#333'
value={category}
onChangeText={
setCategory
}
style={styles.input}
/>

<Pressable
style={styles.button}
onPress={pickImage}>
<Text
style={
styles.buttonText
}>
Select Image
</Text>
</Pressable>

{image && (
<Image
source={{
uri: image.uri,
}}
style={{
width: 180,
height: 180,
alignSelf:
'center',
marginVertical: 20,
borderRadius: 12,
}}
/>
)}

<Pressable
style={styles.button}
onPress={
uploadImage
}>
<Text
style={
styles.buttonText
}>
Upload Image
</Text>
</Pressable>

<Pressable
style={[
styles.button,
{
opacity:
imageUrl ? 1 : 0.5,
},
]}
disabled={!imageUrl}
onPress={createProduct}
>
<Text
style={styles.buttonText}
>
Create Product
</Text>
</Pressable>

</ScrollView>
);
};

const styles =
StyleSheet.create({

container: {
flex: 1,
backgroundColor:
'#fff',
padding: 20,
},

heading: {
fontSize: 30,
fontWeight: 'bold',
marginBottom: 30,
color: '#000',
},

input: {
borderWidth: 1,
borderColor:
'#d1d5db',
borderRadius: 10,
padding: 14,
marginBottom: 15,
color: '#000',
},

button: {
backgroundColor:
'#2563EB',
padding: 15,
borderRadius: 10,
alignItems:
'center',
marginTop: 10,
},

buttonText: {
color: '#fff',
fontSize: 18,
fontWeight: '600',
},

});

export default AdminProductScreen;