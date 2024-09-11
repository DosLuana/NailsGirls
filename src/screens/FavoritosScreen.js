
import React from 'react';
import { View, Text, Image, FlatList, StyleSheet, TouchableOpacity } from 'react-native';

const FAVORITOS = [
  {
    id: '1',
    title: 'Item 1',
    description: 'Descrição do item 1',
    image: require('../../assets/item1.png'),
  },
 
];

const Item = ({ title, description, image }) => (
  <View style={styles.itemContainer}>
    <Image source={image} style={styles.itemImage} />
    <View style={styles.itemInfo}>
      <Text style={styles.itemTitle}>{title}</Text>
      <Text style={styles.itemDescription}>{description}</Text>
    </View>
  </View>
);

export default function FavoritosScreen() {
  return (
    <View style={styles.container}>
      <FlatList
        data={FAVORITOS}
        renderItem={({ item }) => (
          <Item
            title={item.title}
            description={item.description}
            image={item.image}
          />
        )}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    padding: 10,
  },
  itemContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 10,
    overflow: 'hidden',
    elevation: 3,
  },
  itemImage: {
    width: 100,
    height: 100,
  },
  itemInfo: {
    flex: 1,
    padding: 10,
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  itemDescription: {
    fontSize: 14,
    color: '#666',
  },
  list: {
    paddingBottom: 20,
  },
});
