import React, { useState } from 'react';
import { View, TextInput, Button } from 'react-native';

interface CreateConversationProps {
    onCreate: (name: string) => void;
}

const CreateConversations: React.FC<CreateConversationProps> = ({ onCreate }) => {
    const [name, setName] = useState('');

    const handleCreate = () => {
        onCreate(name);
        setName('');
    };

    return (
        <View>
            <TextInput
                placeholder="Conversation Name"
                value={name}
                onChangeText={setName}
            />
            <Button title="Create Conversation" onPress={handleCreate} />
        </View>
    );
};

export default CreateConversations;