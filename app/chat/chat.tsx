import React, { useState, useEffect, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  Alert,
} from 'react-native';

const onConnect = () => {
  const [userId, setUserId] = useState(''); // User's ID
  const [roomId, setRoomId] = useState('recruiter_chat'); // Default Room ID
  const [connected, setConnected] = useState(false); // WebSocket connection state
  const [message, setMessage] = useState(''); // Current message
  const [messages, setMessages] = useState([]); // List of messages
  const wsRef = useRef(null); // WebSocket reference
  // const senderId = 1234
  // Connect to WebSocket
  const connectWebSocket = () => {
    if (!userId.trim()) {
      Alert.alert('Error', 'Please enter a User ID to connect!');
      return;
    }


    wsRef.current = new WebSocket(`https://chat-room-945018261442.us-central1.run.app/ws/chat/${roomId}/${userId}`);

    wsRef.current.onopen = () => {
      setConnected(true);
      Alert.alert('Connected', `Connected as ${userId}`);

       // Send the automatic message immediately after connection
      //  const autoMessage = 'I am interested in this candidate';
      //  wsRef.current.send(JSON.stringify({ type: 'message', message: autoMessage }));
 
       // Add the automatic message to the chat list
      //  setMessages((prevMessages) => [
      //    ...prevMessages,
      //    { user_id: senderId, content: autoMessage },
      //  ]);
     
 
    };

    

    wsRef.current.onmessage = (event) => {
      const messageData = JSON.parse(event.data);
      setMessages((prevMessages) => [...prevMessages, messageData]);
    };

    wsRef.current.onclose = () => {
      setConnected(false);
      Alert.alert('Disconnected', 'WebSocket connection closed.');
    };
  };

  // Send a message
  const sendMessage = () => {
    if (message.trim() && wsRef.current) {
      const payload = JSON.stringify({ message });
      wsRef.current.send(payload);
      setMessage(''); // Clear input
    } else {
      Alert.alert('Error', 'Cannot send an empty message.');
    }
  };

  // Cleanup WebSocket on unmount
  useEffect(() => {
    return () => {
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, []);

  return (
    <View style={styles.container}>
      {!connected ? (
        <View style={styles.connectionContainer}>
          <Text style={styles.title}>Recruiter Chat</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your User ID"
            value={userId}
            onChangeText={setUserId}
          />
          <TouchableOpacity style={styles.button} onPress={connectWebSocket}>
            <Text style={styles.buttonText}>Connect</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.chatContainer}>
          <FlatList
            data={messages}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <View
                style={[
                  styles.messageBubble,
                  item.user_id === userId ? styles.selfMessage : styles.otherMessage,
                ]}
              >
                <Text style={styles.messageText}>
                  {item.user_id}: {item.content}
                </Text>
              </View>
            )}
            contentContainerStyle={styles.messages}
          />
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Type your message..."
              value={message}
              onChangeText={setMessage}
            />
            <TouchableOpacity style={styles.button} onPress={sendMessage}>
              <Text style={styles.buttonText}>Send</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  connectionContainer: {
    alignItems: 'center',
  },
  chatContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  messages: {
    flexGrow: 1,
    justifyContent: 'flex-end',
    paddingBottom: 20,
  },
  messageBubble: {
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
    maxWidth: '80%',
  },
  selfMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#c8e6c9',
  },
  otherMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#e3f2fd',
  },
  messageText: {
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
});

export default onConnect;
