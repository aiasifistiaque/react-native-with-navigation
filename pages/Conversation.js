import React, { useState } from 'react';
import { useKeyboardVisibility } from '../hooks';
import {
	View,
	Text,
	StyleSheet,
	Platform,
	Keyboard,
	KeyboardAvoidingView,
} from 'react-native';
import {
	TextInput,
	TouchableOpacity,
	ScrollView,
} from 'react-native-gesture-handler';
import { colors } from '../constants';
import * as firebase from 'firebase/app';
import 'firebase/firestore';

export default function Conversation({ route }) {
	const receiverId = route.params.id;
	const db = firebase.firestore();
	const user = firebase.auth().currentUser;
	const [message, setMessage] = useState('');
	const room = user.uid + receiverId;
	const [chats, setChats] = useState([]);
	const [loading, setLoading] = useState(true);
	const showKeyboard = useKeyboardVisibility();
	const sendMessage = () => {
		const msg = message.trim();
		db.collection('chats')
			.add({
				sender: user.uid,
				receiver: receiverId,
				message: msg,
				roomId: room,
				timestamp: firebase.firestore.FieldValue.serverTimestamp(),
			})
			.catch(function (error) {
				console.error('Error adding document: ', error);
			});
		setMessage('');
	};
	React.useEffect(() => {
		const room = user.uid + receiverId;
		const invRoom = receiverId + user.uid;
		const loadMessage = db
			.collection('chats')
			.where('roomId', 'in', [room, invRoom])
			.orderBy('timestamp', 'desc')
			.onSnapshot(querySnapshot => {
				setLoading(() => true);
				const threads = querySnapshot.docs.map(documentSnapshot => {
					return {
						_id: documentSnapshot.id,
						name: '',
						latestMessage: { text: '' },
						...documentSnapshot.data(),
					};
				});
				const reverseThreads = threads.reverse();
				setChats(reverseThreads);
				setLoading(() => false);
				console.log('chats are', []);
			});

		return () => loadMessage();
	}, []);

	return (
		<View
			style={styles.mainContainer}
			behavior={Platform.OS == 'ios' ? 'padding' : 'height'}>
			<View onPress={Keyboard.dismiss} style={styles.mainContainer}>
				<View style={styles.chatContainer}>
					<ScrollView
						ref={ref => {
							this.scrollView = ref;
						}}
						onContentSizeChange={() =>
							this.scrollView.scrollToEnd({ animated: true })
						}>
						{chats.map(chat =>
							chat.sender == user.uid ? (
								<View
									key={chat._id}
									style={{
										padding: 10,
										borderRadius: 500 / 2,
										backgroundColor: 'rgba(106,90,205,.4)',
										margin: 10,
										alignItems: 'flex-end',
									}}>
									<View style={{ alignItems: 'flex-start' }}>
										<Text
											style={{
												fontSize: 10,
												color: 'rgba(0,0,0,.6)',
												paddingHorizontal: 10,
											}}>
											me
										</Text>
										<Text
											style={{
												fontSize: 16,
												color: 'rgba(0,0,0,.8)',
												marginTop: 3,
												paddingHorizontal: 10,
											}}>
											{chat.message}{' '}
										</Text>
									</View>
								</View>
							) : (
								<View
									key={chat._id}
									style={{
										padding: 10,
										borderRadius: 500 / 2,
										backgroundColor: 'whitesmoke',
										margin: 10,
										alignItems: 'flex-start',
									}}>
									<Text
										style={{
											fontSize: 10,
											color: 'rgba(0,0,0,.6)',
											paddingHorizontal: 10,
										}}>
										friend
									</Text>
									<Text
										style={{
											fontSize: 16,
											color: 'rgba(0,0,0,.8)',
											marginTop: 3,
											paddingHorizontal: 10,
										}}>
										{chat.message}
									</Text>
								</View>
							)
						)}
					</ScrollView>
				</View>
				<View style={styles.inputContainer}>
					<TextInput
						value={message}
						onChangeText={text => setMessage(text)}
						style={styles.input}
						placeholder='type a message.....'
					/>
					<TouchableOpacity onPress={sendMessage}>
						<Text style={styles.sendButton}>Send</Text>
					</TouchableOpacity>
				</View>
			</View>
			{showKeyboard ? <View style={{ flex: 1 }} /> : null}
		</View>
	);
}

const styles = StyleSheet.create({
	mainContainer: { display: 'flex', flex: 1 },
	chatContainer: {
		justifyContent: 'flex-end',
		alignItems: 'flex-end',
		backgroundColor: 'white',
		flex: 11,
	},
	inputContainer: {
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'white',
		height: 100,
		flexDirection: 'row',
		flex: 1,
		minHeight: 20,
	},
	input: {
		backgroundColor: colors.light,
		padding: 10,
		width: '75%',
		borderRadius: 500 / 2,
		color: 'rgba(0,0,0,.6)',
		paddingHorizontal: 15,
	},
	sendButton: { paddingLeft: 10, color: 'dodgerblue' },
});
