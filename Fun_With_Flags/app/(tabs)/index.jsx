import { ScrollView, StyleSheet, TouchableOpacity, Modal, View, Text } from "react-native";
import { Image } from 'expo-image';
import { useCallback, useEffect, useState, useMemo } from "react";
import { flags } from '../../assets/data/flags.js';
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
    const [highScoreLoaded, setHighScoreLoaded] = useState(false);
    const [showHighScore, setShowHighScore] = useState(false);
    const [type, setType] = useState(null);
    const [newRecord, setNewRecord] = useState(false);

    const { flag, options } = useMemo(() => {
        const flag = flags[pick];
        const opts = [
            flag.name,
            flags[Math.floor(Math.random() * flags.length)].name,
            flags[Math.floor(Math.random() * flags.length)].name,
            flags[Math.floor(Math.random() * flags.length)].name,
        ].sort(() => 0.5 - Math.random());
        return { flag, options: opts };
    }, [pick]);

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
        if (!highScoreLoaded) return;
        const storeData = async () => {
            try {
                await AsyncStorage.setItem('fwf', JSON.stringify(highScore));
            } catch (err) {
                console.error("Failed to save data", err);
            } finally {
                setHighScoreLoaded(true);
            }
        };
        storeData();
    }, [highScore, highScoreLoaded]);

    const submitGuess = e => {
        if (e === flag.name) {
            setScore(s => s + 1);
            setGuess('Correct!');
        } else {
            setGuess('Wrong!');
            if (lives !== null) {
                setLives(l => l - 1);
            }
        }
        if (length !== null) {
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
        setLives(null);
        setLength(null);

        if (e === 20) {
            setLength(20);
            setType('20 quesions');
        } else if (e === 50) {
            setLength(50);
            setType('50 quesions');
        } else if (e === 3) {
            setLives(3);
            setType('3 lives');
        } else if (e === 5) {
            setLives(5);
            setType('5 lives');
        } else if (e === 1) {
            setLives(1);
            setType('Ultimate');
        }
        reset();
    };

    const playAgain = _ => {
        setGameOn(false);
        setGameOver(false);
        setShowHighScore(false);
        setNewRecord(false);
    };

    const forfeit = _ => {
        setLives(null);
        setGameOn(false);
        setGameOver(true);
    };

    const saveRecord = useCallback((currentScore, currentQuestion) => {
        if (
            !highScore.find(h => h.type === type) ||
            highScore.some(h => h.type === type && h.score < currentScore)
        ) {
            setHighScore(h => [
                ...h.filter(h => h.type !== type),
                { score: currentScore, question: currentQuestion, type },
            ]);
            setNewRecord(true);
        }
    }, [highScore, type]);

    useEffect(() => {
        if (gameOn && lives === 0) {
            setGameOn(false);
            setGameOver(true);
            saveRecord(score, question);
        }
    }, [lives, gameOn, score, question, type]);

    useEffect(() => {
        if (gameOn && length === 0) {
            setGameOn(false);
            setGameOver(true);
            saveRecord(score, question);
        }
    }, [length, gameOn, score, question, type]);

    const eraseRecords = _ => {
        setHighScore([]);
    };

    return (
        <View style={styles.body}>
            <View style={styles.game}>
                <View style={styles.container}>
                    <Image style={{ width: 350, height: 220, alignSelf: 'center' }} source={require('@/assets/images/world.png')} contentFit={'contain'} />
                </View>
                <Text style={styles.title}>Fun With Flags!</Text>
                <TouchableOpacity style={styles.touches} onPress={_ => startTheGame(20)}><Text style={styles.menu}>20 Quesions</Text></TouchableOpacity>
                <TouchableOpacity style={styles.touches} onPress={_ => startTheGame(50)}><Text style={styles.menu}>50 Quesions</Text></TouchableOpacity>
                <TouchableOpacity style={styles.touches} onPress={_ => startTheGame(3)}><Text style={styles.menu}>3 Lives</Text></TouchableOpacity>
                <TouchableOpacity style={styles.touches} onPress={_ => startTheGame(5)}><Text style={styles.menu}>5 Lives</Text></TouchableOpacity>
                <TouchableOpacity style={styles.touches} onPress={_ => startTheGame(1)}><Text style={styles.ulti}>Ultimate</Text></TouchableOpacity>
                <TouchableOpacity style={styles.touches} onPress={_ => setShowHighScore(true)}><Text style={styles.records}> Records</Text></TouchableOpacity>

            </View>

            <Modal visible={gameOn} style={styles.modal} animationType="fade" transparent={false}>
                <View style={styles.card}>
                    <TouchableOpacity onPress={forfeit}><Text style={styles.forfeit}>Forfeit</Text></TouchableOpacity>
                    {lives > 0 ?
                        <View style={{ height: 60, flexDirection: "row", alignSelf: 'center', }}>
                            <Text style={styles.lives}>Lives:</Text>
                            {Array.from({ length: lives }).map((_, index) => (
                                <Image key={index} style={{ width: 60, height: 60 }} source={require("@/assets/images/heart.svg")} contentFit="contain" />))}
                        </View> : null}

                    <Text style={styles.title}>Guess a Country!</Text>
                    <Text style={styles.question}>Question #{question + 1}</Text>

                    <View style={styles.container}>
                        <Image style={{ width: 380, height: 220 }} source={flag.flag} contentFit={'contain'} />
                    </View>
                    {options.map((option, index) => (
                        <TouchableOpacity key={index} onPress={() => submitGuess(option)}>
                            <Text style={styles.option}>{index + 1}. {option}</Text>
                        </TouchableOpacity>
                    ))}

                    {guess == "Choose your answer" ? <Text style={styles.guess}>{guess}</Text>
                        : <Text style={guess == 'Correct!' ? styles.guess1 : styles.guess2}>{guess}</Text>}
                    <Text style={styles.score}>Score: {score}</Text>

                </View>
            </Modal>

            <Modal visible={gameOver} style={styles.modal} animationType="fade" transparent={false} >
                <View style={styles.gameOver}>
                    <Text style={styles.title}>Game Over</Text>
                    {newRecord ? <Text style={styles.newrecord}>New Record!!!</Text> : null}

                    <Text style={styles.over}>You made <Text style={styles.result}>{score}</Text> correct answers
                        <br /> out of <Text style={styles.result}>{question}</Text> questions.</Text>
                    <Text style={styles.over}>Good luck next time.</Text>
                    <TouchableOpacity style={styles.touches} onPress={playAgain}><Text style={styles.menu}>To Menu</Text></TouchableOpacity>
                </View>
            </Modal>

            <Modal visible={showHighScore} style={styles.modal} animationType="fade" transparent={false}>
                <View style={styles.gameOver}>
                    <Text style={styles.title}>High Scores</Text>
                    <View style={styles.over}>
                        {highScore.map(h => <Text key={h.score} style={styles.question}>{h.score} of {h.question} (mode: {h.type})</Text>)}
                    </View>
                    <TouchableOpacity style={styles.touches} onPress={eraseRecords}><Text style={styles.menu}>Reset Records</Text></TouchableOpacity>
                    <TouchableOpacity style={styles.touches} onPress={playAgain}><Text style={styles.menu}>To Menu</Text></TouchableOpacity>
                </View>
            </Modal>
        </View>
    )
};

const styles = StyleSheet.create({
    body: {
        width: '415px',
        height: '100vh',
        alignSelf: 'center',
        backgroundColor: '#446b7762',
    },
    game: {
        flex: 1,
        alignSelf: 'center',
        justifyContent: 'center',
        width: '415px',
    },
    card: {
        flex: 1,
        alignSelf: 'center',
        justifyContent: 'space-between',
        width: '415px',
        backgroundColor: '#102b33',
    },
    gameOver: {
        flex: 1,
        alignSelf: 'center',
        justifyContent: 'center',
        width: '415px',
        backgroundColor: '#102b33',
    },
    title: {
        fontFamily: 'papyrus',
        fontSize: '40px',
        color: 'white',
        textAlign: 'center',
    },
    touches: {
        width: '60%',
        alignSelf: 'center',
        margin: (0, 12),
    },
    menu: {
        width: '100%',
        fontFamily: 'papyrus',
        fontSize: '24px',
        color: 'white',
        textShadow: '-2px 2px black',
        textAlign: 'center',
        alignSelf: 'center',
        backgroundColor: '#446b77',
        borderRadius: '20px',
        padding: 8,
    },
    ulti: {
        width: '100%',
        fontFamily: 'papyrus',
        fontSize: '24px',
        color: 'white',
        textShadow: '-2px 2px black',
        textAlign: 'center',
        alignSelf: 'center',
        backgroundColor: '#694477',
        borderRadius: '20px',
        padding: 8,
    },
    modal: {
        flex: 1,
        alignSelf: 'center',
        backgroundColor: '#446b7700',
    },
    container: {
        height: 250,
        alignContent: 'center',
        justifyContent: 'center',
        flexWrap: 'wrap',
    },
    option: {
        width: '90%',
        fontFamily: 'papyrus',
        fontSize: 22,
        color: 'white',
        textShadow: '-2px 2px black',
        margin: (0, 10),
        textAlign: 'center',
        alignSelf: 'center',
        backgroundColor: '#446b77',
        borderRadius: '20px',
        padding: (0, 8),
    },
    records: {
        textShadow: '-2px 2px black',
        fontFamily: 'papyrus',
        fontSize: 16,
        color: 'white',
        textAlign: 'center',
        alignSelf: 'center',
        backgroundColor: '#446b77',
        borderRadius: '20px',
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
        fontSize: '24px',
        color: 'lime',
        alignSelf: 'center',
        paddingLeft: 20,
    },
    over: {
        fontFamily: 'papyrus',
        fontSize: '24px',
        color: 'white',
        textAlign: 'center',
        padding: 24,
        lineHeight: 'none',
    },
    newrecord: {
        fontFamily: 'papyrus',
        fontSize: '24px',
        color: 'lime',
        textAlign: 'center',
        padding: 24,
        lineHeight: 'none',
    },
    result: {
        fontFamily: 'papyrus',
        fontSize: '24px',
        color: 'lime',
    },
    forfeit: {
        fontFamily: 'papyrus',
        fontSize: '18px',
        color: 'white',
        textShadow: '-2px 2px black',
        margin: (0, 8),
        textAlign: 'center',
        backgroundColor: '#446b77',
        borderRadius: '20px',
        padding: 8,
        width: '100px',
    },
})