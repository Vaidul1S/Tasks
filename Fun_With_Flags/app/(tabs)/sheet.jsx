import { Image } from 'expo-image';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { flags } from '../../assets/data/flags.js';

export default function sheet() {

    return (

        <ScrollView style={styles.sheet}>
            {flags.map(f =>
                <View key={f.name} style={styles.list} >
                    <Text style={styles.text}>{f.name} </Text>
                    <View style={styles.container}>
                        <Image style={{ width: 140, height: 80, alignSelf: 'center' }} source={f.flag} contentFit={'contain'} />
                    </View>
                </View>
            )}
        </ScrollView>

    );
}

const styles = StyleSheet.create({
    sheet: {
        alignSelf: 'center',
        padding: 10,
        width: 415,
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
        color: 'white',
    },
    container: {
        height: 80,
        alignContent: 'center',
        justifyContent: 'center',
        flexWrap: 'wrap',
        backgroundColor: 'transperent',
    },

})