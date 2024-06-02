import React, { useState } from 'react';
import {
  TouchableOpacity,
  Text,
  View,
  SafeAreaView,
  TextInput,
  StyleSheet,
} from 'react-native';
import axios from 'axios';
import Feather from '@expo/vector-icons/Feather';
import { Ionicons } from '@expo/vector-icons';
import EvilIcons from "@expo/vector-icons/EvilIcons";
import { Navigation } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';


interface Contact {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  onBackPress: () => void;
  // updateContact: (oldName: string | null, newName: string) => void; // Adjusted signature
}

const CreateContact: React.FC<Contact> = ({
  firstName,
  lastName,
  phoneNumber,
  onBackPress
  // updateContact,
}) => {
  const navigation = useNavigation();
  
  const [editedFirstName, setEditedFirstName] = useState(firstName);
  const [editedLastName, setEditedLastName] = useState(lastName);
  const [editedPhoneNumber, setEditedPhoneNumber] = useState(phoneNumber);
  const [anotherField, setAnotherField] = useState("");

  const handleFirstNameChange = (text: string) => {
    setEditedFirstName(text);
  };

  const handleLastNameChange = (text: string) => {
    setEditedLastName(text);
  };

  const handlePhoneNumberChange = (text: string) => {
    setEditedPhoneNumber(text);
  };

  const handleAnotherFieldChange = (text: string) => {
    setAnotherField(text);
  };

  const handleSave = async () => {
    try {
      const response = await axios.post('http://localhost:3000/contacts', {
        name: `${editedFirstName} ${editedLastName}`,
        phoneNumber: editedPhoneNumber,
        accountPhone: "+19185175752",  // Assuming this is a static value, change as needed
        customFields: [],
        blocked: false,
      });
      console.log('New contact created:', response.data);

      navigation.goBack();

      // updateContact(null, `${editedFirstName} ${editedLastName}`);
      // onBackPress();
    } catch (error) {
      console.error('Failed to create a new contact:', error);
    }
  };

  const isNewContact = firstName === "" && lastName === "";

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBackPress} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="blue" />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.profileImage}>
        {isNewContact ? (
          <EvilIcons name="user" size={100} color="black" />
        ) : (
          <Text style={styles.profileText}>
            {(firstName && firstName.charAt(0).toUpperCase()) || ''}
            {(lastName && " " + lastName.charAt(0).toUpperCase()) || ''}
          </Text>
        )}
      </View>
      <View style={styles.inputContainer}>
        <View style={styles.groupedInputs}>
          <TextInput
            style={styles.input}
            value={editedFirstName}
            onChangeText={handleFirstNameChange}
            placeholder="Enter First Name"
            editable={true}
          />
          <TextInput
            style={styles.input}
            value={editedLastName}
            onChangeText={handleLastNameChange}
            placeholder="Enter Last Name"
            editable={true}
          />
          <TextInput
            style={styles.input}
            value={editedPhoneNumber}
            onChangeText={handlePhoneNumberChange}
            placeholder="Enter Phone Number"
            editable={true}
          />
        </View>
        <View
          style={[
            styles.input,
            styles.separatedInput,
            styles.iconInputContainer,
          ]}
        >
          <Feather name="plus-circle" size={24} color="gray" />
          <TextInput
            style={styles.iconInput}
            value={anotherField}
            onChangeText={handleAnotherFieldChange}
            placeholder="Add to List"
            editable={true}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50, // Added padding to the top to make space for the header
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  backButton: {
    padding: 10,
  },
  saveButton: {
    padding: 10,
  },
  saveButtonText: {
    color: "blue",
    fontSize: 16,
  },
  profileImage: {
    width: 200,
    height: 200,
    borderRadius: 100,
    borderColor: "white",
    backgroundColor: "#c8cbcf",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    alignSelf: 'center',
  },
  profileText: {
    fontSize: 50,
    color: "white",
    fontWeight: "bold",
  },
  inputContainer: {
    width: "90%",
    alignSelf: 'center',
  },
  groupedInputs: {
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  iconInputContainer: {
    paddingHorizontal: 0,
    paddingLeft: 10,
  },
  iconInput: {
    flex: 1,
    paddingHorizontal: 10,
    height: "100%",
    borderRadius: 20,
  },
  separatedInput: {
    marginTop: 20,
  },
});

export default CreateContact;