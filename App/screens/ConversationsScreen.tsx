import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native'
import React from 'react'
import Icon from '../components/Icons'
import ContactTab from '../components/Conversations/ContactTab'

interface ContactItem {
    name: string;
    message: string;
    date: string;
    time: string;
  }

const data: ContactItem[] = [
    {
        name: "Jerry Wu",
        message: "Hello, this is a test", 
        date: '04/11/24',
        time: '- 12:23pm',
    },
    {
        name: "Daniel Kim",
        message: "Hello, this is a test", 
        date: '04/11/24',
        time: '- 12:23pm',
    },
    {
        name: "Danielle Koay",
        message: "Hello, this is a test", 
        date: '04/11/24',
        time: '- 12:23pm',
    },
    {
        name: "Avery Li",
        message: "Hello, this is a test", 
        date: '04/11/24',
        time: '- 12:23pm',
    },
    {
        name: "Jerry Wu",
        message: "Hello, this is a test", 
        date: '04/11/24',
        time: '- 12:23pm',
    },
    {
        name: "Daniel Kim",
        message: "Hello, this is a test", 
        date: '04/11/24',
        time: '- 12:23pm',
    },
    {
        name: "Danielle Koay",
        message: "Hello, this is a test", 
        date: '04/11/24',
        time: '- 12:23pm',
    },
    {
        name: "Avery Li",
        message: "Hello, this is a test", 
        date: '04/11/24',
        time: '- 12:23pm',
    },
]

const ConversationsScreen = () => {
  
    const handlePress = (item: ContactItem) => {
        
    };

    const renderItem = ({ item }: { item: ContactItem }) => (
        <TouchableOpacity onPress={() => handlePress(item)}>
          <ContactTab
            contactName={item.name}
            message={item.message}
            date={item.date}
            time={item.time}
          />
        </TouchableOpacity>
      );

  return (
    
    <View style={styles.container}>
        <View style={styles.top}>
            <Text style={styles.edit}>Edit</Text>
            <Icon name="CirclePlus" color="#707070" size={24}/>        
        </View>
        <Text style={styles.title}>Conversations</Text>
        <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            showsVerticalScrollIndicator={false}
        />

    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 32, // Padding for everything left and right
        backgroundColor: '#FFF',
    },
    edit: {
        color: '#2E2E2E',
        fontSize: 14,
    },
    top: {
        marginTop: 64, 
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    title: {
        fontSize: 32,
        fontWeight: "bold",
        marginBottom: 32,
    },
   
})

export default ConversationsScreen