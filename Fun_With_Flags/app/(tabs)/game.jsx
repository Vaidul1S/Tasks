import { ScrollView, StyleSheet, TouchableOpacity, Text } from "react-native";
import { Image } from 'expo-image';
import { ThemedView } from '@/components/themed-view';
import { useState } from "react";
import { flags } from '../../assets/data/flags.js';

export default function game() {

    const [score, setScore] = useState(0);
    const [guess, setGuess] = useState('Take a guess');
    const [question, setQuestion] = useState(1);

    let pick = Math.floor(Math.random() * flags.length);
    const flag = flags[pick];
    let option1 = Math.floor(Math.random() * flags.length);
    let option2 = Math.floor(Math.random() * flags.length);
    let option3 = Math.floor(Math.random() * flags.length);
    let options = [flag.name, flags[option1].name, flags[option2].name, flags[option3].name];
    options.sort(function () { return 0.5 - Math.random() });


    const submitGuess = e => {
        if (e == flag.name) {
            setScore(s => s + 1);
            setGuess('Correct!');
        } else {
            setGuess('Wrong!');
        }
        setQuestion(q => q + 1);
    }
    return (
        <ScrollView >
            <ThemedView style={styles.body}>
                <Text style={styles.score}>Guess a Country!</Text>
                <Text style={styles.question}>Question #{question}</Text>
                <ScrollView style={styles.container}>
                    <Image style={{ width: 380, height: 220 }} source={{ uri: flag.flag, }} resizeMode={'contain'} />
                </ScrollView>

                <TouchableOpacity onPress={_ => submitGuess(options[0])}><Text style={styles.option}>1. {options[0]}</Text></TouchableOpacity>
                <TouchableOpacity onPress={_ => submitGuess(options[1])}><Text style={styles.option}>2. {options[1]}</Text></TouchableOpacity>
                <TouchableOpacity onPress={_ => submitGuess(options[2])}><Text style={styles.option}>3. {options[2]}</Text></TouchableOpacity>
                <TouchableOpacity onPress={_ => submitGuess(options[3])}><Text style={styles.option}>4. {options[3]}</Text></TouchableOpacity>
                <Text style={guess == 'Correct!' ? styles.guess1 : styles.guess2}>{guess}</Text>
                <Text style={styles.score}>Score: {score}</Text>

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
        height: 300,
        padding: 10,
        alignSelf: 'center',
    },
    option: {
        fontFamily: 'monospace',
        fontSize: '18px',
        color: 'white',
        margin: (0, 15),
        textAlign: 'center',
        border: '1.5px, solid, #ffffff80',
        borderRadius: '25px',
        padding: 8
    },
    score: {
        fontFamily: 'monospace',
        fontSize: '40px',
        color: 'white',
        alignSelf: 'flex-end',
        margin: 30,
    },
    guess1: {
        fontFamily: 'monospace',
        textAlign: 'center',
        fontSize: '26px',
        padding: 15,
        color: 'lime',
    },
    guess2: {
        fontFamily: 'monospace',
        textAlign: 'center',
        fontSize: '26px',
        paddingTop: 15,
        color: 'red',
    },
    question: {
        fontFamily: 'monospace',
        fontSize: '18px',
        color: 'white',
        textAlign: 'center',
        paddingBottom: 8,
    },
})