import { ScrollView } from "react-native";
import { Image } from 'expo-image';
import { ThemedText } from '@/components/themed-text';

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