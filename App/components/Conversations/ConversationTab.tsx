import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from '../Icons'

type ContactItemProps = {
  contactName: string;
  message: string;
  date: string; 
  time: string; 
};

const ContactItem: React.FC<ContactItemProps> = ({ contactName, message, date, time }) => {
  // Truncate the text to a specified length and add '...' if it exceeds that length
  const truncateMessage = (input: string, maxLength: number) => {
    return input.length > maxLength ? `${input.substring(0, maxLength - 3)}...` : input;
  };

  return (
    <View style={styles.container}>
      <View style={styles.leftColumn}>
        <Text style={styles.contactName}>{contactName}</Text>
        <Text style={styles.message}>{truncateMessage(message, 26)}</Text>
      </View>
      <View style={styles.rightWithIcon}>
        <View style={styles.rightColumn}>
          <Text style={styles.date}>{date}</Text>
          <Text style={styles.time}>{time}</Text>
        </View>
        <View style={styles.icon}>
          <Icon name="ChevronRight" color="#A0A0A0" size={24}/>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  
  
  container: {
    marginLeft: 32,
    marginRight: 32,
    marginTop: 24,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  rightWithIcon: {
    flexDirection: 'row',
    marginTop: -16,
    alignItems: 'center', 
  },
  icon: {
    marginLeft: 4, 
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
    fontSize: 18,
    color: '#505050',
    
  },
  message: {
    marginTop: 8,
    color: '#A0A0A0',
    fontSize: 16,
    marginBottom: 16,
    
  },
  date: {
    fontSize: 14,
    fontStyle: 'italic',
    color: '#7E7E7E',
  },
  time: {
    fontSize: 14,
    fontStyle: 'italic',
    color: '#7E7E7E',
  },
});

export default ContactItem;
