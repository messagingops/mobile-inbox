// components related to managing conversations

import React from 'react';
import { View, Text } from 'react-native/types';

interface Message {
    id: number;
    text: string;
    sender: string;
    timestamp: string;
}

interface ConversationDetailsProps {
    conversation: {
        id: number;
        name: string;
        messages: Message[];
    };
}

const ConversationDetails: React.FC<ConversationDetailsProps> = ({ conversation }) => {
    return (
        <View>
            <Text>{conversation.name}</Text>
            {conversation.messages.map((message) => (
                <View key={message.id}>
                    <Text>{message.text}</Text>
                    <Text>{message.sender}</Text>
                    <Text>{message.timestamp}</Text>
                </View>
            ))}
        </View>
    );
};

export default ConversationDetails;