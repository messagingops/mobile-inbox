import React, { FC, Dispatch, useState, useRef } from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  Dimensions,
  NativeSyntheticEvent,
} from 'react-native';
import { TextInputKeyPressEventData } from 'react-native/Libraries/Components/TextInput/TextInput';

interface SegmentedInputProps {
  length: number;
  onChange: Dispatch<string>;
  failed?: boolean; // New prop for failure state
}

interface RefMapping {
  [key: number]: TextInput | null;
}

const SegmentedInput: FC<SegmentedInputProps> = ({ length, onChange, failed }) => {
  const refs = useRef<RefMapping>({});
  const [code, setCode] = useState(Array.from({ length: length }, () => ''));
  const [focusedIndex, setFocusedIndex] = useState(0);
  const { width } = Dimensions.get('window');

  const handleType = (value: string, index: number) => {
    const hasDeleted = !value && code[index] !== '';
    const currentCode = code.map((curr, i) => {
      if (i === index) {
        return value;
      }
      return curr;
    });

    if (!hasDeleted && index < length - 1) {
      refs.current[index + 1]?.focus();
    }
    setCode(currentCode);
    onChange(currentCode.join(''));
  };

  const handleChange = async (value: string, index: number) => {
    if (value.length > 1) {
      return;
    }
    handleType(value, index);
  };

  const handleKeyPress = (
    event: NativeSyntheticEvent<TextInputKeyPressEventData>,
    index: number,
  ) => {
    if (event.nativeEvent.key === 'Backspace' && index !== 0 && !code[index]) {
      refs.current[index - 1]?.focus();
    }
  };

  return (
    <View style={styles.inputsContainer}>
      {Array.from({ length }, (_, i) => i).map((_, i) => {
        const isFocused = i === focusedIndex;
        return (
          <TextInput
            onFocus={() => setFocusedIndex(i)}
            onKeyPress={(e) => handleKeyPress(e, i)}
            ref={(el) => (refs.current[i] = el)}
            key={_}
            value={code[i]}
            onChangeText={(value) => handleChange(value, i)}
            style={[
              styles.input,
              isFocused ? styles.focused : null,
              failed ? styles.failed : null,
              {
                width: (width - (length - 1) * 10 - 45) / length,
              },
            ]}
            keyboardType='numeric'
          />
        );
      })}
    </View>
  );
};

export const styles = StyleSheet.create({
  inputsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 0,
    marginBottom: 30,
    position: 'relative',
  },
  failed: {
    borderColor: 'red', // Red border color for failed state
  },  
  input: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 70,
    borderRadius: 4,
    zIndex: -1,
    marginLeft: 5,
    textAlign: 'center',
    backgroundColor: '#EDEDED',
  },
  focused: {
    borderWidth: 1,
  },
});

export default SegmentedInput;