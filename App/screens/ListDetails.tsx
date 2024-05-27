import React, { useState, useEffect } from 'react';
import {
  TouchableOpacity,
  Text,
  View,
  SafeAreaView,
  SectionList,
  TextInput,
  StyleSheet,
} from 'react-native';
import ListScreen from './ListScreen';
import { Ionicons } from "@expo/vector-icons";
import Checkbox from 'expo-checkbox';
import Icon from '../components/Conversations/Icons'

interface List {
  listName: string
  size: number
  sortedContacts: { firstName: string; lastName: string }[]
  listContacts: { firstName: string; lastName: string }[]
  onBackPress: () => void
  onUpdateList: (updatedList: { listName: string, size: number, listContacts: { firstName: string; lastName: string }[] }, listName: string) => void // add this line
}

const ListDetails: React.FC<List> = ({
  listName,
  size,
  sortedContacts,
  onBackPress,
  onUpdateList,
  listContacts,
}) => {
  /*
  const sortedContacts = [ 
    { firstName: 'Aarav', lastName: 'Urgaonkar' },
    { firstName: 'Arnav', lastName: 'Rastogi' },
    { firstName: 'Aryan', lastName: 'Gorwade' },
    { firstName: 'Avery', lastName: 'Li' },
    { firstName: 'Daniel', lastName: 'Kim' },
    { firstName: 'Danielle', lastName: 'Koay' },
    { firstName: 'Jerry', lastName: 'Wu' },
    { firstName: 'Lena', lastName: 'Ray' },
    { firstName: 'Natalie', lastName: 'Ung' },
  ];
  
  // These are the specific lists's contacts and name
  const listName = "Developers" // import from ListScreen.tsx
  const listContacts = [ 
    { firstName: 'Aarav', lastName: 'Urgaonkar' },
    { firstName: 'Arnav', lastName: 'Rastogi' },
    { firstName: 'Aryan', lastName: 'Gorwade' },
    { firstName: 'Avery', lastName: 'Li' },
    { firstName: 'Daniel', lastName: 'Kim' },
    { firstName: 'Lena', lastName: 'Ray' },
  ]
  */

  const [isEditMode, setIsEditMode] = useState(false);
  const [checkedContacts, setCheckedContacts] = useState<{ firstName: string; lastName: string }[]>([]);
  const [editedListName, setEditedListName] = useState(listName); // listName is the name of the list
  const [editedSize, setEditedSize] = useState(size); // size is the number of contacts in the list

  useEffect(() => {
    let newContacts: { firstName: string; lastName: string }[] = [];
    
    for (const contact of listContacts) { // for in loop?
      newContacts = [...newContacts, contact];
    }
    setCheckedContacts(newContacts);
  }, []);

  const [originalContacts, setOriginalContacts] = useState(sortedContacts);
  const [filteredContacts, setFilteredContacts] = useState(sortedContacts);

  const handleListNameChange = (text: string) => {
    setEditedListName(text);
  }

  const handleSizeChange = (val: number) => {
    setEditedSize(val);
  }

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

  const handleContactPress = (contact: { firstName: string; lastName: string }) => {
    
  };

  const handleEditClick = () => {
    setIsEditMode(!isEditMode);
  };

  // TODO: Implement done button
  const handleDonePress = () => {
    console.log("Done button pressed, going back to ListScreen with updated list")
    // update the list object with the new list name and checked contacts
    const updatedList = { listName: editedListName, size: editedSize, listContacts: checkedContacts}
    // saves all checked list names to the list object and overwrites the old list object, returning new
    console.log("before list updated")
    onUpdateList(updatedList, listName)
    console.log("after list updated")
    onBackPress()
    console.log("after onBackPress")
  }

  const toggleCheckbox = (item: { firstName: string; lastName: string }, isChecked: boolean) => {
    if (isChecked) {
      // If the checkbox is checked, add the item to checkedContacts
      setCheckedContacts(prevContacts => [...prevContacts, item]);
    } else {
      // If the checkbox is unchecked, remove the item from checkedContacts
      setCheckedContacts(prevContacts => prevContacts.filter(contact => contact.firstName !== item.firstName || contact.lastName !== item.lastName));
    }
  };

  useEffect(() => {
    handleSizeChange(checkedContacts.length);
  }, [checkedContacts]);

  const isContactChecked = (contact: { firstName: string; lastName: string }) => {
    return checkedContacts.some(
      checkedContact => checkedContact.firstName === contact.firstName && checkedContact.lastName === contact.lastName
    );
  };

  const renderItem = ({ item }: { item: { firstName: string; lastName: string } }) => (
    <TouchableOpacity
      onPress={() => {
        const isChecked = isContactChecked(item);
        toggleCheckbox(item, !isChecked);
      }}
      style={styles.contactRow}
    >
      <Checkbox
        value={isContactChecked(item)}
        onValueChange={(isChecked) => toggleCheckbox(item, isChecked)}
      />
      <Text style={styles.nameText}>{item.firstName}</Text>
    </TouchableOpacity>
  );
  
  const renderSectionHeader = ({
    section: { title },
  }: {
    section: { title: string };
  }) => (
    <View style={{ paddingHorizontal: 20 }}>
    <View style={{ backgroundColor: "white", paddingHorizontal: 15, padding: 20, borderBottomWidth: 1, borderBottomColor: '#E0E0E0' }}>
      <Text style={{ fontFamily: "Poppins", color: '#A9A9A9' }}>{title}</Text>
    </View>
    </View>
  );

  // Make list name editable
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Ionicons name="arrow-back" size={24} color="blue" onPress={onBackPress} />
        <TextInput
          value={editedListName}
          onChangeText={handleListNameChange}
          placeholder="List Name"
          editable={true}
          style={styles.listNameInput}
        />
        <TouchableOpacity onPress={handleDonePress}>
          <Text style={styles.backButtonText}>Done</Text>
          
        </TouchableOpacity>
      </View>
      <SectionList
        sections={sections}
        keyExtractor={(item, index) => item.firstName + index}
        renderItem={renderItem}
        renderSectionHeader={renderSectionHeader}
      />
    </SafeAreaView>
  );
};
  
export default ListDetails;
  
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: 'center',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: 'white',
  },
   listNameInput: {
    height: 40,
    borderColor: "gray",
    flex: 1,
    margin: 10,
    fontSize: 18,
    paddingLeft: 10,
    borderRadius: 5, // Adjust this to make the edges slightly rounded
    fontFamily: "Poppins",
    backgroundColor: '#E8E8E8', // Add this line to shade the search bar light gray
  },
  backButtonText: {
    color: 'black',
    
    fontSize: 16,
    marginRight: 10,
    fontFamily: 'Poppins', // Add the fontFamily property with the value 'Poppins'
    textDecorationLine: 'underline', // Add this line
  },
  contactRow: {
    padding: 15,
    flexDirection: 'row', // Add this line to make the checkbox and name appear side by side
    alignItems: 'center', // Add this line to align the checkbox and name vertically  
    borderBottomColor: '#E0E0E0',
    borderBottomWidth: 1, // Change this to your desired width
    marginHorizontal: 20, 
  },
  nameText: {
    marginLeft: 20, // Add some spacing between the checkbox and name
    fontFamily: 'Poppins', // Add the fontFamily property with the value 'Poppins'
    fontSize: 17, // Increase this value to increase the size of the contact name
  },
});
