import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ApolloProvider } from '@apollo/client';
import { client } from './client.tsx';
import AuthScreen from './components/AuthScreen.tsx'; // Import AuthScreen component

export default function App() {
  return (
    <ApolloProvider client={client}>
      <View style={styles.container}>
        <AuthScreen /> 
        <StatusBar style="auto" />
      </View>
    </ApolloProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
