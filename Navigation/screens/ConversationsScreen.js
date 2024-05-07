import * as React from 'react';
import { View, Text } from 'react-native';

export default function ConversationScreen({navigation}) {
    return(
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', width: '100%' }}>
            <Text onPress={() => alert('This is the "Home" screen.')}
            style={{ fontSize: 26, fontWeight: 'bold' }}>Conversations</Text>
        </View>
    )
}