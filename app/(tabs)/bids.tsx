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
    },
    {
      created_at: "2025-01-23T20:54:21.080431+00:00",
      recruiter_id: "4815b496-e2ba-4a52-8836-180e62caa89c",
      requirements: {
        role: "Event Coordinator",
        experience: " 5+ years",
        ctc: "USD 75,000/year",
        location: "Las Vegas",
        noticePeriod: " 30 days",
        message: "Looking for an experienced candidate who has an expertise in Event Coordination",
      },
      
      
      recruiter_name: "Michael Lee",
      recruiter_rating: 4,
      profile_picture_url: "https://img.freepik.com/free-photo/calm-handsome-curly-haired-boy-posing-isolated-light-grey-standing-still-looks-peaceful-wearing-casual-manner-youth-style-concept_176532-8831.jpg?t=st=1737668843~exp=1737672443~hmac=51e3845ebc86ae5b02a3c885a8a698d1c97c35fbfc84febf43038fc90b82f9de&w=900",
      verified_badge: true,
      "updated_at": "2025-01-23T20:54:21.080431+00:00",
      "location": "Singapore"
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
    left: 150,
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
