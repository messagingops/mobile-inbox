import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface ReceivedMessageProps {
  message: string;
}

const ReceivedMessage: React.FC<ReceivedMessageProps> = ({ message }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.message}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#EDEDED', // White background for received messages
    alignSelf: 'flex-start',
    borderRadius: 20,
    marginLeft: 32,
    marginBottom: 5,
    marginTop: 5,
    paddingHorizontal: 15,
    paddingVertical: 10,
    maxWidth: '60%'
  },
  message: {
    color: '#000',
    fontSize: 16,
  }
});

export default ReceivedMessage;
