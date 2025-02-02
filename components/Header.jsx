import { View, TextInput, Text, StyleSheet, Image, Pressable, View as DefaultView } from 'react-native';
import { Link } from "expo-router";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
export default function Header() {
    
    return(
        <View style={styles.container}>
            {/* profileicon  */}
            <Link href={`/`} asChild>
            
                <Image source={require("../assets/images/profilePic.jpg")} style={styles.userImage}/>
            </Link>
            {/* search  */}
            <Link href={'/search/search'} asChild>
                
                    <TextInput
                        style={styles.input}
                        placeholder="Search..."
                        
                    />
                
            </Link>
            {/* post icon  */}
            <Link href={'/forms/postCandidate'} asChild>
                
                <View style={styles.postIconBg}>
                <FontAwesome6 name="add" size={15} color="grey" />
                </View>
                
            </Link>
            {/* message icon  */}
            <Link href={'/'} asChild>
                
                <View >
                <MaterialCommunityIcons name="message-processing" size={24} color="lightgrey" />
                </View>
                
            </Link>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flexDirection: 'row',
        gap: 2,
        justifyContent:'center',
        alignItems: 'center',
        padding: 5,
        paddingVertical: 10,
        marginBottom: 5,
        backgroundColor: 'white',
        width: '100%'

    },
    userImage: {
        width: 30,
        height: 30,
        borderRadius: 15,
        marginRight: 5,
        alignItems: 'center',
        
    },
    input:{
        borderWidth: 1,
        borderColor: "#ccc",
        paddingHorizontal: 10,
        paddingVertical: 5,
        width: '65%',
        borderRadius: 5,
        backgroundColor: '#f2f1f1',
        color: 'grey'
      },
    postIconBg:{
        backgroundColor: '#f2f1f1',
        paddingHorizontal: 3,
        paddingVertical:1,
        borderRadius: 3,
        marginHorizontal:5
    }
})