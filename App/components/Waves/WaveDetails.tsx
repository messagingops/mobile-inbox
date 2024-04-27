import React from 'react';
import { View, Text } from 'react-native';

interface WaveDetailsProps {
    wave: {
        name: string;
        date: string;
        recipients: string[];
        message: string[];
    };
}

const WaveDetails: React.FC<WaveDetailsProps> = ({ wave })=> {
    return (
        <View>
            <Text>{wave.name}</Text>
            <Text>{wave.date}</Text>
            <Text>Recipients: {wave.recipients.join(', ')}</Text>
            <Text>{wave.message}</Text>
        </View>
    );
};

export default WaveDetails;