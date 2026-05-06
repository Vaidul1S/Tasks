import { ScrollView, StyleSheet, TouchableOpacity, Text, Modal } from "react-native";
import { Image } from 'expo-image';
import { ThemedView } from '@/components/themed-view';
import { useEffect, useState } from "react";
import { flags } from '../../assets/data/flags.js';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function game() {

    const [score, setScore] = useState(0);
    const [guess, setGuess] = useState('Choose your answer');
    const [question, setQuestion] = useState(1);
    const [gameOn, setGameOn] = useState(false);
    const [lives, setLives] = useState(null);
    const [gameOver, setGameOver] = useState(false);
    const [length, setLength] = useState(null);

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
            if (lives > 0) {
                setLives(l => l - 1);
            }
        }
        if (length > 0) {
            setLength(l => l - 1);
        }
        setQuestion(q => q + 1);
    };

    const reset = _ => {
        setQuestion(1);
        setScore(0);
        setGameOn(true);
        setGuess('Choose your answer');
    }
    const startTheGame = e => {
        if (e == 20) {
            setLength(20);
        } else if (e == 50) {
            setLength(50);
        } else if (e == 3) {
            setLives(3);
        } else if (e == 5) {
            setLives(5);
        }
        reset();
    };

    const playAgain = _ => {
        setGameOn(false);
        setGameOver(false);
    };

    const forfeit = _ => {
        setLives(null);
        setGameOn(false);
        setGameOver(true);
    }

    useEffect(() => {
        if (gameOn && lives == 0) {
            setGameOn(false);
            setGameOver(true);
        }
    }, [lives]);

    useEffect(() => {
        if (gameOn && length == 0) {
            setGameOn(false);
            setGameOver(true);
        }
    }, [length]);

    return (
        <SafeAreaProvider style={styles.body}>
            <ThemedView style={styles.game}>
                <ThemedView style={styles.container}>
                    <Image style={{ width: 350, height: 220, alignSelf: 'center' }} source={require('@/assets/images/world.png')} resizeMode={'contain'} />
                </ThemedView>
                <Text style={styles.title}>Choose game mode:</Text>
                <TouchableOpacity onPress={_ => startTheGame(20)} style={styles.menu}>Game of 20</TouchableOpacity>
                <TouchableOpacity onPress={_ => startTheGame(50)} style={styles.menu}>Game of 50</TouchableOpacity>
                <TouchableOpacity onPress={_ => startTheGame(3)} style={styles.menu}>3 Lives</TouchableOpacity>
                <TouchableOpacity onPress={_ => startTheGame(5)} style={styles.menu}>5 Lives</TouchableOpacity>

            </ThemedView>

            <Modal visible={gameOn} style={styles.modal} animationType="fade" transparent={true}>
                <ThemedView style={styles.card}>
                    <TouchableOpacity onPress={forfeit} style={styles.back}>Forfeit</TouchableOpacity>
                    {lives > 0 ? <Text style={styles.lives}>Lives: {lives}</Text> : null}
                    <Text style={styles.title}>Guess a Country!</Text>
                    <Text style={styles.question}>Question #{question}</Text>

                    <ThemedView style={styles.container}>
                        <Image style={{ width: 380, height: 220 }} source={{ uri: flag.flag, }} resizeMode={'contain'} />
                    </ThemedView>
                    <TouchableOpacity onPress={_ => submitGuess(options[0])}><Text style={styles.option}>1. {options[0]}</Text></TouchableOpacity>
                    <TouchableOpacity onPress={_ => submitGuess(options[1])}><Text style={styles.option}>2. {options[1]}</Text></TouchableOpacity>
                    <TouchableOpacity onPress={_ => submitGuess(options[2])}><Text style={styles.option}>3. {options[2]}</Text></TouchableOpacity>
                    <TouchableOpacity onPress={_ => submitGuess(options[3])}><Text style={styles.option}>4. {options[3]}</Text></TouchableOpacity>
                    <Text style={guess == 'Correct!' ? styles.guess1 : styles.guess2}>{guess}</Text>
                    <Text style={styles.score}>Score: {score}</Text>

                </ThemedView>
            </Modal>

            <Modal visible={gameOver} style={styles.modal} animationType="fade" transparent={true}>
                <ThemedView style={styles.game}>
                    <Text style={styles.title}>Game Over</Text>
                    <Text style={styles.over}>You made {score} correct answers out of {question - 1} questions.</Text>
                    <Text style={styles.over}>Good luck next time.</Text>
                    <TouchableOpacity onPress={playAgain} style={styles.menu}>To Menu</TouchableOpacity>
                </ThemedView>
            </Modal>
        </SafeAreaProvider>
    )
}

const styles = StyleSheet.create({
    body: {
        width: '410px',
        alignSelf: 'center',
    },
    game: {
        flex: 1,
        alignSelf: 'center',
        justifyContent: 'center',
        width: '410px',          
    },
    card: {
        flex: 1,
        alignSelf: 'center',
        justifyContent: 'space-between',
        width: '410px',
    },
    title: {
        fontFamily: 'papyrus',
        fontSize: '40px',
        color: 'white',
        margin: 10,
        textAlign: 'center',
    },
    menu: {
        fontFamily: 'papyrus',
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
        alignSelf: 'center',
    },
    container: {
        height: 250,
        alignContent: 'center',
        justifyContent: 'center',
        flexWrap: 'wrap',
        backgroundColor: 'transperent',
    },
    option: {
        fontFamily: 'papyrus',
        fontSize: '18px',
        color: 'white',
        margin: (0, 10),
        textAlign: 'center',
        border: '1.5px, solid, #ffffff80',
        borderRadius: '25px',
        padding: 8
    },
    score: {
        fontFamily: 'papyrus',
        fontSize: '40px',
        color: 'white',
        alignSelf: 'flex-end',
        margin: 20,
    },
    guess1: {
        fontFamily: 'papyrus',
        textAlign: 'center',
        fontSize: '30px',
        padding: 15,
        color: 'lime',
        fontWeight: 800,
    },
    guess2: {
        fontFamily: 'papyrus',
        textAlign: 'center',
        fontSize: '30px',
        padding: 15,
        color: 'red',
        fontWeight: 800,
    },
    question: {
        fontFamily: 'papyrus',
        fontSize: '18px',
        color: 'white',
        textAlign: 'center',
        paddingBottom: 8,
    },
    lives: {
        fontFamily: 'papyrus',
        fontSize: '25px',
        color: 'lime',
        alignSelf: 'flex-start',
        paddingLeft: 20,
    },
    over: {
        fontFamily: 'papyrus',
        fontSize: '18px',
        color: 'white',
        textAlign: 'center',
        padding: 25,
    },
    back: {
        fontFamily: 'papyrus',
        fontSize: '14px',
        color: 'white',
        margin: (0, 8),
        textAlign: 'center',
        border: '1.5px, solid, #ffffff80',
        borderRadius: '25px',
        padding: 8,
        width: '100px',
    },
})