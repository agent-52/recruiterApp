import { View, Text, StyleSheet, Image, Pressable, View as DefaultView } from 'react-native';
import { Recrutor } from '../types';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link } from "expo-router";
import Tags from "./Tags";

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

export default function PostListItem({ recrutor }: RecrutorListItemProps) {
    
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

                 <View style={styles.tags}>
                    {recrutor.tags?.map((tag, index) =>(<Tags text={tag} key={index}/>))}
                </View>
               
                {/* Text Content */}
                    <View style={styles.subHeader}>
                        
                            
                            <View style={styles.infoCards}>
                                <FontAwesome5 name="money-bill-alt" size={20} color="grey"/>
                                <Text >{recrutor.successful_deals}</Text>
                                <Text >Deals</Text>
                                
                            </View>
                        {/* </View> */}
                        {/* <View style={styles.dealDetails}> */}
                            
                            <View  style={styles.infoCards}>
                                <FontAwesome name="briefcase" size={20} color="grey" />
                                
                                <Text >{recrutor.num_candidates_listed}</Text>
                                <Text >Candidates</Text>
                            </View>
                        {/* </View> */}
                    </View>

                {/*image content */}

                {/**conditional rendering method only show image if there is any */}
                {/* {post.image && (<Image source={require( post.image}} style={styles.postImage}/>)} */}

               

                {/*footer */}
                <View style={styles.footer}>
                    <FooterButton text="Bookmark" icon='bookmark'/>
                    <Text style={{color: "#1c90ff", fontWeight: 600}}>View Details</Text>
                    
                    
                </View>

            </Pressable>
        </Link>
    )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor: 'white',
        width: '95%',
        maxWidth: 500,
        alignSelf: 'center',
        
       
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
    }
    
})