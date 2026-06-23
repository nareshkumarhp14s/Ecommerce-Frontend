import React from 'react';

import {
createNativeStackNavigator,
} from '@react-navigation/native-stack';

import AdminDashboardScreen from '../screens/AdminDashboardScreen';
import AdminProductScreen from '../screens/AdminProductScreen';
import AdminOrdersScreen from '../screens/AdminOrdersScreen';
import AdminUsersScreen from '../screens/AdminUsersScreen';
import AdminProductListScreen from '../screens/AdminProductListScreen';
import EditProductScreen from '../screens/EditProductScreen';

const Stack =
createNativeStackNavigator();

const AdminNavigator = () => {

return (
<Stack.Navigator>

<Stack.Screen
name="Dashboard"
component={
AdminDashboardScreen
}
/>

<Stack.Screen
name="AdminProducts"
component={
AdminProductScreen
}
/>
<Stack.Screen
  name="AdminOrders"
  component={AdminOrdersScreen}
/>
<Stack.Screen
name="AdminUsers"
component={AdminUsersScreen}
/>
<Stack.Screen
name="AdminProductList"
component={
AdminProductListScreen
}
/>
<Stack.Screen
name="EditProduct"
component={
EditProductScreen
}
/>

</Stack.Navigator>
);

};

export default AdminNavigator;