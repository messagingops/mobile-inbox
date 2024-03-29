import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Alert } from 'react-native';

import { ApolloProvider } from '@apollo/client';
import { client } from './client';
import { XStack, YStack } from 'tamagui'
import { Button, Theme } from 'tamagui'
import { TamaguiProvider, Input } from 'tamagui'
import { View ,createTamagui} from '@tamagui/core';
import { config } from '@tamagui/config/v3'

// you usually export this from a tamagui.config.ts file
const tamaguiConfig = createTamagui(config)

// make TypeScript type everything based on your config
type Conf = typeof tamaguiConfig
declare module '@tamagui/core' {
  interface TamaguiCustomConfig extends Conf {}
}

export default function App() {
  const [toNumber, setToNumber] = useState('');
  const [fromNumber, setFromNumber] = useState('');
  const [messageBody, setBody] = useState('');

  const handleSubmit = async () => {
    try {
      const response = await fetch('http://localhost:3000/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to: toNumber,
          from: fromNumber,
          body: messageBody,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      // Handle result...
      console.log(result);
      Alert.alert('Success', 'Message sent successfully');
    } catch (error) {
      console.error('There was an error!', error);
      Alert.alert('Error', 'Failed to send message');
    }
  };

  return (
    <ApolloProvider client={client}>
      <TamaguiProvider config={tamaguiConfig}>
      <Theme name="dark">
        {/* Using YStack for vertical layout */}
        <Theme name="yellow">
        <YStack space="$4" alignItems="center" paddingTop="$10">
          
          <Input
            placeholder="To Number"
            value={toNumber}
            onChangeText={setToNumber}
          />
          <Input
            placeholder="From Number"
            value={fromNumber}
            onChangeText={setFromNumber}
          />
          <Input
            placeholder="Message"
            value={messageBody}
            onChangeText={setBody}
          />
          
          <Button onPress={handleSubmit}>Submit</Button>
        </YStack>
        </Theme>
        <StatusBar style="auto" />
      </Theme>
      </TamaguiProvider>

    </ApolloProvider>
  );
}

