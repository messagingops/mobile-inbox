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
import Feather from "@expo/vector-icons/Feather";
import EvilIcons from "@expo/vector-icons/EvilIcons";


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
 const [anotherField, setAnotherField] = useState(""); // State for the additional input


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


 const toggleEditMode = () => {
   setEditMode(!editMode);
 };


 const handleSave = () => {
   const newFullName = `${editedFirstName} ${editedLastName}`;
   updateContact(`${firstName} ${lastName}`, newFullName);
   toggleEditMode();
   onBackPress(); // Go back after saving
 };


 const isNewContact = firstName === "" && lastName === "";


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
       {isNewContact && !editMode ? (
         <EvilIcons name="user" size={100} color="black" />
       ) : (
         <Text style={styles.profileText}>
           {`${firstName.charAt(0).toUpperCase()}${
             lastName ? " " + lastName.charAt(0).toUpperCase() : ""
           }`}
         </Text>
       )}
     </View>
     <View style={styles.inputContainer}>
       <View style={styles.groupedInputs}>
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
       <View
         style={[
           styles.input,
           styles.separatedInput,
           !editMode && styles.disabledInput,
           styles.iconInputContainer,
         ]}
       >
         <Feather name="plus-circle" size={24} color="gray" />
         <TextInput
           style={styles.iconInput}
           value={anotherField}
           onChangeText={handleAnotherFieldChange}
           placeholder="Add to List"
           editable={editMode}
         />
       </View>
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
 groupedInputs: {
   marginBottom: 20, // Adjust spacing between grouped inputs and the separated input
 },
 input: {
   height: 40,
   borderColor: "gray",
   borderWidth: 1,
   paddingHorizontal: 10,
   borderRadius: 20, // Increased borderRadius to round the corners
   flexDirection: "row", // Add flexDirection row for the input with icon
   alignItems: "center",
 },
 iconInputContainer: {
   paddingHorizontal: 0, // Remove horizontal padding for the container
   paddingLeft: 10, // Add padding to the left to create space for the icon
 },
 iconInput: {
   flex: 1, // Ensure the input takes up remaining space
   paddingHorizontal: 10, // Add padding inside the input
   height: "100%",
   borderRadius: 20, // Match border radius
 },
 separatedInput: {
   marginTop: 20, // Add spacing for the separated input
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



