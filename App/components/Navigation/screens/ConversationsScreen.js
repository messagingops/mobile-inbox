import * as React from 'react';
import { View, Text } from 'react-native';
import * as Font from 'expo-font';

// Load custom fonts
async function loadFonts() {
    await Font.loadAsync({
        Poppins: require('../Poppins-Regular.ttf'), // Adjust the path based on your project structure
        // Add other fonts if needed
    });
}

export default function ConversationScreen({navigation}) {
    React.useEffect(() => {
        loadFonts();
    }, []);

    return(
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', width: '100%', backgroundColor: 'white' }}>
            <Text onPress={() => alert('This is the "Home" screen.')}
            style={{ fontSize: 26, fontWeight: 'bold', fontFamily: 'Poppins' }}>Conversations</Text>
        </View>
    )
}