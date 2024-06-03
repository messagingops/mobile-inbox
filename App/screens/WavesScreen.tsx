import React from 'react';
import { SafeAreaView, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { CirclePlus } from 'lucide-react-native';
import ViewPushScreen from './ViewPush';
import CreateNewPushScreen from './CreatePush';
import { useNavigation } from '@react-navigation/native';
import TopNavigation from '../navigation/TopNavigation';

interface Push {
  id: number;
  name: string;
  message: string;
  date: string;
  time: string;
}

const WavesScreen = () => {
  const navgiation = useNavigation();
  const pushes: Push[] = [
    {
      id: 1,
      name: 'Push 1',
      message: 'Message',
      date: '10/10/10',
      time: '11:59AM',
    },
    {
      id: 2,
      name: 'Push 2',
      message: 'Message',
      date: '10/10/10',
      time: '11:59AM',
    },
    {
      id: 3,
      name: 'Push 3',
      message: 'Message',
      date: '10/10/10',
      time: '11:59AM',
    },
  ];

  const renderPush = (push: Push) => {
    return (
      <TouchableOpacity key={push.id} style={styles.pushContainer} onPress={() => {}}>
        <View style={styles.pushContent}>
          <Text style={styles.pushName}>{push.name}</Text>
          <Text style={styles.pushMessage}>{push.message}</Text>
          <Text style={styles.pushDate}>{push.date} {push.time}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <CreateNewPushScreen navigation={navgiation}></CreateNewPushScreen>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  headerView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  pushList: {
    flex: 1,
    //paddingHorizontal: 16,
  },
  pushContainer: {
    backgroundColor: '#fff',
    padding: 16,
    marginVertical: -1,
    borderRadius: 0,
    borderColor: '#e0e0e0',
    borderWidth: 1,
  },
  pushContent: {
    flexDirection: 'column',
  },
  pushName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  pushMessage: {
    fontSize: 16,
    color: '#757575',
  },
  pushDate: {
    fontSize: 14,
    color: '#bdbdbd',
    alignSelf: 'flex-end',
  },
});

export default WavesScreen;
