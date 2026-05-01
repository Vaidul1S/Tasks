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
    let option1 = Math.floor(Math.random() * flags.length);
    let option2 = Math.floor(Math.random() * flags.length);
    let option3 = Math.floor(Math.random() * flags.length);
    let options = [flag.name, flags[option1].name, flags[option2].name, flags[option3].name];
    options.sort(function(){return 0.5 - Math.random()});

    return (
        <ScrollView >
            <ThemedView style={styles.body}>
                <ScrollView style={styles.container}>
                    <Image style={{width: 380, height: 200}} source={{ uri: flag.flag, }} resizeMode={'cover'}/>
                </ScrollView>

                <ThemedText style={styles.option}>1. {options[0]}</ThemedText>
                <ThemedText style={styles.option}>2. {options[1]}</ThemedText>
                <ThemedText style={styles.option}>3. {options[2]}</ThemedText>
                <ThemedText style={styles.option}>4. {options[3]}</ThemedText>
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