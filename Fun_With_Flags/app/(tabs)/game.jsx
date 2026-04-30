import { ScrollView, StyleSheet } from "react-native";
import { Image } from 'expo-image';
import { ThemedText } from '@/components/themed-text';
import { useState } from "react";
import { flags } from '../../assets/data/flags.js';

export default function game() {

    const [score, setScore] = useState(0);

    let pick = Math.floor(Math.random() * flags.length);
    const flag = flags[pick];

    return (
        <ScrollView>
            <ScrollView style={styles.container}>
                <Image style={styles.image} source={{ uri: flag.flag, }} />
            </ScrollView>

            <ThemedText style={styles.option}>1. {flag.name}</ThemedText>
            <ThemedText style={styles.option}>2. </ThemedText>
            <ThemedText style={styles.option}>3. </ThemedText>
            <ThemedText style={styles.option}>4. </ThemedText>
            <ThemedText style={styles.score}>Score: {score}</ThemedText>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        objectFit: 'contain',
        position: 'relative',
        height: 300,
    },
    image: {
        width: 190,
        heigh: 100,
        flex: 1,
        position: 'relative',
        objectFit: 'contain',
    },
    option: {
        fontsize: 20,
        margin: (0, 10),
        paddingLeft: 30,
    },
    score: {
        fontsize: 40,
        alignSelf: 'flex-end',
        margin: 30,
    },
})