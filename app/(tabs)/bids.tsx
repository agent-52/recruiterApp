import { TextInput, Button, View, Text, ScrollView, StyleSheet, FlatList, Pressable } from 'react-native';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { useState, useEffect } from 'react';
import { Link } from "expo-router";
import Wishlistitem from '../../components/WishlistItem';
import Header from '../../components/Header';

export default function NewPostScreen() {


  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  const dummyData = [
    {
      created_at: "2025-01-23T20:54:24.081352+00:00",
      recruiter_id: "2a606d25-cbcd-4422-a524-16c5922ad3aa",
      requirements: {
        role: "Hospitality Analyst",
        experience: " 3+ years",
        ctc: "AED 150,000/year",
        location: "Dubai",
        noticePeriod: " 60 days",
        message: "",
      },
      
      recruiter_name: "Ava Taylor",
      recruiter_rating: 4,
      profile_picture_url: "https://img.freepik.com/free-photo/portrait-positive-carefree-dark-skinned-girl-dressed-casually-smiling-broadly_273609-13878.jpg?semt=ais_incoming_vrsd",
      verified_badge: true,
      updated_at: "2025-01-23T20:54:24.081352+00:00",
      location: "Mumbai, India"
    }
  ]
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
      return (
        <View style={styles.container}>
          <Header />
          <FlatList 
            data={dummyData}
            renderItem={({item}) => <Wishlistitem recrutor={item} />}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ gap: 10 }}
          />
          {/* <FlatList 
            data={data}
            renderItem={({item}) => <Wishlistitem recrutor={item} />}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ gap: 10 }} */}
          />
          <Link href={"../forms/candidateRequirement"} asChild>
              <Pressable style={styles.postButton}>
              <FontAwesome6 name="add" size={26

              } color="white" />
              </Pressable>
          </Link>
          
        </View>
      );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
    marginInline: 10,
    // width: '100%',
    height: '100%'
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
  postButton:{
    backgroundColor: '#1c90ff',
    width: 60,
    aspectRatio: 1,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    position:'absolute',
    zIndex: 100,
    bottom: 3,
    boxShadow: '0 3px 10px rgb(0 0 0 / 0.5)'
    
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
