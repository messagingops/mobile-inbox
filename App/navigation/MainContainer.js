import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Image, Text } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import * as Font from 'expo-font';
import { LogBox } from 'react-native';

LogBox.ignoreLogs(['Warning: ...']); 


// Icons
import conversationsIcon from './conversations.png';
import contactsIcon from './contacts.png';
import pushesIcon from './pushes.png';

// Screens
import ConversationsScreen from '../screens/ConversationsScreen';
import ContactsScreen from '../screens/ContactsScreen';
import WavesScreen from '../screens/WavesScreen';
import MessageScreen from '../components/MessageScreen'
// Screen names
const conversationsName = 'Conversations';
const contactsName = 'Contacts';
const wavesName = 'Waves';

const Tab = createBottomTabNavigator();

// Load custom fonts
async function loadFonts() {
    await Font.loadAsync({
        Poppins: require('./Poppins-Regular.ttf'), // Adjust the path based on your project structure
        // Add other fonts if needed
    });
}

const ConversationStack = createStackNavigator();

function ConversationStackScreen() {
    return (
        <ConversationStack.Navigator>
            <ConversationStack.Screen 
                name="Conversations" 
                component={ConversationsScreen} 
                options={{ headerShown: false }}
                
            />
            <ConversationStack.Screen 
                name="MessageScreen" 
                component={MessageScreen} 
                options={{ headerShown: false}} 
                
            />
        </ConversationStack.Navigator>
    );
}

export default function MainContainer() {
    React.useEffect(() => {
        loadFonts();
    }, []);

    return (
        <NavigationContainer>
            <Tab.Navigator
                initialRouteName={conversationsName}
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName;
                        let rn = route.name;

                        if (rn === conversationsName) {
                            iconName = conversationsIcon;
                        } else if (rn === contactsName) {
                            iconName = contactsIcon;
                        } else if (rn === wavesName) {
                            iconName = pushesIcon;
                        }

                        return (
                            <Image
                                source={iconName}
                                style={{
                                    width: 30,
                                    height: 30,
                                    tintColor: color,
                                    marginBottom: focused ? 15 : 10, // Moves the icon up when focused
                                }}
                            />
                        );
                    },
                    tabBarLabel: ({ focused, color }) => {
                        let label;

                        if (route.name === conversationsName) {
                            label = 'Conversations';
                        } else if (route.name === contactsName) {
                            label = 'Contacts';
                        } else if (route.name === wavesName) {
                            label = 'Push';
                        }

                        return (
                            <View style={{ alignItems: 'center', transform: [{ translateY: focused ? -5 : 0 }] }}>
                                <Text style={{ color, fontSize: 12, fontFamily: 'Poppins' }}>{label}</Text>
                                <View
                                    style={{
                                        width: label.length * 8,
                                        height: 5,
                                        backgroundColor: focused ? 'yellow' : 'transparent',
                                        marginTop: 5,
                                    }}
                                />
                            </View>
                        );
                    },

                    tabBarStyle: {
                        height: 120, 
                      },
                })}
                tabBarOptions={{
                    activeTintColor: 'black',
                    inactiveTintColor: 'grey',
                    labelStyle: { paddingBottom: 10, fontSize: 10 },
                    style: { padding: 10, height: 120, paddingBottom: 50 },
                    elevation: 0,
                }}
            >
                <Tab.Screen 
                    name="Conversations" 
                    component={ConversationStackScreen} 
                    options={{ title: '', headerShown: false }}
                />
                <Tab.Screen name={wavesName} component={WavesScreen} options={{ title: '', headerShown: false }} />
                <Tab.Screen name={contactsName} component={ContactsScreen} options={{ title: '', headerShown: false }} />
            </Tab.Navigator>
        </NavigationContainer>
    );
}