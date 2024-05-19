import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface Contact {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  onBackPress: () => void;
  updateContact: (oldName: string, newName: string) => void;
}

const ContactDetails: React.FC<Contact> = ({
    firstName,
    lastName,
    phoneNumber,
    onBackPress,
    updateContact,
  }) => {
    const [editedFirstName, setEditedFirstName] = useState(firstName);
    const [editedLastName, setEditedLastName] = useState(lastName);
    const [editedPhoneNumber, setEditedPhoneNumber] = useState(phoneNumber);
    const [editMode, setEditMode] = useState(firstName === "" && lastName === ""); // Initially in edit mode if it's a new contact
  
    const handleFirstNameChange = (text: string) => {
      setEditedFirstName(text);
    };
  
    const handleLastNameChange = (text: string) => {
      setEditedLastName(text);
    };
  
    const handlePhoneNumberChange = (text: string) => {
      setEditedPhoneNumber(text);
    };
  
    const toggleEditMode = () => {
      setEditMode(!editMode);
    };
  
    const handleSave = () => {
      const newFullName = `${editedFirstName} ${editedLastName}`;
      updateContact(`${firstName} ${lastName}`, newFullName);
      toggleEditMode();
      onBackPress(); // Go back after saving
    };
  
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.backEditButtons}>
          <TouchableOpacity onPress={onBackPress} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="blue" />
          </TouchableOpacity>
  
          {editMode ? (
            <TouchableOpacity onPress={handleSave} style={styles.backButton}>
              <Text style={styles.backButtonText}>Save</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={toggleEditMode} style={styles.backButton}>
              <Text style={styles.backButtonText}>Edit</Text>
            </TouchableOpacity>
          )}
        </View>
        <View style={styles.profileImage}>
          <Text style={styles.profileText}>
            {`${firstName.charAt(0).toUpperCase()}${lastName ? ' ' + lastName.charAt(0).toUpperCase() : ''}`}
          </Text>
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={[styles.input, !editMode && styles.disabledInput]}
            value={editedFirstName}
            onChangeText={handleFirstNameChange}
            placeholder="Enter First Name"
            editable={editMode}
          />
          <TextInput
            style={[styles.input, !editMode && styles.disabledInput]}
            value={editedLastName}
            onChangeText={handleLastNameChange}
            placeholder="Enter Last Name"
            editable={editMode}
          />
          <TextInput
            style={[styles.input, !editMode && styles.disabledInput]}
            value={editedPhoneNumber}
            onChangeText={handlePhoneNumberChange}
            placeholder="Enter Phone Number"
            editable={editMode}
          />
        </View>
      </SafeAreaView>
    );
  };
  

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
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
  },
  profileText: {
    fontSize: 50,
    color: "white",
    fontWeight: "bold",
  },
  inputContainer: {
    width: "80%",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  disabledInput: {
    backgroundColor: "lightgray",
  },
  backEditButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
    position: "absolute",
    top: 20,
  },
  backButton: {
    padding: 10,
  },
  backButtonText: {
    color: "blue",
    fontSize: 16,
  },
});

export default ContactDetails;
