import React from 'react';

import {
View,
Text,
Pressable,
StyleSheet,
} from 'react-native';

import {
useContext,
} from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';

import {
AuthContext,
} from '../context/AuthContext';
import {
useEffect,
useState,
} from 'react';

import api from '../services/api';
import AnalyticsChart from '../components/AnalyticsChart';

const AdminDashboardScreen = ({
navigation,
}) => {
    const { logout } =
useContext(AuthContext);
const [stats,setStats] =
useState(null);

const handleLogout =
async () => {

await AsyncStorage.removeItem(
'token'
);

await AsyncStorage.removeItem(
'user'
);

logout();

navigation.replace(
'Login'
);

};
const fetchAnalytics =
async () => {

try {

const response =
await api.get(
'/analytics'
);

setStats(
response.data
);

} catch (error) {

console.log(error);

}

};

useEffect(() => {
fetchAnalytics();
}, []);

return (
<View style={styles.container}>

<Text style={styles.heading}>
Admin Dashboard
</Text>

<Pressable
style={styles.card}
onPress={() =>
navigation.navigate(
'AdminProducts'
)
}>
<Text style={styles.cardText}>
📦 Manage Products
</Text>
</Pressable>

<Pressable
style={styles.card}
onPress={() =>
navigation.navigate(
'AdminOrders'
)
}>
<Text style={styles.cardText}>
🛒 Manage Orders
</Text>
</Pressable>

<Pressable
style={styles.card}
onPress={() =>
navigation.navigate(
'AdminUsers'
)
}>
<Text style={styles.cardText}>
👥 Manage Users
</Text>
</Pressable>

<Pressable
style={styles.card}
onPress={() =>
navigation.navigate(
'AdminProductList'
)
}>
    

<Text
style={styles.cardText}>
📦 Product List
</Text>

</Pressable>
<View
style={styles.statsRow}
>

<View
style={styles.statCard}
>
<Text
style={styles.statValue}
>
{stats?.totalUsers || 0}
</Text>

<Text>
Users
</Text>
</View>

<View
style={styles.statCard}
>
<Text
style={styles.statValue}
>
{stats?.totalProducts || 0}
</Text>

<Text>
Products
</Text>
</View>

</View>

<View
style={styles.statsRow}
>

<View
style={styles.statCard}
>
<Text
style={styles.statValue}
>
{stats?.totalOrders || 0}
</Text>

<Text>
Orders
</Text>
</View>

<View
style={styles.statCard}
>
<Text
style={styles.statValue}
>
₹ {stats?.revenue || 0}
</Text>

<Text>
Revenue
</Text>
</View>

</View>

<AnalyticsChart
stats={stats}
/>

<Pressable
style={styles.logoutButton}
onPress={handleLogout}
>

<Text
style={styles.logoutText}>
Logout
</Text>

</Pressable>


</View>
);
};

const styles =
StyleSheet.create({

container: {
flex: 1,
padding: 20,
backgroundColor:
'#F8FAFC',
},

heading: {
fontSize: 30,
fontWeight: 'bold',
marginBottom: 30,
},

card: {
backgroundColor:
'#2563EB',
padding: 20,
borderRadius: 15,
marginBottom: 15,
},

cardText: {
color: '#fff',
fontSize: 18,
fontWeight: '600',
},
logoutButton: {
backgroundColor:
'#EF4444',
padding: 15,
borderRadius: 12,
marginTop: 20,
},

logoutText: {
color: '#fff',
fontSize: 18,
fontWeight: '600',
textAlign: 'center',
},
statsRow: {
flexDirection:'row',
justifyContent:
'space-between',
marginBottom:15,
},

statCard: {
backgroundColor:'#fff',
width:'48%',
padding:20,
borderRadius:15,
alignItems:'center',
elevation:4,
},

statValue: {
fontSize:24,
fontWeight:'bold',
color:'#2563EB',
},

});

export default AdminDashboardScreen;