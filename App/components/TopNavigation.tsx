import React from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';

interface TopNavigationProps {
  selectedScreen: string;
  setSelectedScreen: React.Dispatch<React.SetStateAction<string>>;
}

const TopNavigation: React.FC<TopNavigationProps> = ({ selectedScreen, setSelectedScreen }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[
          styles.half,
          selectedScreen === 'Contacts' && { backgroundColor: 'yellow' },
          { borderTopLeftRadius: 15, borderBottomLeftRadius: 15 },
        ]}
        onPress={() => setSelectedScreen('Contacts')}
      >
        <Text style={styles.text}>Contacts</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.half,
          selectedScreen === 'Lists' && { backgroundColor: 'yellow' },
          { borderTopRightRadius: 15, borderBottomRightRadius: 15 },
        ]}
        onPress={() => setSelectedScreen('Lists')}
      >
        <Text style={styles.text}>Lists</Text>
      </TouchableOpacity>
    </View>
  );
};

export default TopNavigation;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '50%',
    alignSelf: 'center',
    height: 50,
    backgroundColor: 'white',
    marginVertical: 10,
    borderRadius: 15, // Add border radius for the container
  },
  half: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'black',
    borderWidth: 1,
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
