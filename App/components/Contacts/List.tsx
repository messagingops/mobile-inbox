import React, { useEffect, useState } from 'react';
import express, { Router, Request, Response } from "express";
import axios from 'axios';
import { View, Text } from 'react-native/types';

const router: Router = Router()
router.use(express.json())

// var lists is a list of Lists
interface List {
    id: number
    name: string
}

const Lists = () => {
    const [phoneNumbers, setPhoneNumbers] = useState<string[]>([]);
    const [before, setBefore] = useState<string | null>(null);
    const [listsArr, setListsArr] = useState<string[]>([]);
  
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
    fetchInboxData(before);
  }, [before]);

  // Part 2: get list names -
    const fetchPhoneNumber = async() =>  {
      for (const phoneNumber in phoneNumbers)
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
          setListsArr((prevNames) => [...prevNames, ...listName]);
        } catch(error)
        {
          console.log(error)
        }
      }
   }

   // populate lists array and sort
   fetchPhoneNumber()
   setListsArr(listsArr.sort())

   // populate a List[]
   var lists: List[] = []
   var i = 1;
   for (const list in listsArr) {
      lists.push({id: i, name: list})
      ++i
   }

   // render one contact
   const renderList = (list: List) => {
    return (
      <View key={list.id}>
        <Text>{list.name}</Text>
      </View>
    )
   }

   return (
    <View>
      {lists.map((list) => renderList(list))}
    </View>
  );

};

export default Lists;