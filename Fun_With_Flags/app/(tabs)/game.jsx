import { ScrollView, StyleSheet, TouchableOpacity, Text, Modal } from "react-native";
import { Image } from 'expo-image';
import { ThemedView } from '@/components/themed-view';
import { useState } from "react";
import { flags } from '../../assets/data/flags.js';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function game() {

    const [score, setScore] = useState(0);
    const [guess, setGuess] = useState('Take a guess');
    const [question, setQuestion] = useState(1);
    const [gameOn, setGameOn] = useState(false);
    const [lives, setLives] = useState(0);   
    const [gameOver, setGameOver] = useState(false); 

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
            if(lives > 0){
                setLives(l => l - 1);
            }
        }
        setQuestion(q => q + 1);
    };

    const startTheGame = e => {
        if(e == 20){
            setQuestion(20);
            setGameOn(true);
        } else if (e == 50){
            setQuestion(50);
            setGameOn(true);
        } else if (e == 3){
            setLives(3);
            setGameOn(true);
        } else if (e == 5){
            setLives(5);
            setGameOn(true);
        }
    };

    return (
        <SafeAreaProvider>
            <ThemedView style={styles.game}>
                <Text style={styles.title}>Shall we play a game?</Text>
                <TouchableOpacity onPress={_=> startTheGame(20)} style={styles.menu}>Game of 20</TouchableOpacity>
                <TouchableOpacity onPress={_=> startTheGame(50)} style={styles.menu}>Game of 50</TouchableOpacity>
                <TouchableOpacity onPress={_=> startTheGame(3)} style={styles.menu}>3 Lives</TouchableOpacity>
                <TouchableOpacity onPress={_=> startTheGame(5)} style={styles.menu}>5 Lives</TouchableOpacity>

            </ThemedView>

            <Modal visible={gameOn} style={styles.modal} >
                <ThemedView style={styles.body}>
                    <Text style={styles.lives}>Lives: {lives}</Text>
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
            </Modal>
        </SafeAreaProvider>
    )
}

const styles = StyleSheet.create({
    game: {
        flex: 1,
        alignSelf: 'center',
        justifyContent: 'center',
    },
    title: {
        fontFamily: 'monospace',
        fontSize: '44px',
        color: 'white',        
        margin: 30,
    },
    menu: {
        fontFamily: 'monospace',
        fontSize: '24px',
        color: 'white',
        margin: (0, 20),
        textAlign: 'center',
        border: '1.5px, dashed, #ffffff80',
        borderRadius: '25px',
        padding: 10
    },
    modal: {
        flex: 1,
    },
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
        fontSize: '30px',
        padding: 15,
        color: 'lime',
        fontWeight: 800,
    },
    guess2: {
        fontFamily: 'monospace',
        textAlign: 'center',
        fontSize: '30px',
        paddingTop: 15,
        color: 'red',
        fontWeight: 800,
    },
    question: {
        fontFamily: 'monospace',
        fontSize: '18px',
        color: 'white',
        textAlign: 'center',
        paddingBottom: 8,
    },
    lives:{
        fontFamily: 'monospace',
        fontSize: '30px',
        color: 'lime',
        alignSelf: 'flex-start',
        padding: (40, 20),
    },
})