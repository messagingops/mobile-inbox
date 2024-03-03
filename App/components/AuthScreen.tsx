import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';
import { db } from '../firebase/firebaseConfig'; // Import the Firestore database instance
import { setDoc, doc } from 'firebase/firestore'; // Import Firestore functions for setting document

const AuthenticationPage: React.FC = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const registerPhoneNumber = async (phoneNumber: string) => {
    try {
      // Add phone number to users collection
      await setDoc(doc(db, "users", phoneNumber), { phoneNumber });
      console.log('Phone number added to database:', phoneNumber);
      setSuccess(true); // Set success state to true
    } catch (error) {
      console.error("Error registering phone number:", error);
    }
  };

  const handleSignIn = async () => {
    try {
      // Check if the phone number is exactly 10 digits long
      if (phoneNumber.length !== 10) {
        setError('Invalid phone number entered');
        setSuccess(false); // Reset success state
        return;
      }

      // If the phone number is valid, proceed with registration
      await registerPhoneNumber(phoneNumber);
      setError(''); // Clear error message
    } catch (error) {
      console.error("Error signing in:", error);
      setError('Error signing in');
      setSuccess(false); // Reset success state
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        onChangeText={setPhoneNumber}
        value={phoneNumber}
        keyboardType="phone-pad"
      />
      <Button title="Sign In" onPress={handleSignIn} />
      {error ? <Text style={styles.error}>{error}</Text> : null}
      {success ? <Text style={styles.success}>Login successful</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    width: '80%',
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  error: {
    color: 'red',
    marginTop: 10,
  },
  success: {
    color: 'green',
    marginTop: 10,
  },
});

export default AuthenticationPage;
