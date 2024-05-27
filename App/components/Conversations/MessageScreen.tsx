import React, { useState, useEffect, useRef } from 'react';
import { Text, StyleSheet, TextInput, Platform, KeyboardAvoidingView, ScrollView, TouchableOpacity, View } from 'react-native';
import { Button } from 'react-native-paper';
import Icon from './Icons';
import { RouteProp, useRoute, useNavigation, NavigationProp } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SentMessage from './SentMessage';
import ReceivedMessage from './ReceivedMessage';

type RouteParams = {
  contact: {
    name: string;
    phoneNumber: string;
    myPhoneNumber: string;
  };
};

type Message = {
  id: string;
  text: string;
  type: 'sent' | 'received';
};

const MessageScreen = () => {
  
  const navigation = useNavigation<NavigationProp<any>>();
  
  useEffect(() => {
    navigation.getParent()?.setOptions({ tabBarStyle: { display: 'none' }, tabBarVisible: false });
    return () =>
        navigation.getParent()?.setOptions({ tabBarStyle: {height: 120, }, tabBarVisible: undefined });
  }, [navigation]);

  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState<string>('');
 
  const [initialScrollDone, setInitialScrollDone] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);
  

  const route = useRoute<RouteProp<Record<string, RouteParams>, string>>();
  const { contact } = route.params;

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/messages/${contact.phoneNumber}/${contact.myPhoneNumber}`);
        const fetchedMessages: Message[] = response.data.conversation.messages.map((msg: any) => ({
          id: msg.sentAt,
          text: msg.body,
          type: msg.statusDescription === "delivered" ? 'sent' : 'received'
        }))
        .reverse();
        setMessages(fetchedMessages);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchMessages();
  }, [navigation, contact.phoneNumber, contact.myPhoneNumber]);

  useEffect(() => {
    if (messages.length > 0) {
      setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({ animated: false });
      }, 0);
    }
  }, [messages]);

  const sendMessage = async () => {
    if (!newMessage.trim()) return;

    try {
      const response = await axios.post('http://localhost:3000/messages', {
        to: contact.phoneNumber,
        from: contact.myPhoneNumber,
        body: newMessage,
      });

      const sentMessage: Message = {
        id: response.data.createMessage.sentAt,
        text: response.data.createMessage.body,
        type: 'sent',
      };

      setMessages((prevMessages) => [...prevMessages, sentMessage]);
      setNewMessage('');
      scrollViewRef.current?.scrollToEnd({ animated: true });
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="ArrowLeft" color="#707070" size={24} />
        </TouchableOpacity>
        <Text style={styles.title}>{contact.name}</Text>
      </View>
      <KeyboardAvoidingView style={styles.bottom} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView
          ref={scrollViewRef}
          style={styles.scrollView}
          contentContainerStyle={styles.contentContainer}
        >
          {messages.map(message => 
            message.type === 'sent' ? 
              <SentMessage key={message.id} message={message.text} /> : 
              <ReceivedMessage key={message.id} message={message.text} />
          )}
          <View style={{ height: 20 }} /> 
        </ScrollView>
        <View style={styles.inputArea}>
          <TextInput 
            style={styles.input} 
            selectionColor="#EFE811" 
            placeholder="Type a message..." 
            placeholderTextColor="#2E2E2E" 
            value={newMessage}
            onChangeText={setNewMessage}
            />
          <TouchableOpacity style={styles.buttonOne} onPress={() => console.log('Alarm Clock pressed')}>
            <Icon name="AlarmClock" size={24} color="#161616" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonTwo} onPress={sendMessage}>
            <Icon name="ArrowRight" size={24} color="#161616" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
    backgroundColor: '#FFF',
    justifyContent: 'space-between',
  },
  top: {
    marginTop: 80,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',  // Ensures elements are spaced evenly
    marginBottom: 20,
    backgroundColor: '#FFF', 
    paddingHorizontal: 32,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginRight: 24,
    flex: 1,  // Allows the title to use available space and center properly
  },
  backButton: {
    width: 24,  // Ensures a minimum touchable area
    height: 24,  // Ensures a minimum touchable area
    justifyContent: 'center',  // Center icon vertically
    alignItems: 'center',  // Center icon horizontally
  },
  contentContainer: {
    flexGrow: 1,
  },
  
  
  scrollView: {
    paddingVertical: 10,
  },
  bottom: {
    flex: 1,
    flexDirection: 'column',
    paddingBottom: 30,
    
  },
  inputArea: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 40,
    paddingBottom: 20,
    minHeight: 91,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -3 },  // Negative Y-offset makes the shadow go upwards
    shadowOpacity: 0.1,
    shadowRadius: 3,
   backgroundColor: '#FFF', 


  },
  input: {
    flex: 1,
    minHeight: 33,
    padding: 10,
    backgroundColor: '#FFF',
    borderColor: '#CCC',
    borderWidth: 0,
    borderRadius: 22,
    marginRight: 10,
    fontSize: 18,
  },
  buttonOne: {
      width: 40,
      height: 40,
      backgroundColor: "#EDEDED", 
      borderTopRightRadius: 0, // Rounded top-left corner
      borderBottomRightRadius: 0, // Rounded bottom-left corner
      borderTopLeftRadius: 12.73,
      borderBottomLeftRadius: 12.73,
      justifyContent: 'center',
    alignItems: 'center',
      marginRight: 1,
      shadowColor: '#000',  // Defines the color of the shadow
    shadowOffset: { width: 0, height: 5.09 },  // Specifies the X and Y offset of the shadow
    shadowOpacity: 0.25,  // The opacity of the shadow
    shadowRadius: 5.09,  // The blur radius of the shadow
    elevation: 5.09,  // For Android, adds a material design elevation shadow
  },
  buttonTwo: {
    width: 40,
    height: 40,
    backgroundColor: "#EDEDED", 
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 0, // Rounded top-right corner
    borderBottomLeftRadius: 0, // Rounded bottom-right corner
    borderTopRightRadius: 12.73,
    borderBottomRightRadius: 12.73,
    shadowColor: '#000',  // Defines the color of the shadow
    shadowOffset: { width: 0, height: 5.09 },  // Specifies the X and Y offset of the shadow
    shadowOpacity: 0.25,  // The opacity of the shadow
    shadowRadius: 5.09,  // The blur radius of the shadow
    elevation: 5.09,  // For Android, adds a material design elevation shadow
  }
});

export default MessageScreen;
