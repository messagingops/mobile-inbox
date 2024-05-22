import React, { useState } from "react";
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  SectionList,
  TextInput,
} from "react-native";
import ContactDetails from "../components/Contacts/ContactDetails";
import Feather from '@expo/vector-icons/Feather';

const ContactsScreen = () => {
  const [search, setSearch] = useState("");
  const [selectedContact, setSelectedContact] = useState<{
    firstName: string;
    lastName: string;
  } | null>(null);
  const sortedContacts = [
    { firstName: "Aarav", lastName: "Urgaonkar" },
    { firstName: "Arnav", lastName: "Rastogi" },
    { firstName: "Aryan", lastName: "Gorwade" },
    { firstName: "Avery", lastName: "Li" },
    { firstName: "Daniel", lastName: "Kim" },
    { firstName: "Danielle", lastName: "Koay" },
    { firstName: "Jerry", lastName: "Wu" },
    { firstName: "Lena", lastName: "Ray" },
    { firstName: "Natalie", lastName: "Ung" },
  ];
  const [originalContacts, setOriginalContacts] = useState(sortedContacts);
  const [filteredContacts, setFilteredContacts] = useState(sortedContacts);
  const [isNewContact, setIsNewContact] = useState<boolean>(false);

  const groupContacts = (contacts: { firstName: string; lastName: string }[]) => {
    const grouped: { [key: string]: { firstName: string; lastName: string }[] } = {};
    contacts.forEach(({ firstName, lastName }) => {
      const firstLetter = firstName.charAt(0).toUpperCase();
      if (!grouped[firstLetter]) {
        grouped[firstLetter] = [];
      }
      grouped[firstLetter].push({ firstName, lastName });
    });
    console.log("Grouped: ", grouped);
    return grouped;
  };

  const sections = groupContacts(filteredContacts);
  console.log("Sections: ", sections);

  const handleBackPress = () => {
    setSelectedContact(null);
  };

  const updateContact = (oldName: string, newName: string) => {
    const updatedContacts = originalContacts.map((contact) =>
      contact.firstName + " " + contact.lastName === oldName
        ? { firstName: newName.split(" ")[0], lastName: newName.split(" ")[1] }
        : contact
    );
    setOriginalContacts(updatedContacts);
    setFilteredContacts(updatedContacts);
  };

  const updateSearch = (text: string) => {
    setSearch(text);
    if (text.trim() === "") {
      setFilteredContacts(originalContacts);
    } else {
      const filteredContacts = originalContacts.filter(({ firstName, lastName }) =>
        firstName.toLowerCase().includes(text.toLowerCase()) || lastName.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredContacts(filteredContacts);
    }
  };

  const handleContactPress = (contact: { firstName: string; lastName: string }) => {
    setSelectedContact(contact);
  };

  const handleNewContact = () => {
    setIsNewContact(true);
    setSelectedContact(null); // Clear any selected contact
  };

  const renderItem = ({ item }: { item: { firstName: string; lastName: string } }) => (
    <TouchableOpacity onPress={() => handleContactPress(item)}>
      <View style={{ padding: 10 }}>
        <Text>{item.firstName}</Text>
      </View>
    </TouchableOpacity>
  );

  const renderSectionHeader = ({
    section: { title },
  }: {
    section: { title: string };
  }) => (
    <View style={{ backgroundColor: "lightgray", padding: 10 }}>
      <Text style={{ fontWeight: "bold" }}>{title}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      
      
      {selectedContact ? (
        <ContactDetails
          firstName={selectedContact.firstName}
          lastName={selectedContact.lastName}
          phoneNumber="1234567789"
          onBackPress={handleBackPress}
          updateContact={updateContact}
        />
      ) : (
        <>
          <View style={styles.topCont}>

            <TouchableOpacity onPress={handleNewContact}>
            <Feather name="plus-circle" size={24} color="blue" />
            </TouchableOpacity>
          </View>
          <TextInput
            style={styles.searchBar}
            placeholder="Search..."
            onChangeText={updateSearch}
            value={search}
          />
          {Object.keys(sections).length > 0 ? (
            <SectionList
              sections={Object.keys(sections).map((key) => ({
                title: key,
                data: sections[key].sort((a, b) => a.firstName.localeCompare(b.firstName)),
              }))}
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
    </SafeAreaView>
  );
};

export default ContactsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: "center",
  },
  searchBar: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    margin: 10,
    paddingLeft: 10,
    borderRadius: 20,
  },
  topCont: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    paddingHorizontal: 20
  }
});
