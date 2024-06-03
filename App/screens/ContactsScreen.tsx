import React, { useState, useEffect } from 'react';
import {
  TouchableOpacity,
  Text,
  View,
  SafeAreaView,
  SectionList,
  TextInput,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import axios from 'axios';
import ContactDetails from '../components/Contacts/ContactDetails';
import Feather from '@expo/vector-icons/Feather';
import TopNavigation from '../navigation/TopNavigation';
import ListScreen from './ListScreen';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import io from 'socket.io-client';
import Icon from '../components/Conversations/Icons';
import EvilIcons from "@expo/vector-icons/EvilIcons";

const ContactsScreen = () => {
  const [search, setSearch] = useState('');
  const [selectedContact, setSelectedContact] = useState<{
    firstName: string;
    lastName: string;
  } | null>(null);
  const [selectedScreen, setSelectedScreen] = useState('Contacts'); // New state for selected screen
  const [contacts, setContacts] = useState([]);
  const [originalContacts, setOriginalContacts] = useState([]);
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [isNewContact, setIsNewContact] = useState<boolean>(false);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  const serverURL = "http://localhost:3000";

  const fetchContacts = async () => {
    try {
      console.log('Fetching contacts from http://localhost:3000/inbox/+19185175752');
      const response = await axios.get('http://localhost:3000/inbox/+19185175752');
      console.log('Response:', response.data);
      const fetchedContacts = response.data.inbox.items.map((item: any) => ({
        firstName: item.contact.name.split(' ')[0],
        lastName: item.contact.name.split(' ')[1],
        phoneNumber: item.contact.phoneNumber,
      }));
      console.log(selectedScreen);
      setContacts(fetchedContacts);
      setFilteredContacts(fetchedContacts);
      setOriginalContacts(fetchedContacts);
    } catch (error) {
      console.error('Failed to fetch contacts:', error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchContacts();

    const socket = io(`${serverURL}`, {
      path: '/socket.io/',
      transports: ['websocket'],
      reconnectionAttempts: 10,
      reconnectionDelay: 3000,
      rejectUnauthorized: false,
      secure: true,
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

    socket.on('messageEvent', () => {
      console.log('Received messageEvent, fetching contacts again...');
      fetchContacts();
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      fetchContacts();
    }, [])
  );

  const groupContacts = (contacts: { firstName: string; lastName: string }[]) => {
    const grouped: { [key: string]: { firstName: string; lastName: string }[] } = {};
    contacts.forEach(({ firstName, lastName }) => {
      const firstLetter = firstName.charAt(0).toUpperCase();
      if (!grouped[firstLetter]) {
        grouped[firstLetter] = [];
      }
      grouped[firstLetter].push({ firstName, lastName });
    });
    return grouped;
  };

  const sections = Object.keys(groupContacts(filteredContacts)).map((key) => ({
    title: key,
    data: groupContacts(filteredContacts)[key],
  }));

  const handleBackPress = () => {
    setIsNewContact(false);
    setSelectedContact(null);
  };

  const updateContact = (oldName: string | null, newName: string) => {
    let updatedContacts;
    if (oldName) {
      updatedContacts = originalContacts.map((contact) =>
        contact.firstName + ' ' + contact.lastName === oldName
          ? { firstName: newName.split(' ')[0], lastName: newName.split(' ')[1] }
          : contact
      );
    } else {
      const newContact = { firstName: newName.split(' ')[0], lastName: newName.split(' ')[1] };
      updatedContacts = [...originalContacts, newContact];
    }
    updatedContacts.sort((a, b) => a.firstName.localeCompare(b.firstName)); // Sort the contacts alphabetically
    setOriginalContacts(updatedContacts);
    setFilteredContacts(updatedContacts);
    setIsNewContact(false);
    setSelectedContact(null);
  };

  const updateSearch = (text: string) => {
    setSearch(text);
    if (text.trim() === '') {
      setFilteredContacts(originalContacts);
    } else {
      const filteredContacts = originalContacts.filter(({ firstName, lastName }) =>
        firstName.toLowerCase().includes(text.toLowerCase()) ||
        lastName.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredContacts(filteredContacts);
    }
  };

  const handleContactPress = (contact: { firstName: string; lastName: string }) => {
    setSelectedContact(contact);
  };

  const handleNewContact = () => {
    navigation.navigate('CreateContact', {
      firstName: '',
      lastName: '',
      phoneNumber: '',
      onBackPress: handleBackPress
      // updateContact: (oldName: string | null, newName: string) => updateContact(oldName, newName),
    });

    // try {
    //   const response = await axios.post('http://localhost:3000/contacts', {
    //     name: 'New Contact',
    //     phoneNumber: '+15103968494',
    //     accountPhone: '+19185175752',
    //     customFields: [],
    //     blocked: false,
    //   });
    //   console.log('New contact created:', response.data);
    //   navigation.navigate('CreateContact', {
    //     firstName: '',
    //     lastName: '',
    //     phoneNumber: '',
    //     onBackPress: handleBackPress,
    //     updateContact: (oldName, newName) => updateContact(null, newName),
    //   });
    // } catch (error) {
    //   console.error('Failed to create a new contact:', error);
    // }
  };

  const renderItem = ({ item }: { item: { firstName: string; lastName: string } }) => (
    <TouchableOpacity onPress={() => handleContactPress(item)}>
      <View style={{ padding: 10 }}>
        <Text style={styles.nameText} >{item.firstName}</Text>
      </View>
    </TouchableOpacity>
  );

  const renderSectionHeader = ({ section: { title } }: { section: { title: string } }) => (
    <View style={{ backgroundColor: 'lightgray', padding: 10 }}>
      <Text style={{ fontWeight: 'bold' }}>{title}</Text>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.centered}>
          <ActivityIndicator size="large" color="#EFE811" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {selectedContact ? (
        <ContactDetails
          firstName={selectedContact.firstName}
          lastName={selectedContact.lastName}
          phoneNumber='1234567789'
          onBackPress={handleBackPress}
          updateContact={updateContact}
        />
      ) : isNewContact ? (
        <ContactDetails
          firstName=''
          lastName=''
          phoneNumber=''
          onBackPress={handleBackPress}
          updateContact={(oldName, newName) => updateContact(null, newName)}
        />
      ) : (
        <>
          <View style={styles.topCont}>
            {selectedScreen === 'Contacts' && (
              <TouchableOpacity onPress={handleNewContact}>
                <Icon name="CirclePlus" color="#707070" size={24}/>
              </TouchableOpacity>
            )}
          </View>
          <TopNavigation selectedScreen={selectedScreen} setSelectedScreen={setSelectedScreen} />
          {selectedScreen === 'Contacts' && (
            <>
              <TextInput
                style={styles.searchBar}
                placeholder='Search...'
                onChangeText={updateSearch}
                value={search}
              />
              {Object.keys(sections).length > 0 ? (
                <SectionList
                  sections={sections}
                  keyExtractor={(item, index) => item.firstName + index}
                  renderItem={renderItem}
                  renderSectionHeader={renderSectionHeader}
                />
              ) : (
                <View style={styles.container}>
                  <Text>No contacts found</Text>
                </View>
              )}
            </>
          )}
          {selectedScreen === 'Lists' && <ListScreen />}
        </>
      )}
    </SafeAreaView>
  );
};

export default ContactsScreen;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: 'center',
  },
  searchBar: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    margin: 10,
    paddingLeft: 10,
    borderRadius: 20,
  },
  topCont: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: 10,
  },
  nameText: {
    
  }
});