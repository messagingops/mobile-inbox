import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Import your components for Contacts, Conversations, and Waves
import ContactsList from './ContactsList';
import ConversationList from './Conversations/ConversationList';
import WaveList from './Waves/WaveList';

// Create a bottom tab navigator
const Tab = createBottomTabNavigator();

// Define the navigation structure
const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Contacts" component={ContactsList} />
        <Tab.Screen name="Conversations" component={ConversationList} />
        <Tab.Screen name="Waves" component={WaveList} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;