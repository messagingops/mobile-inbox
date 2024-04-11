import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

// Define the props type for the component
type ContactItemProps = {
  contactName: string;
  message: string;
  date: string; // assuming the date is a string in the format MM/DD/YY
  time: string; // assuming the time is a string in the format XX:XXa
};

// The ContactItem component
const ContactItem: React.FC<ContactItemProps> = ({ contactName, message, date, time }) => {
  return (
    <View style={styles.container}>
      <View style={styles.leftColumn}>
        <Text style={styles.contactName}>{contactName}</Text>
        <Text style={styles.message}>{message}</Text>
      </View>
      <View style={styles.rightColumn}>
        <Text style={styles.date}>{date}</Text>
        <Text style={styles.time}>{time}</Text>
      </View>
    </View>
  );
};

// Define styles for the component
const styles = StyleSheet.create({
  container: {

    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  leftColumn: {
    flexDirection: 'column',
    justifyContent: 'center',
  },
  rightColumn: {
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
  contactName: {
    fontWeight: 'bold',
    fontSize: 20,
    
  },
  message: {
    marginTop: 16,
    color: '#2E2E2E',
    fontSize: 16,
    marginBottom: 16,
    
  },
  date: {
    marginTop: 4,
    fontSize: 16,
    fontStyle: 'italic',
    color: '#2E2E2E',
  },
  time: {
    fontSize: 16,
    fontStyle: 'italic',
    color: '#2E2E2E',
  },
});

export default ContactItem;
