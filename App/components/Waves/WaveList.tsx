import React from 'react';
import { View, Text } from 'react-native';

interface Wave {
    id: number;
    name: string;
    date: string;
    messagePreview: string;
}

interface WaveListProps {
    waves: Wave[];
}

const WaveList: React.FC<WaveListProps> = ({ waves }) => {
    return (
        <View>
            {waves.map((wave) => (
                <View key={wave.id}>
                    <Text>{wave.name}</Text>
                    <Text>{wave.date}</Text>
                    <Text>{wave.messagePreview}</Text>
                </View>
            ))}
        </View>
    );
};

export default WaveList;