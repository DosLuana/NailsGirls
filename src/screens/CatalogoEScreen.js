import React, { useEffect, useState } from 'react';
import { View, Text, Image, FlatList, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { db, auth } from './firebaseconfig';
import { collection, getDocs, updateDoc, doc, onSnapshot } from 'firebase/firestore';

const CatalogoEScreen = () => {
  const [conteudosData, setConteudosData] = useState([]);
  const [favoritos, setFavoritos] = useState([]);
  const [userId, setUserId] = useState(null); 

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
  
    const fetchConteudosData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'conteudos'));
        const data = querySnapshot.docs
          .map(doc => ({ id: doc.id, ...doc.data() }))
          .filter(item => item.category === 'esmalte'); 
        setConteudosData(data);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    };
  
    const unsubscribe = onSnapshot(doc(db, 'users', userId), (userDoc) => {
      if (userDoc.exists()) {
        const userData = userDoc.data();
        setFavoritos(userData.favoritos || []);
      }
    });
  
    fetchConteudosData();
    return () => unsubscribe();
  }, [userId]);

  const handleLike = async (itemId) => {
    const isFavorited = favoritos.includes(itemId);
    const updatedFavoritos = isFavorited
      ? favoritos.filter(id => id !== itemId) 
      : [...favoritos, itemId]; 

    setFavoritos(updatedFavoritos);

    try {
      await updateDoc(doc(db, 'users', userId), { favoritos: updatedFavoritos });
    } catch (error) {
      console.error("Erro ao atualizar favoritos:", error);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image 
        source={{ uri: item.imageUrl }}
        style={styles.logo} 
      />
      <View style={styles.textContainer}>
        <Text style={styles.cardTitle}>{item.title}</Text>
      </View>
      <TouchableOpacity style={styles.likeButton} onPress={() => handleLike(item.id)}>
        <Icon name={favoritos.includes(item.id) ? 'heart' : 'heart-outline'} size={24} color="#393357" />
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
          data={conteudosData}
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
    marginBottom: 10,
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
  textContainer: {
    flex: 1,
    paddingLeft: 10,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#393357',
  },
  likeButton: {
    padding: 10,
    right: 20,
  },
});

export default CatalogoEScreen;
