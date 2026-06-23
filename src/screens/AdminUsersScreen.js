import React,{
useEffect,
useState,
} from 'react';

import {
FlatList,
View,
Text,
Pressable,
} from 'react-native';

import api from '../services/api';

const AdminUsersScreen = () => {

const [users,setUsers] =
useState([]);

const fetchUsers =
async () => {

const response =
await api.get(
'/auth/users'
);

setUsers(
response.data
);

};

useEffect(() => {
fetchUsers();
}, []);

const toggleRole =
async id => {

await api.put(
`/auth/users/${id}/role`
);

fetchUsers();

};

return (
<FlatList
data={users}
keyExtractor={item =>
item._id
}
renderItem={({item}) => (

<View
style={{
padding: 15,
borderBottomWidth: 1,
}}>

<Text>
{item.name}
</Text>

<Text>
{item.email}
</Text>

<Text>
Role:
{item.isAdmin
? ' Admin'
: ' User'}
</Text>

<Pressable
style={{
backgroundColor:
'#2563EB',
padding: 10,
marginTop: 10,
borderRadius: 8,
}}
onPress={() =>
toggleRole(
item._id
)
}>

<Text
style={{
color: '#fff',
textAlign:
'center',
}}>
Toggle Role
</Text>

</Pressable>

</View>

)}
/>
);

};

export default AdminUsersScreen;