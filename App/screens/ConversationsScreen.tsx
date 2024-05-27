import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native'
import Icon from '../components/Icons'
import ContactTab from '../components/Conversations/ConversationTab'
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';


interface ContactItem {
    name: string;
    number: string;
    message: string;
    date: string;
    time: string;
  }

const ConversationsScreen = () => {
  

    const navigation = useNavigation();
    const [contacts, setContacts] = useState<ContactItem[]>([]);

    useEffect(() => {
        const fetchContacts = async () => {
            try {
                const response = await axios.get('http://localhost:3000/inbox/+19185175752'); // Update URL with your API endpoint
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
            }
        };

        fetchContacts();
    }, []);

    const handlePress = (item: ContactItem) => {
        // @ts-ignore
        navigation.navigate('MessageScreen', { contact: {
            name: item.name,
            phoneNumber: item.number,
            myPhoneNumber: "+19185175752"
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
   
})

export default ConversationsScreen