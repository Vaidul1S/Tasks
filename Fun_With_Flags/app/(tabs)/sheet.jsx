import { Image } from 'expo-image';
import { countries } from '../../assets/data/countries.js';
import { ThemedView } from '@/components/themed-view';
import { ThemedText } from '@/components/themed-text';
import { ScrollView, SafeAreaView, StyleSheet } from 'react-native';
import { flags } from '../../assets/data/flags.js';

export default function sheet() {

    return (
        <ScrollView >
            {flags.map(f =>
                <ThemedView style={styles.list}>
                    <ThemedText key={flags.name}>{f.name}</ThemedText>
                    <SafeAreaView style={styles.container}>
                        <Image style={styles.image} source={{ uri: f.flag, }} resizeMode={'contain'} />
                    </SafeAreaView>
                </ThemedView>
            )}

        </ScrollView>
    );
}

const styles = StyleSheet.create({
    list: {
        flexDirection: "row",
        left: 30,
        gap: 30,
        alignItems: 'center',
        margin: 7,
        width: 400,
        backgroundColor: 'none',
    },
    container: {
        flex: 1,
        height: 60,

    },
    image: {
        width: 120,
        flex: 1,
    }
})