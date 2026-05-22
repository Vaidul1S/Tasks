import { Image } from 'expo-image';
import { ThemedView } from '@/components/themed-view';
import { ThemedText } from '@/components/themed-text';
import { ScrollView, StyleSheet } from 'react-native';
import { flags } from '../../assets/data/flags.js';

export default function sheet() {

    return (

        <ScrollView style={styles.sheet}>
            {flags.map(f =>
                <ThemedView key={f.name} style={styles.list} >
                    <ThemedText style={styles.text}>{f.name} </ThemedText>
                    <ThemedView style={styles.container}>
                        <Image style={{ width: 140, height: 80, alignSelf: 'center' }} source={f.flag} contentFit={'contain'} />
                    </ThemedView>
                </ThemedView>
            )}
        </ScrollView>

    );
}

const styles = StyleSheet.create({
    sheet: {
        alignSelf: 'center',
        padding: 10,
        width: 410,
        backgroundColor: '#446b7762',
    },
    list: {
        flexDirection: "column",
        alignContent: 'center',
        margin: 10,
        backgroundColor: 'transperent',
    },
    text: {
        textAlign: 'center',
        fontSize: 20,
        paddingBottom: 5,
        fontFamily: 'papyrus',
    },
    container: {
        height: 80,
        alignContent: 'center',
        justifyContent: 'center',
        flexWrap: 'wrap',
        backgroundColor: 'transperent',
    },

})