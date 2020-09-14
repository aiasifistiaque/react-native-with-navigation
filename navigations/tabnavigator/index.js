import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BasicStackNavigator } from '../stacknavigation';
import AboutScreen from '../../pages/AboutPage';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
	return (
		<Tab.Navigator>
			<Tab.Screen name='Home' component={BasicStackNavigator} />
			<Tab.Screen name='About' component={AboutScreen} />
		</Tab.Navigator>
	);
}
