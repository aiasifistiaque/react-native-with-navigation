import React, { useEffect, useState } from 'react';
import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import TabNavigator from '../tabnavigator';
import LoginNavigator from './LoginNavigator';
import { useLogged } from '../../hooks';
import Conversation from '../../pages/Conversation';
const Stack = createStackNavigator();

export default function RootStackNavigator() {
	return useLogged() ? <HomeStack /> : <LoginStack />;
}

const LoginStack = () => {
	return (
		<Stack.Navigator>
			<Stack.Screen name='Login' component={LoginNavigator} />
		</Stack.Navigator>
	);
};

const HomeStack = () => {
	return (
		<Stack.Navigator>
			<Stack.Screen name='HomeTabs' component={TabNavigator} />
			<Stack.Screen name='Conversation' component={Conversation} />
		</Stack.Navigator>
	);
};
