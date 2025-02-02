import { View, Text, StyleSheet, Image, Pressable, View as DefaultView } from 'react-native';
import { Candidates } from '../types';

import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Tags from './Tags';
import { Link } from "expo-router";
import Ionicons from '@expo/vector-icons/Ionicons';
import onConnect from '../app/chat/chat';
import BlurredText from './BlurredText';


export let candidatesBookmarkArray = []

let color = 'grey'


function onBookmark(id){
    // if(candidatesBookmarkArray.includes(id))
    // candidatesBookmarkArray.push(id)
    if(color == "grey"){
        color = "#1c90ff"
    }else{
        color = 'grey'
    }
}


type CandidateListItemProps = {
    candidate: Candidates;
}

type FooterbuttonProp = {
    text: string;
    icon: React.ComponentProps<typeof FontAwesome>['name'];
}


export default function CandidateListItem({ candidate }: CandidateListItemProps) {
    
    return(
        <View style={styles.container}>
            <Pressable onPress={onBookmark} style={styles.bookmark}>
                <FontAwesome5 name='bookmark' size={16} color={color} />
            </Pressable>
            <Image source={require("../assets/images/candidateicon.png")} style={styles.candidateicon}/>
            {/* header */}
            <View style={styles.header}>
                
                <Text style={styles.name}>{candidate.name}</Text>
                <Text>{candidate.location}</Text>
            </View>
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <View>
                    <Text style={styles.darkText}>Role</Text>
                    <Text>{candidate.role}</Text>
                </View>
                <Text style={styles.soldButton}>Sold {candidate.sold}x</Text>
            </View>
            <View>
                <Text style={styles.darkText}>Skills</Text>
                <View style={styles.tags}>
                    {candidate.skills?.map((skill, index) =>(<Tags text={skill} key={index}/>))}
                </View>
            </View>
            <View>
                <Text style={styles.darkText}>Experience</Text>
                <Text>{candidate.experience} Years</Text>
            </View>
            <View>
                <Text style={styles.darkText}>Expected Ctc</Text>
                <Text>{candidate.expected_ctc}</Text>
            </View>
            <View>
                <Text style={styles.darkText}>Notice Period</Text>
                <Text>{candidate.notice_period}</Text>
            </View>

            <View>
                <Text style={styles.darkText}>Contact Info</Text>
                <BlurredText text={candidate.contact_number} />
                <BlurredText text={candidate.email} />

            </View>
            
            
            {/* connect button */}
            <Link href="/chat/chat" asChild>
            
            <Pressable style={styles.button}>
                <Text style={styles.buttonText}>Initiate Chat </Text>
                <Ionicons name="chatbox-outline" size={15} color="white" />
            
            
          </Pressable></Link>



            


        </View>
    )
}


const styles = StyleSheet.create({
    container:{
        marginTop: 8,
        marginInline: 20,
        borderRadius: 10,
        backgroundColor: 'white',
        paddingInline: 15,
        paddingBlock: 8,
        paddingBottom: 10,
        gap: 8,
        
    },
    candidateicon:{
        width: 32,
        height: 32,
        borderRadius: 16,
        // borderWidth: 2,
        // borderColor: '#1c90ff',
        position: 'absolute',
        left:20,
        top: 12,
        zIndex: 10


    },
    absolute:{
        position: 'absolute'
    },

    tags:{
        flexDirection: 'row',
        gap: 8,
        marginLeft: 5,
        paddingVertical: 9,
        flexWrap: 'wrap'
    },
    header:{
        justifyContent: 'center',
        flexDirection:'column',
        width: '100%',
        alignItems: 'center'
    },
    buttonText:{
        color: 'white',
        fontWeight: '600',
        fontSize: 15
    },
    button:{
        backgroundColor: "#1c90ff",
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        paddingBlock: 7,
        width: '100%',
        borderRadius: 4,
        marginTop: 5,
        flexDirection: 'row',
        gap: 2,
        
        
    },
    darkText:{
        fontWeight: '500',
        fontSize: 16
    },
    name:{
        fontSize: 18,
        fontWeight: '500'
    },
    bookmark:{
        position: 'absolute',
        right:15,
        top: 13,
        zIndex: 10
    },
   soldButton:{
    // backgroundColor: '#f6f6f6',
    // backgroundColor:'#39acff',
    maxHeight: '10',
    paddingHorizontal:8,
    borderRadius: 5,
    fontWeight: '600',
    color: 'grey',
    // boxShadow: '0 8px 8px -10px #1c90ff '
        
   }
    
    

})