import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native'
import React from 'react'
import Icon from '../components/Icons'
import ContactTab from '../components/Conversations/ConversationTab'
import { useNavigation } from '@react-navigation/native';


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
        time: '12:23pm',
    },
    {
        name: "Daniel Kim",
        message: "Hello, this is a test", 
        date: '04/11/24',
        time: '12:23pm',
    },
    {
        name: "Danielle Koay",
        message: "Hello, this is a test", 
        date: '04/11/24',
        time: '12:23pm',
    },
    {
        name: "Avery Li",
        message: "Hello, this is a test", 
        date: '04/11/24',
        time: '12:23pm',
    },
    {
        name: "Jerry Wu",
        message: "Hello, this is a test", 
        date: '04/11/24',
        time: '12:23pm',
    },
    {
        name: "Daniel Kim",
        message: "Hello, this is a test", 
        date: '04/11/24',
        time: '12:23pm',
    },
    {
        name: "Danielle Koay",
        message: "Hello, this is a test", 
        date: '04/11/24',
        time: '12:23pm',
    },
    {
        name: "Avery Li",
        message: "Hello, this is a test", 
        date: '04/11/24',
        time: '12:23pm',
    },
]

const ConversationsScreen = () => {
  

    const navigation = useNavigation();

    const handlePress = (item: ContactItem) => {
        // @ts-ignore
        navigation.navigate('MessageScreen', { contact: item });
    };
    
    const renderItem = ({ item }: { item: ContactItem }) => (
        <TouchableOpacity onPress={() => handlePress(item)}>
            <View style={styles.divider} />
        
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
            <Text style={styles.title}>Conversations</Text>
            <Icon name="CirclePlus" color="#707070" size={24}/>        
        </View>
        
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
        backgroundColor: '#FFF',
    },
    
    top: {
        marginTop: 80, 
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 32,
        marginLeft: 32,
        marginRight: 32,
    },
    title: {
        fontSize: 32,
        fontWeight: "bold",
      
    },
    divider: {
        height: 1,
        backgroundColor: '#EDEDED', // Choose a color that fits your theme
      },
   
})

export default ConversationsScreen