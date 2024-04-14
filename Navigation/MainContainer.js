import * as React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Screens
import ConversationScreen from './screens/ConversationsScreen';
import ContactsScreen from './screens/ContactsScreen';
import WavesScreen from './screens/WavesScreen';

// Screen names
const conversationsName = 'Conversations';
const contactsName = 'Contacts';
const wavesName = 'Waves';

const Tab = createBottomTabNavigator();

export default function MainContainer() {
    return(
        <NavigationContainer>
            <Tab.Navigator initialRouteName={conversationsName}
            screenOptions={({route}) => ({
                tabBarIcon: ({focused, color, size}) => {
                    let iconName;
                    let rn = route.name;

                    if (rn === conversationsName) {
                        iconName = focused ? 'chatbubbles' : 'chatbubbles-outline'
                    } else  if (rn === contactsName) {
                        iconName = focused ? 'list' : 'list-outline'
                    } else if (rn === wavesName) {
                        iconName = focused ? 'settings' : 'settings-outline';
                    }

                    return <Ionicons name={iconName} size={size} color={color}/>
                },
            })}
            tabBarOptions={{
                activeTintColor: 'blue',
                inactiveTintColor: 'grey',
                labelStyle: { paddingBottom: 10, fontSize: 10 },
                style: { padding: 10, height: 70 }
            }}
            >
                <Tab.Screen name={conversationsName} component={ConversationScreen}/>
                <Tab.Screen name={contactsName} component={ContactsScreen}/>
                <Tab.Screen name={wavesName} component={WavesScreen}/>

            </Tab.Navigator>
        </NavigationContainer>
    )
}