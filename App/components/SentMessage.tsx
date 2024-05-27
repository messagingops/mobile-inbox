import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface SentMessageProps {
  message: string;
}

const SentMessage: React.FC<SentMessageProps> = ({ message }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.message}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#EFE811', // Light green background for sent messages
    alignSelf: 'flex-end',
    borderRadius: 20,
    marginRight: 32,
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

export default SentMessage;
