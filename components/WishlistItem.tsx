import { View, Text, StyleSheet, Image, Pressable, View as DefaultView } from 'react-native';
import { Recrutor } from '../types';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link } from "expo-router";
import Tags from "./Tags";
import Ionicons from '@expo/vector-icons/Ionicons';

type RecrutorListItemProps = {
    recrutor: Recrutor;
}

type FooterbuttonProp = {
    text: string;
    icon: React.ComponentProps<typeof FontAwesome>['name'];
}

function FooterButton ({text, icon}: FooterbuttonProp){
    return(
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <FontAwesome5 name={icon} size={16} color="gray" />
            <Text style={{marginLeft: 5, color: 'grey', fontWeight: '500'}}>{text}</Text>
        </View>
    )
}

export default function Wishlistitem({ recrutor }: RecrutorListItemProps) {
    
    return(
        <Link href={`/users/${recrutor.recruiter_id}`} asChild>
            <Pressable style={styles.container}> 
                {/*Header */}
                
                <Pressable style={styles.header}>
                    <Image source={{uri: recrutor.profile_picture_url}} style={styles.userImage}/>
                    <View>
                        <Text style={styles.userName}>{recrutor.recruiter_name}</Text>
                        <View style={{flexDirection: 'row', alignItems: 'center', gap: 3,}}>
                         {recrutor.recruiter_rating == 4?(
                            <View style={{flexDirection: 'row'}}>
                                 <Image source={require( "../assets/images/star.png")} style={styles.ratingImage}/>
                                <Image source={require( "../assets/images/star.png")} style={styles.ratingImage}/>
                                <Image source={require( "../assets/images/star.png")} style={styles.ratingImage}/>
                                <Image source={require( "../assets/images/star.png")} style={styles.ratingImage}/>
                            </View>
                         ): recrutor.recruiter_rating == 5?(
                            <View style={{flexDirection: 'row'}}>
                                <Image source={require( "../assets/images/star.png")} style={styles.ratingImage}/>
                                <Image source={require( "../assets/images/star.png")} style={styles.ratingImage}/>
                                <Image source={require( "../assets/images/star.png")} style={styles.ratingImage}/>
                                <Image source={require( "../assets/images/star.png")} style={styles.ratingImage}/>
                                <Image source={require( "../assets/images/star.png")} style={styles.ratingImage}/>
                            </View>
                         ):recrutor.recruiter_rating == 3?(
                            <View style={{flexDirection: 'row'}}>
                                <Image source={require( "../assets/images/star.png")} style={styles.ratingImage}/>
                                <Image source={require( "../assets/images/star.png")} style={styles.ratingImage}/>
                                <Image source={require( "../assets/images/star.png")} style={styles.ratingImage}/>
                               
                            </View>
                         ):recrutor.recruiter_rating == 2?(
                            <View style={{flexDirection: 'row'}}>
                                <Image source={require( "../assets/images/star.png")} style={styles.ratingImage}/>
                                <Image source={require( "../assets/images/star.png")} style={styles.ratingImage}/>
                                
                               
                            </View>
                         ):recrutor.recruiter_rating == 1?(
                            <View style={{flexDirection: 'row'}}>
                                <Image source={require( "../assets/images/star.png")} style={styles.ratingImage}/>
                                
                            </View>
                         ):null} 
                         <Text style={styles.rating}>{recrutor.recruiter_rating}/5</Text>
                        </View>
                    </View>
                </Pressable>

                 {/* tag content */}
                <Text style={{fontWeight: '550',fontSize: 16,marginBlock:5, color: 'grey', marginInline: 10,  borderBottomColor: 'lightgrey', borderBottomWidth: 1}}>Candidate Requirements</Text>
                    <View style={styles.requirements}>
                         <View style={{flexDirection: 'row', gap: 25,}}>
                            <View>
                                <Text style={{fontWeight: '550',fontSize: 14,marginBottom:2, color: 'grey' }}>Role: </Text>
                                <Text style={{fontSize: 17}}>{recrutor.requirements.role || recrutor.role}</Text>
                            </View>
                            <View>
                                <Text style={{fontWeight: '550',fontSize: 14,marginBottom:2, color: 'grey' }}>Experience: </Text>
                                <Text style={{fontSize: 17}}>{recrutor.requirements.experience || recrutor.experience}</Text>
                            </View>
                            
                         </View>
                         <View style={{flexDirection: 'row', gap: 25}}>
                            <View>
                                <Text style={{fontWeight: '550',fontSize: 14,marginBottom:2, color: 'grey' }}>CTC</Text>
                                <Text style={{fontSize: 17}}>{recrutor.requirements.ctc || recrutor.ctc}</Text>
                            </View>
                            <View>
                                <Text style={{fontWeight: '550',fontSize: 14,marginBottom:5, color: 'grey' }}>Notice Period</Text>
                                <Text style={{fontSize: 17}}>{recrutor.requirements.noticePeriod || recrutor.noticePeriod}</Text>
                            </View>
                         </View>
                         
                        <View>
                            <Text style={{fontWeight: '550',fontSize: 14,marginBottom:2, color: 'grey' }}>Location: </Text>
                            <Text style={{fontSize: 17}}>{recrutor.requirements.location || recrutor.location}</Text>
                        </View>
                        {recrutor.requirements.message? (
                            
                            <View>
                                <Text style={{fontWeight: '550',fontSize: 14,marginBottom:2, color: 'grey' }}>Message: </Text>
                                <Text>{recrutor.requirements.message || recrutor.message}</Text>
                            </View>
                        ): null}
                            
                         
                    </View>
               
                {/* Text Content */}
                    <View style={styles.subHeader}>
                
                        {/* </View> */}
                        {/* <View style={styles.dealDetails}> */}
                            
                            
                        {/* </View> */}
                    </View>

                {/*image content */}

                {/**conditional rendering method only show image if there is any */}
                {/* {post.image && (<Image source={require( post.image}} style={styles.postImage}/>)} */}

               

                {/*footer */}
                <Link href="/chat/chat" asChild>
            
                <Pressable style={styles.button}>
                <Text style={styles.buttonText}>Bid</Text>
                <Ionicons name="chatbox-outline" size={15} color="white" />
            
            
                </Pressable></Link>

            </Pressable>
        </Link>
    )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor: 'white',
        width: '100%',
        maxWidth: 500,
        // alignSelf: 'center',

        paddingInline: 5,
        paddingBottom: 5,
       
        // marginInline: 5,
        borderRadius: 10,
    },
    //Header
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
    },
    userName:{
        fontWeight: 'bold',
        fontSize: 16,
        marginBottom:5,
    }, 
    position: {
        fontSize: 12,
        color: 'grey',
      },
    userImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 10,
        alignItems: 'center',
        
    },
    rating:{

    },
    ratingImage:{
        width: 15,
        height:15
    },
    dealDetails: {
        flexDirection: 'row',
        
    },
    dealImages:{
        aspectRatio: 1
    },
    subHeader:{
        flexDirection: 'row',
        gap: 16,
        marginLeft: 10,
    },
    infoCards:{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f6f6f6',
        // backgroundColor:'#39acff',
        padding: 4,
        paddingHorizontal:8,
        borderRadius: 5,
        gap: 6,
        marginBottom: 10,
        marginTop: 5,
        
    },

    //Body
    postImage:{
        width:'100%',
        aspectRatio: 1,
    },
    content:{
        margin: 10,
        marginTop: 0,
    },
    sdeals:{

    },
    candidatesNum:{
        
    },
    tags:{
        flexDirection: 'row',
        gap: 12,
        marginLeft: 10,
        paddingVertical: 9,
    },

    //footer
    footer:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical:10,
        borderTopWidth: 0.5,
        borderColor: 'lightgray',
        marginHorizontal: 10,
        marginTop: 3
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
    requirements:{
        paddingInline: 15,
        gap: 10,
        paddingBlock: 10,
        
    }
    
})