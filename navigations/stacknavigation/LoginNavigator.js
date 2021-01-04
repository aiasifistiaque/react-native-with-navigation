import React from 'react';
import 'react-native-gesture-handler';
import InitialScreen from '../../pages/InitialScreen';
import { createStackNavigator } from '@react-navigation/stack';
import LoginPage from '../../pages/LoginPage';
import Signup from '../../pages/SignupPage';

const Stack = createStackNavigator();

export default function LoginNavigator() {
	return (
		<Stack.Navigator>
			<Stack.Screen name='Initial' component={InitialScreen} />
			<Stack.Screen name='Login' component={LoginPage} />
			<Stack.Screen name='Signup' component={Signup} />
		</Stack.Navigator>
	);
}
