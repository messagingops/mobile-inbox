import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, AppRegistry } from 'react-native';
import { ApolloProvider } from '@apollo/client';
import { client } from './client.tsx';

export default function App() {
  return (
    <ApolloProvider client={client}>
      <View style={styles.container}>
        <Text>Open up App.tsx to start working on your app!</Text>
        <StatusBar style="auto" />
      </View>
    </ApolloProvider>
  );
}

AppRegistry.registerComponent('MyApp', () => App);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});


