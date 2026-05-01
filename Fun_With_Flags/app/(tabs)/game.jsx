import { ScrollView, StyleSheet, TouchableOpacity, Text } from "react-native";
import { Image } from 'expo-image';
import { ThemedView } from '@/components/themed-view';
import { useState } from "react";
import { flags } from '../../assets/data/flags.js';

export default function game() {

    const [score, setScore] = useState(0);
    const [mistakes, setMistakes] = useState(0);

    let pick = Math.floor(Math.random() * flags.length);
    const flag = flags[pick];
    let option1 = Math.floor(Math.random() * flags.length);
    let option2 = Math.floor(Math.random() * flags.length);
    let option3 = Math.floor(Math.random() * flags.length);
    let options = [flag.name, flags[option1].name, flags[option2].name, flags[option3].name];
    options.sort(function(){return 0.5 - Math.random()});

    const submitGuess = e =>{
        if (e == flag.name){
            setScore(s => s + 1);
        } else {
            setMistakes(m => m + 1);
        }
    }
    return (
        <ScrollView >
            <ThemedView style={styles.body}>
                <ScrollView style={styles.container}>
                    <Image style={{width: 380, height: 220}} source={{ uri: flag.flag, }} resizeMode={'cover'}/>
                </ScrollView>

                <TouchableOpacity onPress={_=> submitGuess(options[0])}><Text style={styles.option}>1. {options[0]}</Text></TouchableOpacity>
                <TouchableOpacity onPress={_=> submitGuess(options[1])}><Text style={styles.option}>2. {options[1]}</Text></TouchableOpacity>
                <TouchableOpacity onPress={_=> submitGuess(options[2])}><Text style={styles.option}>3. {options[2]}</Text></TouchableOpacity>
                <TouchableOpacity onPress={_=> submitGuess(options[3])}><Text style={styles.option}>4. {options[3]}</Text></TouchableOpacity>
                <Text style={styles.score}>Score: {score}</Text>

            </ThemedView>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    body: {
        alignSelf: 'center',
        color: 'white',
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
        border: '1px',
        borderRadius: '50%',
    },
    score: {
        fontsize: 60,
        alignSelf: 'flex-end',
        margin: 30,
    },
})