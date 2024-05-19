import { Text, StyleSheet, TextInput, Platform, KeyboardAvoidingView, ScrollView, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import Icon from './Icons'
import { TamaguiProvider, TextArea, Theme, Button} from 'tamagui'
import { View ,createTamagui} from '@tamagui/core';
import { config } from '@tamagui/config/v3'
import { AlarmClock, ArrowRight } from '@tamagui/lucide-icons'
import { MoveRight } from 'lucide-react-native';
import SentMessage from './SentMessage';
import ReceivedMessage from './ReceivedMessage';

import { useRoute } from '@react-navigation/native';

import { useNavigation } from '@react-navigation/native';




// you usually export this from a tamagui.config.ts file
const tamaguiConfig = createTamagui(config)

// make TypeScript type everything based on your config
type Conf = typeof tamaguiConfig
declare module '@tamagui/core' {
  interface TamaguiCustomConfig extends Conf {}
}


const MessageScreen = () => {

  

  const [messages, setMessages] = useState([
    { id: 1, text: "Hello there!", type: 'received' },
    { id: 2, text: "Hi! How are you?", type: 'sent' },
    { id: 3, text: "Hi! How are you? like bruh bruh bruh bruhbruhbuhruiehfivuhrqiuhviuerh", type: 'sent' }
  ]);

  const navigation = useNavigation();
  const route = useRoute();

  useEffect(() => {
        navigation.getParent()?.setOptions({ tabBarStyle: { display: 'none' }, tabBarVisible: false });
        return () =>
            navigation.getParent()?.setOptions({ tabBarStyle: undefined, tabBarVisible: undefined });
    }, [navigation]);
  // @ts-ignore
  const { contact } = route.params;

  return (
    <TamaguiProvider config={tamaguiConfig}>
      <Theme name="light">
        <View style={styles.container}>
        <View style={styles.top}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Icon name="ArrowLeft" color="#707070" size={24} />
          </TouchableOpacity>
          <Text style={styles.title}>Jerry Wu</Text>
        </View>
          <KeyboardAvoidingView style={styles.bottom} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <ScrollView style={{flex: 1}}>
              {messages.map(message => 
                message.type === 'sent' ? 
                  <SentMessage key={message.id} message={message.text} /> : 
                  <ReceivedMessage key={message.id} message={message.text} />
              )}
            </ScrollView>
            <View style={styles.inputArea}>
              <TextInput style={styles.input} selectionColor="#EFE811" placeholder="Type a message..." placeholderTextColor="#2E2E2E" />
              <Button style={styles.buttonOne} icon={<Icon name="AlarmClock" size={24} color="#161616" />} />
              <Button style={styles.buttonTwo} icon={<Icon name="ArrowRight" size={24} color="#161616" />} />
            </View>
          </KeyboardAvoidingView>
        </View>
      </Theme>
    </TamaguiProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
    backgroundColor: '#FFF',
    justifyContent: 'space-between',
  },
  top: {
    marginTop: 80,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',  // Ensures elements are spaced evenly
    marginBottom: 20,
    backgroundColor: '#FFF', 
    paddingHorizontal: 32,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginRight: 24,
    flex: 1,  // Allows the title to use available space and center properly
  },
  backButton: {
    width: 24,  // Ensures a minimum touchable area
    height: 24,  // Ensures a minimum touchable area
    justifyContent: 'center',  // Center icon vertically
    alignItems: 'center',  // Center icon horizontally
  },
  bottom: {
    flex: 1,
    flexDirection: 'column',
    paddingBottom: 30,
    
  },
  inputArea: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 40,
    paddingBottom: 20,
    minHeight: 91,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -3 },  // Negative Y-offset makes the shadow go upwards
    shadowOpacity: 0.1,
    shadowRadius: 3,
   backgroundColor: '#FFF', 


  },
  input: {
    flex: 1,
    minHeight: 33,
    padding: 10,
    backgroundColor: '#FFF',
    borderColor: '#CCC',
    borderWidth: 0,
    borderRadius: 22,
    marginRight: 10,
    fontSize: 18,
  },
  buttonOne: {
    width: 33,
      height: 33,
      backgroundColor: "#EDEDED", 
      borderTopRightRadius: 0, // Rounded top-left corner
      borderBottomRightRadius: 0, // Rounded bottom-left corner
      marginRight: 1,
      shadowColor: '#000',  // Defines the color of the shadow
    shadowOffset: { width: 0, height: 5.09 },  // Specifies the X and Y offset of the shadow
    shadowOpacity: 0.25,  // The opacity of the shadow
    shadowRadius: 5.09,  // The blur radius of the shadow
    elevation: 5.09,  // For Android, adds a material design elevation shadow
  },
  buttonTwo: {
    width: 33,
    height: 33,
    backgroundColor: "#EDEDED", 
    borderTopLeftRadius: 0, // Rounded top-right corner
    borderBottomLeftRadius: 0, // Rounded bottom-right corner
    shadowColor: '#000',  // Defines the color of the shadow
    shadowOffset: { width: 0, height: 5.09 },  // Specifies the X and Y offset of the shadow
    shadowOpacity: 0.25,  // The opacity of the shadow
    shadowRadius: 5.09,  // The blur radius of the shadow
    elevation: 5.09,  // For Android, adds a material design elevation shadow
  }
});

export default MessageScreen;
