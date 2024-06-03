import React from 'react';
import { SafeAreaView, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { ArrowLeft } from 'lucide-react-native';

interface Push {
  id: number;
  name: string;
  message: string;
  date: string;
  time: string;
}

const ViewPushScreen = ({ push }: { push: Push }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerView}>
        <TouchableOpacity>
          <ArrowLeft color="black" size={24} />
        </TouchableOpacity>
        <Text style={styles.headerText}>{push.name}</Text>
        <View style={{ width: 24 }} />
      </View>
      <View style={styles.detailsContainer}>
        <View style={styles.row}>
          <Text style={styles.label}>Date Sent</Text>
          <View>
            <Text style={styles.value}>{push.date}</Text>
            <Text style={styles.value}>{push.time}</Text>
          </View>
        </View>
        <View style={styles.divider}></View>
        <View style={styles.row}>
          <Text style={styles.label}>Sent to</Text>
          <Text style={styles.value}>List Name</Text>
        </View>
        <View style={styles.divider}></View>
        <View style={styles.messageContainer}>
          <Text style={styles.messageText}>{push.message.repeat(10)}</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    //paddingHorizontal: 16,
  },
  headerView: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
  },
  detailsContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 32,
    marginTop: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 0,
    borderBottomColor: '#e0e0e0',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  value: {
    fontSize: 16,
  },
  divider: {
    alignSelf: 'center',
    height: 1,
    borderWidth: 0.5,
    width: 325,
    borderColor: '#D2D2D2',
    opacity: 1,
  },
  messageContainer: {
    paddingVertical: 8,
  },
  messageText: {
    fontSize: 16,
    color: '#757575',
  },
});

export default ViewPushScreen;
