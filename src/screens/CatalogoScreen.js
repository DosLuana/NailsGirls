import React from 'react';
import { View, Text, Image, FlatList, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';


const nailsData = [
  { id: '1', image: require('../img/item1.png'), liked: false }, 
  { id: '2', image: require('../img/item1.png'), liked: false },
  { id: '3', image: require('../img/item1.png'), liked: false },
];

const CatalogoScreen = () => {
  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image source={item.image} style={styles.logo} />
      <TouchableOpacity style={styles.likeButton}>
        <Icon name={item.liked ? 'heart' : 'heart-outline'} size={24} color="#393357" />
      </TouchableOpacity>
    </View>
  );

  return (
    <ScrollView>
    <View style={styles.container}>
      <Image
        source={require('../img/item4.png')}  
        style={styles.bannerImage}
        resizeMode="cover" 
      />

      <FlatList
        data={nailsData}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
      />
    </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  
  bannerImage: {
    width: '100%',
    marginBottom: 10
  },
  listContent: {
    padding: 15,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#E0E0E0',
    marginVertical: 5,
    borderRadius: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    width: 97,
    height: 97,
    borderRadius: 10,
  },
  likeButton: {
    right: 5,
    padding: 10,
  },
});

export default CatalogoScreen;
