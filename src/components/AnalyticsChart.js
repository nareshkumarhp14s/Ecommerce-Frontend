import React from 'react';

import {
Dimensions,
} from 'react-native';

import {
BarChart,
} from 'react-native-chart-kit';

const AnalyticsChart = ({
stats,
}) => {

return (

<BarChart
data={{
labels:[
'Users',
'Products',
'Orders',
],
datasets:[
{
data:[
stats?.totalUsers || 0,
stats?.totalProducts || 0,
stats?.totalOrders || 0,
],
},
],
}}
width={
Dimensions
.get('window')
.width - 40
}
height={220}
yAxisLabel=""
chartConfig={{
backgroundGradientFrom:'#fff',
backgroundGradientTo:'#fff',
decimalPlaces:0,
color:
opacity =>
`rgba(37,99,235,${opacity})`,
}}
style={{
marginVertical:20,
borderRadius:16,
}}
/>

);

};

export default AnalyticsChart;