import React from 'react';
import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import TabNavigator from '../tabnavigator';

const Stack = createStackNavigator();

export default function RootStackNavigator() {
	return (
		<Stack.Navigator>
			<TabNavigator />
		</Stack.Navigator>
	);
}
