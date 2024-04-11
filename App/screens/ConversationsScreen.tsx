import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import Icon from '../components/Icons'

const ConversationsScreen = () => {
  


  return (
    <View style={styles.container}>
        <View style={styles.top}>
            <Text style={styles.edit}>Edit</Text>
            <Icon name="CirclePlus" color="#707070" size={24}/>        
        </View>
      

    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 48, // Padding for everything left and right
        backgroundColor: '#FFF',
    },
    edit: {
        color: '#2E2E2E',
        fontSize: 14,
    },
    top: {
        marginTop: 80, 
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    }
})

export default ConversationsScreen