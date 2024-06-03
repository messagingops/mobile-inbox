import React, { useEffect, useState } from "react";
import { TouchableOpacity, StyleSheet, Text, View, SafeAreaView, SectionList, TextInput } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import ListDetails from "./ListDetails";
import { Ionicons } from "@expo/vector-icons";
import List from "./ListDetails";
import Icon from '../components/Conversations/Icons';
import TopNavigation from "../navigation/TopNavigation";

// Populates list array
async function populateListsArr() {
  return listsBank;
}

const listsBank = [
  { name: "Developers", size: 6, contacts: [{ firstName: 'Daniel', lastName: 'Kim' }, { firstName: 'Lena', lastName: 'Ray' }, { firstName: 'Arnav', lastName: 'Rastogi' }, { firstName: 'Aarav', lastName: 'Urgaonkar' }, { firstName: 'Avery', lastName: 'Li' }, { firstName: 'Aryan', lastName: 'Gorwade' }] },
  { name: "Designers", size: 2, contacts: [{ firstName: 'Natalie', lastName: 'Ung' }, { firstName: 'Danielle', lastName: 'Koay' }] },
  { name: "Managers", size: 2, contacts: [{ firstName: 'Jerry', lastName: 'Wu' }, { firstName: 'Cody', lastName: 'Crow' }] },
];

const allContacts = [
  { firstName: 'Aarav', lastName: 'Urgaonkar' },
  { firstName: 'Arnav', lastName: 'Rastogi' },
  { firstName: 'Aryan', lastName: 'Gorwade' },
  { firstName: 'Avery', lastName: 'Li' },
  { firstName: 'Cody', lastName: 'Crow' },
  { firstName: 'Daniel', lastName: 'Kim' },
  { firstName: 'Danielle', lastName: 'Koay' },
  { firstName: 'Jerry', lastName: 'Wu' },
  { firstName: 'Lena', lastName: 'Ray' },
  { firstName: 'Natalie', lastName: 'Ung' },
];

const ListsScreen = () => {
  const [sortedLists, setSortedLists] = useState<{ name: string, size: number, contacts: { firstName: string; lastName: string }[] }[]>([]);
  const [search, setSearch] = useState("");
  const [selectedList, setSelectedList] = useState<{
    name: string;
    size: number;
    contacts: { firstName: string; lastName: string }[];
  } | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await populateListsArr();
      setSortedLists(data);
      setOriginalLists(data);
      setFilteredLists(data);
    };
    fetchData();
  }, []);

  const [originalLists, setOriginalLists] = useState<{ name: string, size: number, contacts: { firstName: string; lastName: string }[] }[]>([]);
  const [filteredLists, setFilteredLists] = useState<{ name: string, size: number, contacts: { firstName: string; lastName: string }[] }[]>([]);
  const [isNewList, setIsNewList] = useState<boolean>(false);
  const [selectedScreen, setSelectedScreen] = useState("Lists");

  const groupLists = (lists: { name: string, size: number, contacts: { firstName: string; lastName: string }[] }[]) => {
    const grouped: { [key: string]: { name: string, size: number, contacts: { firstName: string; lastName: string }[] }[] } = {};
    lists.forEach(({ name, size, contacts }) => {
      const firstLetter = name.charAt(0).toUpperCase();
      if (!grouped[firstLetter]) {
        grouped[firstLetter] = [];
      }
      grouped[firstLetter].push({ name, size, contacts });
    });
    return grouped;
  };

  const sections = groupLists(filteredLists);

  const handleBackPress = () => {
    setSelectedList(null);
    setIsNewList(false);
  };

  const updateSearch = (text: string) => {
    setSearch(text);
    if (text.trim() === "") {
      setFilteredLists(originalLists);
    } else {
      const filteredLists = originalLists.filter(({ name }) =>
        name.toLowerCase().includes(text.toLowerCase()) || name.toLowerCase().startsWith(text.toLowerCase())
      );
      setFilteredLists(filteredLists);
    }
  };

  const handleListPress = (list: { name: string, size: number, contacts: { firstName: string; lastName: string }[] }) => {
    setSelectedList(list);
  };

  const handleNewList = () => {
    setIsNewList(true);
    setSelectedList({ name: "Untitled", size: 0, contacts: [] }); // Clear any selected list
  };

  const updateList = (updatedList: { listName: string, size: number, listContacts: { firstName: string; lastName: string }[] }, originalListName: string) => {
    if (originalListName === "Untitled") {
      listsBank.push({ name: updatedList.listName, size: updatedList.size, contacts: updatedList.listContacts });
    } else {
      for (const list of listsBank) {
        if (list.name === originalListName) {
          list.name = updatedList.listName;
          list.size = updatedList.size;
          list.contacts = updatedList.listContacts;
        }
      }
    }
    setFilteredLists(listsBank);
    setOriginalLists(listsBank);
  };

  const renderItem = ({ item }: { item: { name: string; size: number; contacts: { firstName: string; lastName: string }[] } }) => (
    <TouchableOpacity onPress={() => handleListPress(item)} style={styles.listItemContainer}>
      <View style={styles.listItemContent}>
        <Text style={styles.listItemName}>{item.name}</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Icon name="Users" color="#707070" size={24} />
          <View style={styles.listItemDetails}>
            <Text style={styles.listItemSize}>
              {item.size} {item.size === 1}
            </Text>
            <Text style={styles.listItemSize1}>
              {'view full list'}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderSectionHeader = ({
    section: { title },
  }: {
    section: { title: string };
  }) => (
    <View style={{ paddingHorizontal: 20 }}>
      <View style={{ backgroundColor: "white", paddingHorizontal: 15, padding: 20, borderBottomWidth: 1, borderBottomColor: '#E0E0E0' }}>
        <Text style={{ fontFamily: "Poppins", color: '#A9A9A9' }}>{title}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {selectedList ? (
        <ListDetails
          listName={selectedList.name}
          size={selectedList.size}
          listContacts={selectedList.contacts}
          sortedContacts={allContacts}
          onBackPress={handleBackPress}
          onUpdateList={updateList}
        />
      ) : isNewList ? (
        <ListDetails
          listName='Untitled'
          size={0}
          listContacts={[]}
          sortedContacts={allContacts}
          onBackPress={handleBackPress}
          onUpdateList={updateList}
        />
      ) : (
        <>
          <View style={styles.topContainer}>
            <TouchableOpacity onPress={handleNewList}>
              <Icon name="CirclePlus" color="#707070" size={24} />
            </TouchableOpacity>
          </View>
          <TopNavigation
            selectedScreen={selectedScreen}
            setSelectedScreen={setSelectedScreen}
          />
          <View style={styles.headerContainer}>
            <TextInput
              placeholder="Search..."
              onChangeText={updateSearch}
              value={search}
              style={styles.searchBar}
            />
          </View>
          {Object.keys(sections).length > 0 ? (
            <SectionList
              sections={Object.keys(sections).map((key) => ({
                title: key,
                data: sections[key].sort((a, b) => a.name.localeCompare(b.name)),
              }))}
              keyExtractor={(item, index) => item.name + index}
              renderItem={renderItem}
              renderSectionHeader={renderSectionHeader}
            />
          ) : (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No lists found</Text>
            </View>
          )}
        </>
      )}
    </SafeAreaView>
  );
};

export default ListsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F6F6F6",
  },
  topContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    margin: 20,
  },
  searchBar: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 10,
    fontFamily: "Poppins",
  },
  listItemContainer: {
    paddingHorizontal: 20,
    backgroundColor: "white",
  },
  listItemContent: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 5,
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.41,
    elevation: 2,
  },
  listItemName: {
    fontFamily: "Poppins",
    fontSize: 16,
    color: '#303030',
  },
  listItemDetails: {
    flexDirection: "column",
    paddingHorizontal: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  listItemSize: {
    fontSize: 14,
    fontFamily: "Poppins",
    color: '#707070',
  },
  listItemSize1: {
    fontSize: 14,
    fontFamily: "Poppins",
    color: '#404040',
  },
  headerContainer: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 10,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 18,
    fontFamily: "Poppins",
    color: '#A9A9A9',
  },
});
