import { ScrollView, StyleSheet, TouchableOpacity, Modal } from "react-native";
import { Image } from 'expo-image';
import { ThemedView } from '@/components/themed-view';
import { ThemedText } from '@/components/themed-text';
import { useEffect, useState } from "react";
import { flags } from '../../assets/data/flags.js';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function game() {

    const [score, setScore] = useState(0);
    const [guess, setGuess] = useState('Choose your answer');
    const [question, setQuestion] = useState(0);
    const [gameOn, setGameOn] = useState(false);
    const [lives, setLives] = useState(null);
    const [gameOver, setGameOver] = useState(false);
    const [length, setLength] = useState(null);
    const [pick, setPick] = useState(Math.floor(Math.random() * flags.length));
    const [highScore, setHighScore] = useState([]);
    const [showHighScore, setShowHighScore] = useState(false);
    const [type, setType] = useState(null);

    const flag = flags[pick];
    const options = [
        flag.name,
        flags[Math.floor(Math.random() * flags.length)].name,
        flags[Math.floor(Math.random() * flags.length)].name,
        flags[Math.floor(Math.random() * flags.length)].name
    ];
    options.sort(function () { return 0.5 - Math.random() });

    useEffect(() => {
        const loadData = async () => {
            try {
                const data = await AsyncStorage.getItem('fwf');
                if (data) {
                    setHighScore(JSON.parse(data));
                }
            } catch (err) {
                console.error("Failed to load data", err);
            }
        };
        loadData();
    }, []);

    useEffect(() => {
        const storeData = async () => {
            try {
                await AsyncStorage.setItem('fwf', JSON.stringify(highScore));
            } catch (err) {
                console.error("Failed to save data", err);
            }
        };
        storeData();
    }, [highScore]);

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
        setQuestion(0);
        setScore(0);
        setGameOn(true);
        setGuess('Choose your answer');
    };

    const startTheGame = e => {
        if (e == 20) {
            setLength(20);
            setType('20 quesions');
        } else if (e == 50) {
            setLength(50);
            setType('50 quesions');
        } else if (e == 3) {
            setLives(3);
            setType('3 lives');
        } else if (e == 5) {
            setLives(5);
            setType('5 lives');
        } else if (e == 1) {
            setLives(1);
            setType('Ultimate');
        }
        reset();
    };

    const playAgain = _ => {
        setGameOn(false);
        setGameOver(false);
        setShowHighScore(false);

    };

    const forfeit = _ => {
        setLives(null);
        setGameOn(false);
        setGameOver(true);
    };

    useEffect(() => {
        if (gameOn && lives == 0) {
            setGameOn(false);
            setGameOver(true);
            if (!highScore.find(h => h.type === type) || highScore.some(h => h.type === type && h.score < score)) {
                setHighScore(h => h.filter(h => h.type !== type));
                setHighScore(h => [...h, { score, question, type }]);
            };
        }
    }, [lives]);

    useEffect(() => {
        if (gameOn && length == 0) {
            setGameOn(false);
            setGameOver(true);
            if (!highScore.find(h => h.type === type) || highScore.some(h => h.type === type && h.score < score)) {
                setHighScore(h => h.filter(h => h.type !== type));
                setHighScore(h => [...h, { score, question, type }]);
            };
        }
    }, [length]);

    const eraseRecords = _ => {
        setHighScore([]);
    };

    return (
        <SafeAreaProvider style={styles.body}>
            <ThemedView style={styles.game}>
                <ThemedView style={styles.container}>
                    <Image style={{ width: 350, height: 220, alignSelf: 'center' }} source={require('@/assets/images/world.png')} contentFit={'contain'} />
                </ThemedView>
                <ThemedText style={styles.title}>Choose game mode:</ThemedText>
                <TouchableOpacity onPress={_ => startTheGame(20)}><ThemedText style={styles.menu}>20 Quesions</ThemedText></TouchableOpacity>
                <TouchableOpacity onPress={_ => startTheGame(50)}><ThemedText style={styles.menu}>50 Quesions</ThemedText></TouchableOpacity>
                <TouchableOpacity onPress={_ => startTheGame(3)}><ThemedText style={styles.menu}>3 Lives</ThemedText></TouchableOpacity>
                <TouchableOpacity onPress={_ => startTheGame(5)}><ThemedText style={styles.menu}>5 Lives</ThemedText></TouchableOpacity>
                <TouchableOpacity onPress={_ => startTheGame(1)}><ThemedText style={styles.ulti}>Ultimate</ThemedText></TouchableOpacity>
                <TouchableOpacity onPress={_ => setShowHighScore(true)}><ThemedText style={styles.records}> Records</ThemedText></TouchableOpacity>

            </ThemedView>

            <Modal visible={gameOn} style={styles.modal} animationType="fade" transparent={true}>
                <ThemedView style={styles.card}>
                    <TouchableOpacity onPress={forfeit}><ThemedText style={styles.back}>Forfeit</ThemedText></TouchableOpacity>
                    {lives > 0 ?
                        <ThemedView style={{ height: 60, flexDirection: "row", alignSelf: 'center', }}>
                            <ThemedText style={styles.lives}>Lives:</ThemedText>
                            {Array.from({ length: lives }).map((_, index) => (
                                <Image key={index} style={{ width: 60, height: 60 }} source={require("@/assets/images/heart.svg")} contentFit="contain" />))}
                        </ThemedView> : null}

                    <ThemedText style={styles.title}>Guess a Country!</ThemedText>
                    <ThemedText style={styles.question}>Question #{question + 1}</ThemedText>

                    <ThemedView style={styles.container}>
                        <Image style={{ width: 380, height: 220 }} source={flag.flag} contentFit={'contain'} />
                    </ThemedView>
                    {options.map((option, index) => (
                        <TouchableOpacity key={index} onPress={() => submitGuess(option)}>
                            <ThemedText style={styles.option}>{index + 1}. {option}</ThemedText>
                        </TouchableOpacity>
                    ))}

                    {guess == "Choose your answer" ? <ThemedText style={styles.guess}>{guess}</ThemedText>
                        : <ThemedText style={guess == 'Correct!' ? styles.guess1 : styles.guess2}>{guess}</ThemedText>}
                    <ThemedText style={styles.score}>Score: {score}</ThemedText>

                </ThemedView>
            </Modal>

            <Modal visible={gameOver} style={styles.modal} animationType="fade" transparent={true}>
                <ThemedView style={styles.gameOver}>
                    <ThemedText style={styles.title}>Game Over</ThemedText>
                    <ThemedText style={styles.over}>You made <ThemedText style={styles.result}>{score}</ThemedText> correct answers
                        <br /> out of <ThemedText style={styles.result}>{question}</ThemedText> questions.</ThemedText>
                    <ThemedText style={styles.over}>Good luck next time.</ThemedText>
                    <TouchableOpacity onPress={playAgain}><ThemedText style={styles.menu}>To Menu</ThemedText></TouchableOpacity>
                </ThemedView>
            </Modal>

            <Modal visible={showHighScore} style={styles.modal} animationType="fade" transparent={true}>
                <ThemedView style={styles.gameOver}>
                    <ThemedText style={styles.title}>High Scores</ThemedText>
                    <ThemedView style={styles.over}>
                        {highScore.map(h => <ThemedText key={h.score} style={styles.question}>{h.score} of {h.question} (mode: {h.type})</ThemedText>)}
                    </ThemedView>
                    <TouchableOpacity onPress={eraseRecords}><ThemedText style={styles.menu}>Reset Records</ThemedText></TouchableOpacity>
                    <TouchableOpacity onPress={playAgain}><ThemedText style={styles.menu}>To Menu</ThemedText></TouchableOpacity>
                </ThemedView>
            </Modal>
        </SafeAreaProvider>
    )
};

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
        margin: (0, 15),
        textAlign: 'center',
        alignSelf: 'center',
        backgroundColor: '#446b77',
        borderRadius: '15px',
        padding: 12,
    },
    ulti: {
        width: '60%',
        fontFamily: 'papyrus',
        fontSize: '24px',
        color: 'white',
        margin: (0, 15),
        textAlign: 'center',
        alignSelf: 'center',
        backgroundColor: '#694477',
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
    records: {

        fontFamily: 'papyrus',
        fontSize: 16,
        color: 'white',
        marginTop: 40,
        textAlign: 'center',
        alignSelf: 'center',
        backgroundColor: '#446b77',
        borderRadius: '15px',
        padding: 8,
    },
    score: {
        fontFamily: 'papyrus',
        fontSize: '40px',
        color: 'white',
        alignSelf: 'flex-end',
        margin: 20,
    },
    guess: {
        fontFamily: 'papyrus',
        textAlign: 'center',
        fontSize: '30px',
        padding: 12,
        color: 'white',
        fontWeight: 800,
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