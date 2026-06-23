import React, {
useEffect,
useState,
} from 'react';

import {
View,
Text,
FlatList,
Pressable,
StyleSheet,
ActivityIndicator,
Alert,
} from 'react-native';

import api from '../services/api';

const AdminOrdersScreen = () => {

const [orders,setOrders] =
useState([]);

const [loading,setLoading] =
useState(true);

const fetchOrders =
async () => {

try {

const response =
await api.get(
'/orders/admin'
);

setOrders(
response.data
);

} catch (error) {

console.log(error);

} finally {

setLoading(false);

}

};

useEffect(() => {
fetchOrders();
}, []);

const updateStatus =
async (
id,
status
) => {

try {

await api.put(
`/orders/${id}/status`,
{
status,
}
);

Alert.alert(
'Success',
'Status Updated'
);

fetchOrders();

} catch (error) {

console.log(error);

}

};

if (loading) {
return (
<View style={{flex: 1,justifyContent:'center',alignItems:'center',}}> 
    <ActivityIndicator size="large"/> 
    </View>
);
}

return (
<FlatList
data={orders}
keyExtractor={item =>
item._id
}
renderItem={({item}) => (

<View
style={styles.card}>

<Text
style={styles.name}>
{item.user?.name} </Text>

<Text>
{item.user?.email}
</Text>

<Text>
₹ {item.totalAmount}
</Text>

<Text>
📍 {item.address}
</Text>

<Text
style={styles.status}>
{item.status} </Text>

<Pressable
style={styles.button}
onPress={() =>
updateStatus(
item._id,
'Processing'
)
}> <Text
style={styles.buttonText}>
Processing </Text> </Pressable>

<Pressable
style={styles.button}
onPress={() =>
updateStatus(
item._id,
'Shipped'
)
}> <Text
style={styles.buttonText}>
Shipped </Text> </Pressable>

<Pressable
style={styles.button}
onPress={() =>
updateStatus(
item._id,
'Delivered'
)
}> <Text
style={styles.buttonText}>
Delivered </Text> </Pressable>

</View>

)}
/>
);

};

const styles =
StyleSheet.create({

card: {
backgroundColor:
'#fff',
padding: 15,
margin: 10,
borderRadius: 12,
elevation: 3,
},

name: {
fontSize: 18,
fontWeight: 'bold',
},

status: {
marginTop: 10,
fontWeight: 'bold',
color: '#2563EB',
},

button: {
backgroundColor:
'#2563EB',
padding: 10,
borderRadius: 8,
marginTop: 10,
},

buttonText: {
color: '#fff',
textAlign:
'center',
},

});

export default AdminOrdersScreen;
