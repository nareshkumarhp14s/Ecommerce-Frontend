import React from 'react';
import {
ScrollView,
View,
Text,
StyleSheet,
} from 'react-native';

const BannerSlider = () => {
const banners = [
{
id: 1,
title: 'Summer Sale 🔥',
},
{
id: 2,
title: 'Electronics Offer 📱',
},
{
id: 3,
title: 'Fashion Sale 👕',
},
];

return ( <ScrollView
   horizontal
   showsHorizontalScrollIndicator={false}
   style={styles.container}
 >
{banners.map(banner => ( <View
       key={banner.id}
       style={styles.banner}
     > <Text style={styles.text}>
{banner.title} </Text> </View>
))} </ScrollView>
);
};

const styles = StyleSheet.create({
container: {
marginTop: 20,
paddingHorizontal: 20,
},

banner: {
width: 300,
height: 140,
backgroundColor: '#2563EB',
borderRadius: 20,
justifyContent: 'center',
alignItems: 'center',
marginRight: 15,
},

text: {
color: '#fff',
fontSize: 22,
fontWeight: 'bold',
},
});

export default BannerSlider;
