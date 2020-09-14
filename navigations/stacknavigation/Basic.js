import React from 'react';
import 'react-native-gesture-handler';
import HomeScreen from '../../pages/HomePage';
import AboutScreen from '../../pages/AboutPage';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

export function BasicStackNavigator() {
	return (
		<Stack.Navigator>
			<Stack.Screen name='Home' component={HomeScreen} />
			<Stack.Screen name='About' component={AboutScreen} />
		</Stack.Navigator>
	);
}
