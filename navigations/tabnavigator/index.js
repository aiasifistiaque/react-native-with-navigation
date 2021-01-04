import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ExploreNavigation } from '../stacknavigation';
import ProfileScreen from '../../pages/ProfilePage';
import ChatScreen from '../../pages/ChatPage';
import { Ionicons } from '@expo/vector-icons';
import { ChatNavigator } from '../stacknavigation/Basic';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
	return (
		<Tab.Navigator
			screenOptions={({ route }) => ({
				tabBarIcon: ({ focused, color = 'crimson', size }) => {
					let iconName;
					if (route.name === 'Explore') {
						iconName = focused ? 'ios-globe' : 'ios-globe';
					} else if (route.name === 'Chat') {
						iconName = focused ? 'ios-chatbubbles' : 'ios-chatbubbles';
					} else if (route.name === 'Profile') {
						iconName = focused ? 'ios-person' : 'ios-person';
					}
					return (
						<Ionicons
							name={iconName}
							size={size}
							color={color}
							style={{ color: color }}
						/>
					);
				},
			})}
			tabBarOptions={{
				activeTintColor: 'darkslateblue',
				inactiveTintColor: 'gray',
				//showLabel: false,
				style: { height: 40 },
			}}>
			<Tab.Screen name='Profile' component={ProfileScreen} />
			<Tab.Screen name='Chat' component={ChatNavigator} />
			<Tab.Screen name='Explore' component={ExploreNavigation} />
		</Tab.Navigator>
	);
}
