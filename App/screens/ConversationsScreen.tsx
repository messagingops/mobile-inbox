import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native'
import Icon from '../components/Conversations/Icons'
import ContactTab from '../components/Conversations/ConversationTab'
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import io from 'socket.io-client';


interface ContactItem {
    name: string;
    number: string;
    message: string;
    date: string;
    time: string;
  }

const ConversationsScreen = () => {
  
    const phoneNumber = process.env.EXPO_PUBLIC_PHONE_NUMBER;
    const serverURL = process.env.EXPO_PUBLIC_SERVER_URL;
    const navigation = useNavigation();
    const [contacts, setContacts] = useState<ContactItem[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const fetchContacts = async () => {
        try {
          console.log(`Fetching contacts from http://localhost:3000/inbox/${phoneNumber}`);
          const response = await axios.get(`http://localhost:3000/inbox/${phoneNumber}`); // Update URL with your API endpoint
          console.log('Response:', response.data);
          const fetchedContacts = response.data.inbox.items.map((item: any) => ({
            name: item.contact.name,
            number: item.contact.phoneNumber,
            message: item.lastMessage,
            date: new Date(item.lastMessageTime).toLocaleDateString(),
            time: new Date(item.lastMessageTime).toLocaleTimeString([], { timeStyle: 'short' }),
          }));
          setContacts(fetchedContacts);
        } catch (error) {
          console.error('Failed to fetch contacts', error);
        } finally {
          setLoading(false);
        }
      };
    
      useEffect(() => {
        fetchContacts();
    
        // Set up WebSocket connection
        
        console.log(`Connecting to WebSocket at ${serverURL}`);

        const socket = io(`${serverURL}`, {
            path: '/socket.io/',
            transports: ['websocket'],
            reconnectionAttempts: 10,
            reconnectionDelay: 3000,
            rejectUnauthorized: false,
            secure: true, // Add this line
            withCredentials: true,
          });
      
          socket.on('connect', () => {
            console.log('WebSocket connected');
          });
      
          socket.on('connect_error', (error) => {
            console.log('WebSocket connection error:', error);
          });
      
          socket.on('disconnect', (reason) => {
            console.log('WebSocket disconnected:', reason);
          });
    
        // Listen for incoming messages
        socket.on('messageEvent', () => {
          // Fetch contacts again when a new message event is received
          console.log('Received messageEvent, fetching contacts again...');
          fetchContacts();
        });
    
        return () => {
          socket.disconnect();
        };
      }, [phoneNumber]);

    const handlePress = (item: ContactItem) => {
        // @ts-ignore
        navigation.navigate('MessageScreen', { contact: {
            name: item.name,
            phoneNumber: item.number,
            myPhoneNumber: `${phoneNumber}`
          }});
    };
    
    const renderItem = ({ item }: { item: ContactItem }) => (
        <TouchableOpacity onPress={() => handlePress(item)}>
            <View style={styles.divider} />
        
          <ContactTab
            contactName={item.name}
            message={item.message}
            date={item.date}
            time={item.time}
          />
        </TouchableOpacity>
      );

      if (loading) {
        return (
          <View style={styles.container}>
            <View style={styles.top}>
                <Text style={styles.title}>Conversations</Text>
                <Icon name="CirclePlus" color="#707070" size={24}/>        
            </View>
            <View style={styles.centered}>
                <ActivityIndicator size="large" color="#EFE811" />
            </View>
            
          </View>
        );
      }

  return (
    
    <View style={styles.container}>
        <View style={styles.top}>
            <Text style={styles.title}>Conversations</Text>
            <Icon name="CirclePlus" color="#707070" size={24}/>        
        </View>
        
        <FlatList
            data={contacts}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            showsVerticalScrollIndicator={false}
            extraData={contacts}
        />

    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
    },
    
    top: {
        marginTop: 80, 
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 32,
        marginLeft: 32,
        marginRight: 32,
    },
    title: {
        fontSize: 32,
        fontWeight: "bold",
      
    },
    divider: {
        height: 1,
        backgroundColor: '#EDEDED', // Choose a color that fits your theme
      },
      centered: {
        marginTop: 260,
        justifyContent: 'center',
        alignItems: 'center',
      },
   
})

export default ConversationsScreen