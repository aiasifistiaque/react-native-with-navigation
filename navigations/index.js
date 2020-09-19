import React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import RootStackNavigator from './stacknavigation/RootStackNavigator';

export default function Navigator() {
	return (
		<NavigationContainer>
			<RootStackNavigator />
		</NavigationContainer>
	);
}
