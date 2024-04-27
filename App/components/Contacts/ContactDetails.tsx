// components related to managing contacts

import React from 'react';
import { View, Text } from 'react-native/types';

interface Contact {
    name: string;
    phoneNumber: string;
}

const ContactDetails = () => {
    const contact: Contact = {
        name: 'John Doe',
        phoneNumber: '123-456-7890',
    };

    return (
        <View>
            <Text>{contact.name}</Text>
            <Text>{contact.phoneNumber}</Text>
        </View>
    );
};

export default ContactDetails;