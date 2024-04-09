import React from 'react';
import { View, Text } from 'react-native/types';

interface Contact {
    id: number;
    name: string;
}

const ContactsList = () => {
    // dummy data
    const contacts: Contact[] = [
        {id: 1, name: 'John Doe'},
        {id: 2, name: 'Jane Smith'},
        {id: 3, name: 'Alice Johnson'},
    ];

    // render one contact
    const renderContact = (contact: Contact) => {
        return (
            <View key={contact.id}>
                <Text>{contact.name}</Text>
            </View>
        );
    };

    return (
        <View>
            {contacts.map((contact) => renderContact(contact))}
        </View>
    );
};

export default ContactsList;