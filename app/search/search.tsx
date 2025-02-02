import React, { useState } from "react";
import { TextInput, Button, View, Text, ScrollView, StyleSheet, FlatList, Pressable } from 'react-native';
import PostListItem from "../../components/PostListItem";
import AntDesign from '@expo/vector-icons/AntDesign';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Link } from "expo-router";


const SearchBox = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    setError(null); // Clear previous errors
    setLoading(true); // Set loading state
    setResults([]); // Clear previous results

    try {
      const response = await fetch(
        "https://recruiters-backend-1.onrender.com/recruiters/search?threshold=0.6",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify([query]), // Ensure the query is sent as an array
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch results: ${response.status}`);
      }

      const data = await response.json();

      // Debugging: Log the API response
      console.log("API Response:", data);

      // Check if data is an array
      if (Array.isArray(data.results)) {
        setResults(data.results);
      } 
       else {
        throw new Error("Unexpected response format. Expected an array.");
      }
    } catch (error) {
      console.error("Error fetching results:", error);
      setError(error.message);
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <View >
        
      <View style={styles.searchBox}>
        <Link href={'/'}>
         <Ionicons name="arrow-back" size={24} color="grey" />
        </Link>
            
        
        <TextInput
          style={styles.input}
          placeholder="Search..."
          value={query}
          onChangeText={setQuery}
        />
        <Pressable onPress={handleSearch} disabled={loading} style={{alignItems: 'center', justifyContent: 'center', backgroundColor: '#1c90ff', paddingInline: 10, borderRadius: 5}}>
        <AntDesign name="search1" size={20} color="white" />
        </Pressable>
        {error && (
          <Text style={{ color: "red", marginTop: 10 }}>
            Error: {error}
          </Text> 
        )}
      </View>
      
      <ScrollView >
        {results.length > 0 ? (
          results.map((result, index) => (
            <View style={{marginBottom: 10,
              marginInline: 10
            }} key={index}>
              <PostListItem recrutor={result} />
            </View>
          ))
          
        ) :null}
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    width: '100%',

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
  searchBox:{
    padding: 20,
    flexDirection: 'row',
    flex: 1,
    width: '100%',
    gap: 5

  },
  input:{
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 15,
    width: '85%',
    borderRadius: 5,
    marginBottom: 10,
    color: 'grey'
  }
})
export default SearchBox;
