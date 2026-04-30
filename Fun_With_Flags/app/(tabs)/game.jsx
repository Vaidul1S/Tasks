import { ScrollView, StyleSheet } from "react-native";
import { Image } from 'expo-image';
import { ThemedText} from '@/components/themed-text';

export default function game(){

    return(
        <ScrollView>
            <Image style={styles.image}/>
            <ThemedText style={styles.option}>1. </ThemedText>
            <ThemedText style={styles.option}>2. </ThemedText>
            <ThemedText style={styles.option}>3. </ThemedText>
            <ThemedText style={styles.option}>4. </ThemedText>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    image:{
        width:190,
        heigh: 100,
    },
    option:{
        fontsize: 20,
    },
})