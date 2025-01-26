import { Text, ScrollView, View, Image, StyleSheet, Pressable } from "react-native";
import users from '../../assets/data/user.json'
import { useLocalSearchParams, useNavigation } from "expo-router";
import { useLayoutEffect, useState, useEffect } from "react";
import CandidateListItem from "../../components/Candidate";
import ExperienceListItem from "../../components/ExperienceListItem";
import { Candidates } from "../../types";
import { ActivityIndicator } from "react-native";
import Tags from "../../components/Tags";

type CandidateListitemProps = {
  
  recruitor_id: "string"
}


export default function UserProfile() {
  
  const navigation = useNavigation();
  const [userdata, setUserdata] = useState(null);
  const [recrutordata, setRecrutordata] = useState(null)
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const {id} = useLocalSearchParams()

  const onConnect = () =>{
    console.warn("connect pressed")
  }

  const fetchCandidateData = async () => {
    try {
      
      console.log(id)
      const response = await fetch(`https://recruiters-backend-1.onrender.com/candidates/${id}/`, {mode:'cors'});
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const json = await response.json();
      setUserdata(json); // Set the data
      
      
    } catch (err) {
      setError(err.message); // Handle error
    } finally {
      setLoading(false); // Hide loader
    }
  };

  const fetchRecrutorData = async () => {
    try {
      
      console.log(id)
      const response = await fetch(`https://recruiters-backend-1.onrender.com/recruiters/${id}/`, {mode:'cors'});
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const json = await response.json();
      setRecrutordata(json); // Set the data
      
      
    } catch (err) {
      setError(err.message); // Handle error
    } finally {
      setLoading(false); // Hide loader
    }
  };

  useLayoutEffect(() =>{
    if(recrutordata){
      navigation.setOptions({title: recrutordata.name})
    }
  }, [recrutordata?.name])

  useEffect(() => {

    if(id){
      fetchCandidateData()
      fetchRecrutorData()
    }
        
  },[id]);
  useEffect(() => {
    if (userdata) {
      console.log("Userdata updated:", userdata);
    }
    if (recrutordata) {
      console.log("Recrutordata updated:", recrutordata);
    }
  }, [userdata, recrutordata]);

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

  if(userdata && recrutordata){

  
 

    return(
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/**header */}
        <View style={styles.header}>
          
          {/* profile image */}
          <View style={styles.headerContent}>
            <Image source={{uri: recrutordata.profile_picture_url}} style={styles.image} />
            
            <View style={{flexDirection: 'row', gap: 5, alignItems: 'center', justifyContent:'center', alignContent:'center'}}>
              <Text style={styles.name}>{recrutordata.recruiter_name}</Text>
              <Image source={require("../../assets/images/tick.png")} style={styles.tick}/>
            </View>
            <Text style={styles.position}>{recrutordata.location}</Text>
          </View>
          <Text style={styles.paragraph}>{recrutordata.bio}</Text>
          {/* connect button */}
          {/* <Pressable onPress={onConnect} style={styles.button}>
            <Text style={styles.buttonText}>Connect</Text>
          </Pressable> */}

        
        <View style={{flexDirection: 'row', alignItems:'center', backgroundColor: 'white', justifyContent:'space-between', paddingVertical:10, paddingHorizontal: 10, marginInline: 20,
    borderRadius: 7,}}>
          <View style={{paddingHorizontal: 15, alignItems: 'center', borderRightWidth: 2 , borderColor: 'lightgrey',}}>
            <Text style={styles.achievement}>{recrutordata.num_candidates_listed}</Text>
            <Text style={styles.position}>Candidates</Text>
          </View>
          <View style={{paddingHorizontal: 15, alignItems: 'center', }}>
            <Text style={styles.achievement}>{recrutordata.successful_deals}</Text>
            <Text style={styles.position}> Deals</Text>
          </View>
          <View style={{paddingHorizontal: 15, alignItems: 'center' , borderColor: 'lightgrey', borderLeftWidth: 2,}}>
            <Text style={styles.achievement}>{recrutordata.recruiter_rating}+</Text>
            <Text style={styles.position}>Rating</Text>
          </View>
        </View>
        </View>

        {/* Candidates section  */}
        <View style={{marginVertical: 1}}>
          <View style={styles.candidatesection}>
            <Text style={styles.sectionTitle}>Candidates</Text>
            <Text style={{color: "#1c90ff", fontWeight: 600}}>See All</Text>
          </View>
          {/* <View style={styles.tagsSection}>
            {recrutordata.tags?.map((tag, index) =>(<Tags text={tag} key={index}/>))}
          </View> */}
          <View style={{flexDirection: 'column', gap: 3}}>
            {userdata?.map((candidate, index) =>(<CandidateListItem candidate={candidate} key={index} />))}
          </View>
          
          
          
        </View>
        {/* Experience  */}
        {/* <View style={styles.section}>
          <Text style={styles.sectionTitle}>Experience</Text>
          {user.experience?.map((experience, index) => (
            <ExperienceListItem experience={experience} key={experience.id} isFirst={index === 0}/>
          ))}
          
        </View> */}

      </ScrollView>
    )
  }

}


const styles = StyleSheet.create({
  container:{
    // marginInline: 15,
    // borderRadius: 7,
  },
  header:{
    backgroundColor: 'white',
    // marginBottom: 5,
    marginInline: 10,
    borderRadius: 7,
    paddingTop: 7
  },
  headerContent:{
    padding:10,
    paddingTop: 0,
    justifyContent:"center",
    alignItems: "center"
  },
  backImage:{
    width: '100%',
    aspectRatio: 5/2,
    marginBottom: -60
  },
  tick:{
    width: 18,
    height: 18,
    alignSelf:'center',
    alignItems:'center',
    
  },
  image:{
    width: 120,
    aspectRatio: 1,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: 'white'

  },
  position:{
    color: 'grey'
  },
  name:{
    fontSize: 24,
    fontWeight: '500'
  },
  button:{
    backgroundColor: 'royalblue',
    alignItems: 'center',
    padding: 10,
    borderRadius: 50,
    marginVertical: 10,
    marginHorizontal:5
  },
  buttonText:{
    color: 'white',
    fontWeight: '600'
  },
  achievement:{
    fontSize: 20,
    fontWeight: '500'
  },

  candidatesection:{
    backgroundColor:'white',
    padding: 10,
    marginInline: 10,
    borderRadius: 6,
    paddingInline: 15,
    marginVertical: 6,
    marginBottom: 6,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  sectionTitle: {
    fontSize: 19,
    fontWeight: '500',
    marginVertical:5,
  },
  paragraph:{
    lineHeight: 20,
    fontSize: 16,
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    paddingTop: 2,
    paddingBottom: 10
  
  },

  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  //tags
  tagsSection:{
    flexDirection: 'row',
    gap: 12,
    marginLeft: 10,
    paddingVertical: 9,
    alignItems: 'center',
    justifyContent: 'center'
  },
})