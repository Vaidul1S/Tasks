import { ScrollView, StyleSheet } from "react-native";
import { Image } from 'expo-image';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useState } from "react";
import { flags } from '../../assets/data/flags.js';

export default function game() {

    const [score, setScore] = useState(0);

    let pick = Math.floor(Math.random() * flags.length);
    const flag = flags[pick];
    const options = {option1, option2, option3, option4};

    return (
        <ScrollView >
            <ThemedView style={styles.body}>
                <ScrollView style={styles.container}>
                    <Image style={{width: 380, height: 200}} source={{ uri: flag.flag, }} resizeMode={'cover'}/>
                </ScrollView>

                <ThemedText style={styles.option}>1. {flag.name}</ThemedText>
                <ThemedText style={styles.option}>2. </ThemedText>
                <ThemedText style={styles.option}>3. </ThemedText>
                <ThemedText style={styles.option}>4. </ThemedText>
                <ThemedText style={styles.score}>Score: {score}</ThemedText>

            </ThemedView>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    body: {
        alignSelf: 'center',
    },
    container: {
        flex: 1,        
        width: 400,
        height: 300,
        padding: 10,
    },    
    option: {
        fontsize: 20,
        margin: (0, 15),
        paddingLeft: 30,
    },
    score: {
        fontsize: 40,
        alignSelf: 'flex-end',
        margin: 30,
    },
})