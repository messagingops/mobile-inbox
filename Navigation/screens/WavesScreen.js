import * as React from 'react';
import { View, Text } from 'react-native';

export default function WavesScreen({navigation}) {
    return(
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', width: '100%', backgroundColor: 'white' }}>
            <Text onPress={() => navigation.navigate('Home')}
            style={{ fontSize: 26, fontWeight: 'bold' }}>Waves</Text>
        </View>
    )
}