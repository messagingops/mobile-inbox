import { Text, StyleSheet, TextInput, Platform, KeyboardAvoidingView, ScrollView } from 'react-native'
import React from 'react'
import Icon from './Icons'
import { TamaguiProvider, TextArea, Theme, Button} from 'tamagui'
import { View ,createTamagui} from '@tamagui/core';
import { config } from '@tamagui/config/v3'
import { AlarmClock, ArrowRight } from '@tamagui/lucide-icons'
import { MoveRight } from 'lucide-react-native';


// you usually export this from a tamagui.config.ts file
const tamaguiConfig = createTamagui(config)

// make TypeScript type everything based on your config
type Conf = typeof tamaguiConfig
declare module '@tamagui/core' {
  interface TamaguiCustomConfig extends Conf {}
}


const MessageScreen = () => {
  return (
    <TamaguiProvider config={tamaguiConfig}>
      <Theme name="light">
        <View style={styles.container}>
          <View style={styles.top}>
            <Icon name="ArrowLeft" color="#707070" size={24}/>        
            <Text style={styles.title}>Jerry Wu</Text>
          </View>
          <KeyboardAvoidingView
            style={styles.bottom}
            
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
         >
            <ScrollView>
              <View style={styles.bottom}>
                <TextInput 
                  style={styles.input}
                  placeholder="Type a message..."
                  placeholderTextColor="#ccc"
                />
                <Button style={styles.buttonOne} icon={<AlarmClock size={24} color="#161616" />} />
                <Button style={styles.buttonTwo} icon={<ArrowRight size={24} color="#161616" />} />
              </View>
            </ScrollView>
          </KeyboardAvoidingView>
        </View>
      </Theme>
    </TamaguiProvider>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 32, // Padding for everything left and right
        backgroundColor: '#FFF',
        justifyContent: 'space-between', // This pushes the bottom bar to the bottom
    },
    top: {
        marginTop: 80,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between', // This will position the icon and placeholder at the extremes
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        flex: 1,
        marginLeft: -24,
        textAlign: 'center', // This will center the title text
    },
    bottom: {
        flexDirection: 'row',
        paddingBottom: 30, 
    },
    keyboard: {
      flexDirection: 'row',
      alignItems: 'center',
  },
    input: {
        flex: 1,
        minHeight: 44, // Adjust based on your needs
        padding: 10,
        backgroundColor: '#FFF',
        borderColor: '#CCC', // To match your theme
        borderWidth: 0,
        borderRadius: 22, // Rounded corners
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
    }, 
    buttonTwo: {
      width: 33,
      height: 33,
      backgroundColor: "#EDEDED", 
      borderTopLeftRadius: 0, // Rounded top-right corner
      borderBottomLeftRadius: 0, // Rounded bottom-right corner
    }
});

export default MessageScreen