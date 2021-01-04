import React from 'react';
import 'react-native-gesture-handler';
import HomeScreen from '../../pages/HomePage';
import AboutScreen from '../../pages/AboutPage';
import ExplorePage from '../../pages/ExplorePage';
import { createStackNavigator } from '@react-navigation/stack';
import Conversation from '../../pages/Conversation';
import ChatPage from '../../pages/ChatPage';

const Stack = createStackNavigator();

export function BasicStackNavigator() {
	return (
		<Stack.Navigator>
			<Stack.Screen name='Home' component={HomeScreen} />
			<Stack.Screen name='About' component={AboutScreen} />
		</Stack.Navigator>
	);
}

export function ExploreNavigation() {
	return (
		<Stack.Navigator>
			<Stack.Screen name='Explore' component={ExplorePage} />
		</Stack.Navigator>
	);
}

export function ChatNavigator() {
	return (
		<Stack.Navigator>
			<Stack.Screen name='Chat' component={ChatPage} />
		</Stack.Navigator>
	);
}
