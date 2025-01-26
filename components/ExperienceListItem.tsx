import { Text, View, Image, StyleSheet } from "react-native"
import { Experience } from "../types"

type ExperienceListitemProps = {
    experience: Experience;
    isFirst: boolean;
}
export default function ExperienceListItem({experience, isFirst}: ExperienceListitemProps) {
    return(
        <View style={styles.container}>
            <Image source={{uri: experience.companyImage}} style={styles.image}/>
            <View>
                <Text style={styles.title}>{experience.title}</Text>
                <Text>{experience.companyName}</Text>
            </View>
        </View>
        
    ) 
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        padding: 5,
        marginBottom: 10,
        borderColor: 'lightgrey',
        borderBottomWidth: 0.5,
        alignItems: 'center',
        backgroundColor: 'white'

    },
    image: {
        width: 50,
        aspectRatio: 1,
        marginRight:5
    }, 
    title:{
        fontWeight: '600'
    },
}) 