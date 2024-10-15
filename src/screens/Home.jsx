import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { View, Text, StyleSheet, SafeAreaView, FlatList, Image } from 'react-native';
import { Searchbar } from 'react-native-paper';
import axios from 'axios';
import debounce from 'lodash.debounce';
import Filters from '../ui-component/Filters';
import { getSectionData, useUpdateEffect } from '../utils/utils';
import { initializeDatabase, createTable, getMenuItems, saveMenuItems, filterByQueryAndCategories } from '../database/database';

const API_URL =
  'https://raw.githubusercontent.com/Meta-Mobile-Developer-PC/Working-With-Data-API/main/capstone.json';

const Item = ({ name, price, description, image }) => (
  <View style={styles.item}>
    <View style={{ flex: 3, gap: 5 }}>
      <Text style={{ fontWeight: 'bold', fontSize: 18 }}>{name}</Text>
      <Text
        style={styles.title}
        numberOfLines={2}
        ellipsizeMode="tail"  >{description}</Text>
      <Text style={{ fontSize: 19 }}>${price}</Text>
    </View>

    <View style={{ flex: 1 }}>
      <Image
        style={styles.image}
        source={{ uri: `https://github.com/Meta-Mobile-Developer-PC/Working-With-Data-API/blob/main/images/${image}?raw=true` }}  // URL de la imagen
        resizeMode="cover"
      />
    </View>
  </View>
);

const Home = ({ navigation }) => {
  const [data, setData] = useState([]);
  const [sections, setSections] = useState([]);
  const [searchBarText, setSearchBarText] = useState('');
  const [query, setQuery] = useState('');

  const [filterSelections, setFilterSelections] = useState(
    sections.map(() => false)
  );

  const fetchData = async () => {
    // Fetch the menu from the API_URL endpoint.
    try {
      const response = await axios.get(API_URL);
      return response.data.menu;
    } catch (error) {
      console.error(error);
    }
    return [];
  };

  useEffect(() => {
    (async () => {
      try {
        await initializeDatabase();
        await createTable();
        let menuItems = await getMenuItems();
        // The application only fetches the menu data once from a remote URL
        // and then stores it into a SQLite database.
        // After that, every application restart loads the menu from the database
        if (!menuItems?.length) {
          menuItems = await fetchData();
          saveMenuItems(menuItems);
        }

        // Set only titles
        const sectionListData = getSectionData(menuItems);
        setSections(sectionListData);

        setData(menuItems);
      } catch (e) {
        // Handle error
        console.error(e.message);
      }
    })();
  }, []);

  useUpdateEffect(() => {
    (async () => {
      const activeCategories = sections.filter((s, i) => {
        // If all filters are deselected, all categories are active
        if (filterSelections.every((item) => item === false)) {
          return true;
        }
        return filterSelections[i];
      });
      try {
        const menuItems = await filterByQueryAndCategories(
          query,
          activeCategories
        );

        setData(menuItems);
      } catch (e) {
        console.error(e.message);
      }
    })();
  }, [filterSelections, query]);

  const lookup = useCallback((q) => {
    setQuery(q);
  }, []);

  const debouncedLookup = useMemo(() => debounce(lookup, 500), [lookup]);

  useEffect(() => {
    return () => {
      debouncedLookup.cancel(); // Cancel any pending execution when the component is unmounted
    };
  }, [debouncedLookup]);

  const handleSearchChange = (text) => {
    setSearchBarText(text);
    debouncedLookup(text);
  };

  const handleFiltersChange = async (index) => {
    const arrayCopy = [...filterSelections];
    arrayCopy[index] = !filterSelections[index];
    setFilterSelections(arrayCopy);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.hero} >
        <Text style={{ fontSize: 45, color: '#f4ce14', fontWeight: 'bold', }}>Little Lemon</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View style={{ flex: 3, gap: 15 }}>
            <Text style={{ fontSize: 28, color: 'white' }}>Chicago</Text>
            <Text style={{ fontSize: 19, color: 'white' }}>We are a family owned Mediterrain restaurant, focused on traditional recipes served with a modern twist</Text>
          </View>
          <View style={{ flex: 2, }}>
            <Image
              style={{ width: 150, height: 150, borderRadius: 10 }}
              source={require('../../assets/HeroImage.png')}
              resizeMode="cover"
            />
          </View>
        </View>
        <Searchbar
          placeholder="Search"
          placeholderTextColor="black"
          onChangeText={handleSearchChange}
          value={searchBarText}
          style={styles.searchBar}
          iconColor="black"
          inputStyle={{ color: 'black' }}
          elevation={0}
        />
      </View>
      <View>
        <Text style={{ fontWeight: 'bold', fontSize: 20, marginLeft: 15, marginTop: 20 }}>ORDER FOR DELIVERY!</Text>
        <Filters
          selections={filterSelections}
          onChange={handleFiltersChange}
          sections={sections}
        />
      </View>
      <FlatList
        style={styles.sectionList}
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Item name={item.name} description={item.description} price={item.price} image={item.image} />
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  hero: {
    width: '100%',
    height: 'auto',
    backgroundColor: '#495e57',
    padding: 15
  },
  searchBar: {
    marginTop: 15,
    backgroundColor: 'white',
    shadowRadius: 0,
    shadowOpacity: 0,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    padding: 15,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
});

export default Home;
