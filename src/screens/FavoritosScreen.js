import React, { useEffect, useState } from 'react';
import { View, Text, Image, FlatList, StyleSheet, TouchableOpacity, Button } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { db, auth } from './firebaseconfig'; 
import { doc, getDoc, updateDoc, onSnapshot } from 'firebase/firestore';

const FavoritosScreen = () => {
  const [favoritos, setFavoritos] = useState([]);
  const [filteredFavoritos, setFilteredFavoritos] = useState([]);
  const [userId, setUserId] = useState(null);
  const [filter, setFilter] = useState('todos'); 

  useEffect(() => {
    const unsubscribeAuth = auth.onAuthStateChanged(user => {
      if (user) {
        setUserId(user.uid);
      }
    });

    return () => unsubscribeAuth();
  }, []);

  useEffect(() => {
    if (!userId) return;

    const unsubscribe = onSnapshot(doc(db, 'users', userId), (userDoc) => {
      if (userDoc.exists()) {
        const userData = userDoc.data();
        const favoritosData = userData.favoritos || [];
        console.log("Favoritos do usuário:", favoritosData);

        const fetchFavoritos = async () => {
          const fetchedFavoritos = await Promise.all(favoritosData.map(async (id) => {
            const contentDoc = await getDoc(doc(db, 'conteudos', id));
            if (contentDoc.exists()) {
              const contentData = contentDoc.data();
              console.log("Dados do conteúdo:", contentData); 
              return { id: contentDoc.id, ...contentData };
            }
            return null;
          }));

          setFavoritos(fetchedFavoritos.filter(item => item !== null));
        };

        fetchFavoritos();
      }
    });

    return () => unsubscribe();
  }, [userId]);

  useEffect(() => {
    if (filter === 'todos') {
      setFilteredFavoritos(favoritos);
    } else {
      const filtered = favoritos.filter(item => item.category === filter);
      setFilteredFavoritos(filtered);
    }
  }, [filter, favoritos]);

  const handleRemoveFavorite = async (id) => {
    try {
      const updatedFavoritos = favoritos.filter(item => item.id !== id);
      const userDocRef = doc(db, 'users', userId);
      await updateDoc(userDocRef, { favoritos: updatedFavoritos.map(item => item.id) });

      setFavoritos(updatedFavoritos);
      console.log(`Item ${id} removido dos favoritos.`);
    } catch (error) {
      console.error("Erro ao remover favorito:", error);
    }
  };

  const renderItem = ({ item }) => {
    console.log("URL da imagem:", item.imageUrl); 
    return (
      <View style={styles.itemContainer}>
        <Image source={{ uri: item.imageUrl }} style={styles.itemImage} />
        <View style={styles.itemInfo}>
          <Text style={styles.itemTitle}>{item.title}</Text>
          <Text style={styles.itemDescription}>{item.description}</Text>
        </View>
        <TouchableOpacity style={styles.likeButton} onPress={() => handleRemoveFavorite(item.id)}>
          <Icon name="heart" size={24} color="#393357" />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.filterContainer}>
        <TouchableOpacity onPress={() => setFilter('todos')} style={styles.filterButton}>
          <Text style={styles.filterText}>Todos</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setFilter('unhas')} style={styles.filterButton}>
          <Text style={styles.filterText}>Unhas</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setFilter('esmalte')} style={styles.filterButton}>
          <Text style={styles.filterText}>Esmalte</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={filteredFavoritos}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    padding: 10,
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between', // Alinha os botões próximos
    marginBottom: 10,
  },
  filterButton: {
    backgroundColor: '#393357', // Mantém a cor dos botões
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  filterText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  itemContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 10,
    overflow: 'hidden',
    elevation: 3,
    alignItems: 'center',
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
  likeButton: {
    right: 20,
  },
});

export default FavoritosScreen;
