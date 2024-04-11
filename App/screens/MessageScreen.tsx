import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import Icon from '../components/Icons'

const MessageScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.top}>
            
            <Icon name="ArrowLeft" color="#707070" size={24}/>        
            <Text style={styles.title}>Jerry Wu</Text>
        </View>
    </View>
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
   
})

export default MessageScreen