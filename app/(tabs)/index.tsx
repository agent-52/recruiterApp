import { StyleSheet, FlatList , ActivityIndicator } from 'react-native';
import { Text, View } from '../../components/Themed';
import PostListItem from '../../components/PostListItem';
import posts from '../../assets/data/posts.json';
import React, { useState, useEffect } from 'react';

const firstPost = posts[0];

export default function TabOneScreen() {


    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
   

  const handleSelect = (item: string) => {
    console.log('You selected:', item);
  };

    useEffect(() => {
      // Function to fetch data
      const fetchData = async () => {
        try {
          const response = await fetch('https://recruiters-backend-1.onrender.com/recruiters/', {mode:'cors'});
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const json = await response.json();
          setData(json); // Set the data
          
        } catch (err) {
          setError(err.message); // Handle error
        } finally {
          setLoading(false); // Hide loader
        }
      };

      fetchData();
      
    }, []);

    if (loading) {
      return (
        <View style={styles.center}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      );
    }

    if (error) {
      return (
        <View style={styles.center}>
          <Text style={{ color: 'red' }}>{error}</Text>
        </View>
      );
    }

    // return (
    //   <View style={styles.container}>
    //     <Text>Title: {data.title}</Text>
    //     <Text>Body: {data.body}</Text>
    //   </View>
    // );
  



  return (
    <View style={styles.container}>
      
      
      <FlatList 
        data={data}
        renderItem={({item}) => <PostListItem recrutor={item} />}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ gap: 10 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems:'center',
    
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
