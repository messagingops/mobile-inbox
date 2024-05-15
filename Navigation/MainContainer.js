import * as React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Image, Text } from 'react-native';
import * as Font from 'expo-font';

// Screens
import conversationsIcon from './conversations.png';
import contactsIcon from './contacts.png';
import pushesIcon from './pushes.png';

// Screens
import ConversationScreen from './screens/ConversationsScreen';
import ContactsScreen from './screens/ContactsScreen';
import WavesScreen from './screens/WavesScreen';

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

export default function MainContainer() {
    React.useEffect(() => {
        loadFonts();
    }, []);

    return(
        <NavigationContainer>
            <Tab.Navigator initialRouteName={conversationsName}
            screenOptions={({route}) => ({
                tabBarIcon: ({color, size}) => {
                    let iconName;
                    let rn = route.name;

                    if (rn === conversationsName) {
                        iconName = conversationsIcon;
                    } else  if (rn === contactsName) {
                        iconName = contactsIcon;
                    } else if (rn === wavesName) {
                        iconName = pushesIcon;
                    }

                    return <Image source={iconName} style={{ width: 30, height: 30, tintColor: color, marginBottom: 10 }}/>;
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
                        <View style={{ alignItems: 'center' }}>
                            <Text style={{ color, fontSize: 12, fontFamily: 'Poppins' }}>{label}</Text>
                            <View
                                    style={{
                                        width: '100%',
                                        height: 10,
                                        backgroundColor: focused ? 'gold' : 'transparent',
                                    }}
                                />
                        </View>
                    );
                },
            })}
            tabBarOptions={{
                activeTintColor: 'black',
                inactiveTintColor: 'grey',
                labelStyle: { paddingBottom: 10, fontSize: 10 },
                style: { padding: 10, height: 100, paddingBottom: 50 },
                elevation: 0,
            }}
            >
                <Tab.Screen name={conversationsName} component={ConversationScreen} options={{title: ''}} />
                <Tab.Screen name={wavesName} component={WavesScreen} options={{title: ''}} />
                <Tab.Screen name={contactsName} component={ContactsScreen} options={{title: ''}} />

            </Tab.Navigator>
        </NavigationContainer>
    );
}