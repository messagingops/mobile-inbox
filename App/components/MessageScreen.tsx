import { Text, StyleSheet } from 'react-native'
import React from 'react'
import Icon from './Icons'
import { TamaguiProvider, TextArea, Theme, Button } from 'tamagui'
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
            <View style={styles.bottom}>
              <TextArea style={styles.textArea} placeholder="Type a message..." borderWidth={0}/>  
              <Button style={styles.buttonOne} icon={<AlarmClock size={24} color="#EDEDED" />}></Button>
              <Button style={styles.buttonTwo} icon={<ArrowRight size={24} color="#EDEDED" />}></Button>
            </View>
          </View>
      </Theme>
    </TamaguiProvider>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 32, // Padding for everything left and right
        backgroundColor: '#FFF',
    },
    top: {
        marginTop: 64,
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
        marginTop: 64, 
        flexDirection: 'row',
        alignItems: 'center',
    },
    textArea: {
      fontSize: 18, 
      backgroundColor: "#FFF",
      color: "#2E2E2E",
    },
    buttonOne: {
      width: 33,
      height: 33,
      backgroundColor: "#2E2E2E", 
      borderTopRightRadius: 0, // Rounded top-left corner
      borderBottomRightRadius: 0, // Rounded bottom-left corner
      marginRight: 1,
    }, 
    buttonTwo: {
      width: 33,
      height: 33,
      backgroundColor: "#2E2E2E", 
      borderTopLeftRadius: 0, // Rounded top-right corner
      borderBottomLeftRadius: 0, // Rounded bottom-right corner
    }
   
})

export default MessageScreen