import React, {
useContext,
} from 'react';

import {
FlatList,
View,
Text,
} from 'react-native';

import {
WishlistContext,
} from '../context/WishlistContext';

const WishlistScreen = () => {
const {
wishlistItems,
} = useContext(
WishlistContext
);

return (
<FlatList
data={wishlistItems}
keyExtractor={item =>
item._id
}
renderItem={({
item,
}) => (
<View
style={{
padding: 15,
borderBottomWidth: 1,
}}
> <Text>
{item.title} </Text>


      <Text>
        ₹ {item.price}
      </Text>
    </View>
  )}
/>


);
};

export default WishlistScreen;
