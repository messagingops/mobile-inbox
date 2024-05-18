// credit to https://shiggins95.medium.com/create-a-smooth-segmented-text-input-in-react-native-30a2cd06f8c7 

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
}

interface RefMapping {
  [key: number]: TextInput | null;
}

const SegmentedInput: FC<SegmentedInputProps> = ({ length, onChange }) => {
  const refs = useRef<RefMapping>({});
  const [code, setCode] = useState(Array.from({ length: length }, () => ''));
  const [focusedIndex, setFocusedIndex] = useState(0);
  const { width } = Dimensions.get('window');

  const handleType = (value: string, index: number) => {
    // check if there is no value but there previously was a value
    const hasDeleted = !value && code[index] !== '';
    // map through the current code and alter the current value that's been edited
    const currentCode = code.map((curr, i) => {
      if (i === index) {
        return value;
      }
      return curr;
    });

    // if we haven't deleted, and we aren't on the last input, then move onto the next ref
    if (!hasDeleted && index < length - 1) {
      refs.current[index + 1]?.focus();
    }
    // set local state (array) code
    setCode(currentCode);

    // set the parent components state. As this expects a string, we can just use .join('')
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
    // listen for the backspace key being pressed and if we aren't on the first input then move the focused input back
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
              {
                width: 
                  (width - 
                    (length - 1) * 10 -
                    45) /
                  length,
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