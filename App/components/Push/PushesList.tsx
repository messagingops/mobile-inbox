import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

type PushesListProps = {
};

const PushesList: React.FC<PushesListProps> = ({}) => {
    return (
        <View>
            <Text>
                hi
            </Text>
        </View>
    )
};

const styles = StyleSheet.create({
  
  
  container: {
    marginLeft: 32,
    marginRight: 32,
    marginTop: 24,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  rightWithIcon: {
    flexDirection: 'row',
    marginTop: -16,
    alignItems: 'center', 
  },
  icon: {
    marginLeft: 4, 
  },
  leftColumn: {
    flexDirection: 'column',
    justifyContent: 'center',
  },
  rightColumn: {
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
  contactName: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#505050',
    
  },
  message: {
    marginTop: 8,
    color: '#A0A0A0',
    fontSize: 16,
    marginBottom: 16,
    
  },
  date: {
    fontSize: 14,
    fontStyle: 'italic',
    color: '#7E7E7E',
  },
  time: {
    fontSize: 14,
    fontStyle: 'italic',
    color: '#7E7E7E',
  },
});

export default ContactItem;
