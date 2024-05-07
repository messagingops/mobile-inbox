import * as React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image } from 'react-native';

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

export default function MainContainer() {
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

                    return <Image source={iconName} style={{ width: 30, height: 30, tintColor: color, marginBottom: 10, marginRight: 20 }}/>;
                },
            })}
            tabBarOptions={{
                activeTintColor: 'blue',
                inactiveTintColor: 'grey',
                labelStyle: { paddingBottom: 10, fontSize: 10 },
                style: { padding: 10, height: 100, paddingBottom: 50 }
            }}
            >
                <Tab.Screen name={conversationsName} component={ConversationScreen} options={{title: ''}}/>
                <Tab.Screen name={contactsName} component={ContactsScreen} options={{title: ''}}/>
                <Tab.Screen name={wavesName} component={WavesScreen} options={{title: ''}} />

            </Tab.Navigator>
        </NavigationContainer>
    );
}