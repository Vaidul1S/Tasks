import { ScrollView } from "react-native";
import { Image } from 'expo-image';
import { ThemedText, StyleSheet} from '@/components/themed-text';

export default function guess_a_country(){

    return(
        <ScrollView>
            <Image/>
            <ThemedText clasname={option1}>1. </ThemedText>
            <ThemedText clasname={option2}>2. </ThemedText>
            <ThemedText clasname={option3}>3. </ThemedText>
            <ThemedText clasname={option4}>4. </ThemedText>
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