import React, {
  useEffect,
  useState,
} from 'react';

import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,Pressable,Alert,Linking
} from 'react-native';

import api from '../services/api';

const OrdersScreen = () => {
  const [orders, setOrders] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const fetchOrders =
    async () => {
      try {
        const response =
          await api.get(
            '/orders/my-orders'
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

  if (
  !loading &&
  orders.length === 0
) {
  return (
    <View
      style={{
        flex: 1,
        justifyContent:
          'center',
        alignItems:
          'center',
      }}>
      <Text>
        No Orders Found
      </Text>
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
style={{
backgroundColor: '#fff',
padding: 15,
margin: 10,
borderRadius: 12,
elevation: 3,
}}>
<Text
style={{
fontSize: 18,
fontWeight: 'bold',
}}>
📦 Order </Text>


<Text
  style={{
    marginTop: 10,
  }}>
  ID:
  {item._id.slice(-6)}
</Text>

<Text
  style={{
    fontSize: 20,
    color: '#2563EB',
    marginTop: 10,
  }}>
  ₹ {item.totalAmount}
</Text>

<Text
  style={{
    marginTop: 5,
  }}>
  Items:
  {item.items.length}
</Text>

<Text
  style={{
    color: '#F59E0B',
    marginTop: 10,
    fontWeight: 'bold',
  }}>
  {item.status}
</Text>
<Text>
Status:
{item.status}
</Text>
<Pressable
style={{
backgroundColor:'#2563EB',
padding:10,
borderRadius:8,
marginTop:10,
}}
onPress={async () => {

try {

await Linking.openURL(
`http://10.125.92.50:5000/api/invoice/${item._id}`
);

} catch (error) {

Alert.alert(
'Error',
'Unable to open invoice'
);

}

}}
>

<Text
style={{
color:'#fff',
textAlign:'center',
fontWeight:'bold',
}}>
Download Invoice
</Text>

</Pressable>
<Text
style={{
color:
item.status ===
'Delivered'
? 'green'
: item.status ===
'Shipped'
? 'orange'
: 'red',
}}>
{item.status}
</Text>
</View>)}
/>);};

const styles =
  StyleSheet.create({
    loader: {
      flex: 1,
      justifyContent:
        'center',
      alignItems:
        'center',
    },

    card: {
      backgroundColor:
        '#fff',
      padding: 15,
      margin: 10,
      borderRadius: 12,
      elevation: 3,
    },

    title: {
      fontWeight: 'bold',
      marginBottom: 10,
    },

    amount: {
      fontSize: 18,
      color: '#2563EB',
      marginTop: 10,
    },

    status: {
      color: '#16A34A',
      marginTop: 5,
      fontWeight: '600',
    },
  });

export default OrdersScreen;