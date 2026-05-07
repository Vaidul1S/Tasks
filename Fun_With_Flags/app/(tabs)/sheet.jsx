import { Image } from 'expo-image';
import { countries } from '../../assets/data/countries.js';
import { ThemedView } from '@/components/themed-view';
import { ThemedText } from '@/components/themed-text';
import { ScrollView, SafeAreaView, StyleSheet } from 'react-native';
import { flags } from '../../assets/data/flags.js';

export default function sheet() {

    return (

        <ScrollView style={styles.sheet}>
            {flags.map(f =>
                <ThemedView style={styles.list} key={flags.name}>
                    <ThemedText style={styles.text}>{f.name} </ThemedText>
                    <SafeAreaView style={styles.container}>
                        <Image style={{ width: 140, height: 80, alignSelf: 'center' }} source={{ uri: f.flag, }} resizeMode={'contain'} />
                    </SafeAreaView>
                </ThemedView>
            )}
        </ScrollView>

    );
}

const styles = StyleSheet.create({
    sheet: {
        flex: 1,
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