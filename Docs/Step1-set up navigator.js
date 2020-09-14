//Step 1 for Navigator
//Now, we need to wrap the whole app in NavigationContainer.
//Usually you'd do this in your entry file, such as index.js or App.js:
import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';

export default function App() {
	return (
		<NavigationContainer>{/* Rest of your app code */}</NavigationContainer>
	);
}
