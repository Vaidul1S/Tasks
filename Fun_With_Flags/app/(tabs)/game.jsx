import { ScrollView, StyleSheet, TouchableOpacity, Modal } from "react-native";
import { Image } from 'expo-image';
import { ThemedView } from '@/components/themed-view';
import { ThemedText } from '@/components/themed-text';
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
    const [pick, setPick] = useState(Math.floor(Math.random() * flags.length));

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
        setPick(Math.floor(Math.random() * flags.length));
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
                    <Image style={{ width: 350, height: 220, alignSelf: 'center' }} source={require('@/assets/images/world.png')} contentFit={'contain'} />
                </ThemedView>
                <ThemedText style={styles.title}>Choose game mode:</ThemedText>
                <TouchableOpacity onPress={_ => startTheGame(20)}><ThemedText style={styles.menu}>Game of 20</ThemedText></TouchableOpacity>
                <TouchableOpacity onPress={_ => startTheGame(50)}><ThemedText style={styles.menu}>Game of 50</ThemedText></TouchableOpacity>
                <TouchableOpacity onPress={_ => startTheGame(3)}><ThemedText style={styles.menu}>3 Lives</ThemedText></TouchableOpacity>
                <TouchableOpacity onPress={_ => startTheGame(5)}><ThemedText style={styles.menu}>5 Lives</ThemedText></TouchableOpacity>

            </ThemedView>

            <Modal visible={gameOn} style={styles.modal} animationType="fade" transparent={true}>
                <ThemedView style={styles.card}>
                    <TouchableOpacity onPress={forfeit}><ThemedText style={styles.back}>Forfeit</ThemedText></TouchableOpacity>
                    {lives > 0 ? 
                    <ThemedView style={{ height: 60, flexDirection: "row", alignSelf: 'center', }}>
                        <ThemedText style={styles.lives}>Lives:</ThemedText>
                        {lives > 0 ? <Image style={{ width: 60, height: 60 }} source={require('@/assets/images/heart.svg')} contentFit={'contain'} /> : null}
                        {lives > 1 ? <Image style={{ width: 60, height: 60 }} source={require('@/assets/images/heart.svg')} contentFit={'contain'} /> : null}
                        {lives > 2 ? <Image style={{ width: 60, height: 60 }} source={require('@/assets/images/heart.svg')} contentFit={'contain'} /> : null}                        
                        {lives > 3 ? <Image style={{ width: 60, height: 60 }} source={require('@/assets/images/heart.svg')} contentFit={'contain'} /> : null}                        
                        {lives > 4 ? <Image style={{ width: 60, height: 60 }} source={require('@/assets/images/heart.svg')} contentFit={'contain'} /> : null}                        
                    </ThemedView> : null}


                    <ThemedText style={styles.title}>Guess a Country!</ThemedText>
                    <ThemedText style={styles.question}>Question #{question}</ThemedText>

                    <ThemedView style={styles.container}>
                        <Image style={{ width: 380, height: 220 }} source={{ uri: flag.flag, }} contentFit={'contain'} />
                    </ThemedView>
                    <TouchableOpacity onPress={_ => submitGuess(options[0])}><ThemedText style={styles.option}>1. {options[0]}</ThemedText></TouchableOpacity>
                    <TouchableOpacity onPress={_ => submitGuess(options[1])}><ThemedText style={styles.option}>2. {options[1]}</ThemedText></TouchableOpacity>
                    <TouchableOpacity onPress={_ => submitGuess(options[2])}><ThemedText style={styles.option}>3. {options[2]}</ThemedText></TouchableOpacity>
                    <TouchableOpacity onPress={_ => submitGuess(options[3])}><ThemedText style={styles.option}>4. {options[3]}</ThemedText></TouchableOpacity>
                    <ThemedText style={guess == 'Correct!' ? styles.guess1 : styles.guess2}>{guess}</ThemedText>
                    <ThemedText style={styles.score}>Score: {score}</ThemedText>

                </ThemedView>
            </Modal>

            <Modal visible={gameOver} style={styles.modal} animationType="fade" transparent={true}>
                <ThemedView style={styles.gameOver}>
                    <ThemedText style={styles.title}>Game Over</ThemedText>
                    <ThemedText style={styles.over}>You made <ThemedText style={styles.result}>{score}</ThemedText> correct answers
                        <br/> out of <ThemedText style={styles.result}>{question - 1}</ThemedText> questions.</ThemedText>
                    <ThemedText style={styles.over}>Good luck next time.</ThemedText>
                    <TouchableOpacity onPress={playAgain}><ThemedText style={styles.menu}>To Menu</ThemedText></TouchableOpacity>
                </ThemedView>
            </Modal>
        </SafeAreaProvider>
    )
}

const styles = StyleSheet.create({
    body: {
        width: '410px',
        alignSelf: 'center',
        backgroundColor: '#446b7762',
    },
    game: {
        flex: 1,
        alignSelf: 'center',
        justifyContent: 'center',
        width: '410px',
        backgroundColor: 'transperent',
    },
    card: {
        flex: 1,
        alignSelf: 'center',
        justifyContent: 'space-between',
        width: '410px',
    },
    gameOver: {
        flex: 1,
        alignSelf: 'center',
        justifyContent: 'center',
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
        width: '60%',
        fontFamily: 'papyrus',
        fontSize: '24px',
        color: 'white',
        margin: (0, 20),
        textAlign: 'center',
        alignSelf: 'center',
        backgroundColor: '#446b77',
        borderRadius: '15px',
        padding: 12,
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
        width: '90%',
        fontFamily: 'papyrus',
        fontSize: 20,
        color: 'white',
        margin: (0, 10),
        textAlign: 'center',
        alignSelf: 'center',
        backgroundColor: '#446b77',
        borderRadius: '15px',
        padding: (0, 8),
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
        padding: 12,
        color: 'lime',
        fontWeight: 800,
    },
    guess2: {
        fontFamily: 'papyrus',
        textAlign: 'center',
        fontSize: '30px',
        padding: 12,
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
        alignSelf: 'center',
        paddingLeft: 20,
    },
    over: {
        fontFamily: 'papyrus',
        fontSize: '24px',
        color: 'white',
        textAlign: 'center',
        padding: 25,
        lineHeight: 'none',
    },
    result: {
        fontFamily: 'papyrus',
        fontSize: '24px',
        color: 'lime',
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