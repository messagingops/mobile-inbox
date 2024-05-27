import React, { useEffect, useState } from "react";
import { TouchableOpacity, StyleSheet, Text, View, SafeAreaView, SectionList, TextInput } from "react-native";
import axios from 'axios';
import { AntDesign } from '@expo/vector-icons';
import ListDetails from "./ListDetails";
import { Ionicons } from "@expo/vector-icons";
import List from "./ListDetails"

/*
// Populates list array
async function populateListsArr()
{
  const [phoneNumbers, setPhoneNumbers] = useState<string[]>([]);
  const [before, setBefore] = useState<string | null>(null);
  const [listsArr, setListsArr] = useState<string[]>([]);
  const [nameListMap, setnameListMap] = useState<{ name: string; listName: string; }[]>([]);
  const [returnVal, setReturnVal] = useState<{ name: string, size: number, contacts: { firstName: string, lastName: "" }[] }[]>([]);

  // Recursive function to fetch inbox data
  const fetchInboxData = async (beforeParam: string | null) => {
      try {
      const response = await axios.get('localhost:3000/inbox', {
        params: {
          "from": "+19185175752",
          "before": beforeParam, // once obtained then paginate
        },
      });

      const data = JSON.parse(JSON.stringify(response.data))
      const items = data.inbox.items
      const nums = items.map((item: { contact: { phoneNumber: any; }; }) => item.contact.phoneNumber)
      setPhoneNumbers((prevNums) => [...prevNums, ...nums]);

      if (data.inbox.pageInfo.hasNextPage) {
          setBefore(data.inbox.pageInfo.nextPage);
        } else {
          setBefore(null);
        }
    } catch (error) {
      console.error('Error fetching inbox data:', error);
    }
  };

  // function is re-run whenver a change in before is detected
  useEffect(() => {
    const fetchData = async () => {
      await fetchInboxData(before);
    };

    fetchData();
  }, [before]);

// Part 2: get list names -
  const fetchPhoneNumber = async() =>  {
    for (const phoneNumber of phoneNumbers)
    {
      try {
        const response = await axios.get('localhost:3000/contacts', {
          params: {
            "primaryPhone": "+19185175752",
            "phoneNumber": phoneNumber, 
          },
        });
        const data = JSON.parse(JSON.stringify(response.data))
        const listName = data.contact.lists.name
        const contactName = data.contact.name
        setListsArr((prevNames) => [...prevNames, listName]);
        setnameListMap((prevMap) => [...prevMap, {name: contactName, listName: listName}])
      } catch(error)
      {
        console.log(error)
      }
    }
 }

 // populate lists array and sort
 await fetchPhoneNumber()
 setListsArr(listsArr.sort())

 // part 3: get capacity
 const toReturn: { name: string; size: number; }[] = []

 const fetchListCapacity = async() =>  {
  for (const list in listsArr)
  {
    try {
      const response = await axios.get('localhost:3000/lists', {
        params: {
          "primaryPhone": "+19185175752",
          "listName": list, 
        },
      });
      const data = JSON.parse(JSON.stringify(response.data))
      const listSize = data.list.size

      toReturn.push({name: list, size: listSize})

    } catch(error)
    {
      console.log(error)
    }
  }
}
 await fetchListCapacity()

 // part 4: link names to lists
 for (const list of toReturn)
  {
    for (const map of nameListMap)
    {
      if (map.name === list.name)
      {
        setReturnVal((prevVal) => [...prevVal, {name: list.name, size: list.size, contacts: [{firstName: map.name, lastName: ""}] }])
      }
    }
  }

 return toReturn
}
*/

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
    size: number
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

  const groupLists = (lists: { name: string, size: number, contacts: { firstName: string; lastName: string }[] }[]) => {
    const grouped: { [key: string]: { name: string, size: number, contacts: { firstName: string; lastName: string }[]}[] } = {};
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

  const updateList = (updatedList: { listName: string, size: number, listContacts: { firstName: string; lastName: string }[]}, originalListName: string) => {
    // update your state here with the updatedList
    // go through listsBank and edit the list with the originalListName to have the same values as updatedList
    
    if (originalListName === "Untitled")
    {
      listsBank.push({name: updatedList.listName, size: updatedList.size, contacts: updatedList.listContacts})
    }
    else {
    for (const list of listsBank)
      {
        if (list.name === originalListName)
          {
            list.name = updatedList.listName
            list.size = updatedList.size
            list.contacts = updatedList.listContacts
          }
      }
    }
      setFilteredLists(listsBank)
      setOriginalLists(listsBank)
  };

  const renderItem = ({ item }: { item: { name: string; size: number; contacts: { firstName: string; lastName: string }[] } }) => (
    <TouchableOpacity onPress={() => handleListPress(item)} style={styles.listItemContainer}>
      <View style={styles.listItemContent}>
        <Text style={styles.listItemName}>{item.name}</Text>
        <View style={styles.listItemDetails}>
          <Text style={styles.listItemSize}>
            {item.size} {item.size === 1 ? 'contact' : 'contacts'}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderSectionHeader = ({
    section: { title },
  }: {
    section: { title: string };
  }) => (
    <View style={{ backgroundColor: "lightgray", padding: 10 }}>
      <Text style={{ fontWeight: "bold", fontFamily: "Poppins" }}>{title}</Text>
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
          size = {0} 
          listContacts={[]}   
          sortedContacts={allContacts}     
          onBackPress={handleBackPress}
          onUpdateList={updateList}
        />
      ) : (
        <>
          <View style={styles.headerContainer}>
          <TextInput
              placeholder="Search..."
              onChangeText={updateSearch}
              value={search}
              style={styles.listNameInput}
            />
          <TouchableOpacity onPress={handleNewList}>
            <Text style={styles.backButtonText}>New</Text>
          </TouchableOpacity>
    

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
    alignContent: "center",
    fontFamily: "Poppins",
  },
  searchBar: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    margin: 10,
    paddingLeft: 10,
    borderRadius: 20,
    fontFamily: "Poppins",
  },
  backButtonText: {
    color: 'blue',
    fontSize: 16,
    marginRight: 10,
    fontFamily: "Poppins",
  },
  topCont: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    paddingHorizontal: 20
  },
  listItemContainer: {
    padding: 10,
    borderBottomColor: '#E0E0E0',
  },
  listItemContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  listItemName: {
    fontSize: 14,
    fontFamily: "Poppins",
  },
  listItemDetails: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  listItemSize: {
    marginRight: 8,
    color: 'gray',
    fontFamily: "Poppins",
  },
  listNameInput: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 20, // Increase the borderRadius value
    paddingHorizontal: 10,
    marginHorizontal: 10,
    fontFamily: "Poppins",
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#F5F5F5',
  },
  emptyContainer: {
    flex: 1,
    marginTop: 20, // adjust this value as needed
    marginLeft: 20, // adjust this value as needed
    alignContent: 'center',
  },
  emptyText: {
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: "Poppins",
  },
});
