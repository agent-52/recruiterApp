import {View, Text , StyleSheet, Image, Pressable} from "react-native";

type TagsbuttonProp = {
    text: string;
    // icon: React.ComponentProps<typeof FontAwesome>['name'];
}
export default function Tags({text}: TagsbuttonProp){

    return(
        <View style={styles.button}>
            <Text style={styles.text}>{text}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    button:{
        backgroundColor: '#f6f6f6',
        // backgroundColor:'#39acff',
        padding: 4,
        paddingHorizontal:8,
        borderRadius: 5,
        
        // boxShadow: '0 8px 8px -10px #1c90ff '

    },
    text:{
        color: 'grey',
    }
})

