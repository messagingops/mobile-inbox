// components related to managing waves

import React, { useState } from 'react';
import { View, TextInput, Button } from 'react-native/types';

interface CreateWaveProps {
    onCreate: (wave: Wave) => void;
}

interface Wave {
    name: string;
    recipientList: string[];
    message: string;
}

const CreateWave: React.FC<CreateWaveProps> = ({ onCreate }) => {
    const [wave, setWave] = useState<Wave>({ name: '', recipientList: [], message: '' });
    
    const handleCreate = () => {
        onCreate(wave);
        setWave({ name: '', recipientList: [], message: '' });
    };

    return (
        <View>
            <TextInput
                placeholder="Wave Name"
                value={wave.name}
                onChangeText={(text) => setWave({ ...wave, name: text })}
            />
            <Button title="Create Wave" onPress={handleCreate} />
        </View>
    );
};

export default CreateWave;