import React from 'react';
import { View, Text } from 'react-native/types';

interface Conversation {
    id: number;
    name: string;
}

const ConversationList = () => {
    const conversations: Conversation[] = [
        { id: 1, name: 'Conversation 1' },
        { id: 2, name: 'Conversation 2' },
        { id: 3, name: 'Conversation 3' },
    ];

    // render one conversation
    const renderConversation = (conversation: Conversation) => {
        return (
            <View key={conversation.id}>
                <Text>{conversation.name}</Text>
            </View>
        );
    };

    return (
        <View>
            {conversations.map((conversation) => renderConversation(conversation))}
        </View>
    )
}