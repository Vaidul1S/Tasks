import { Image } from 'expo-image';
import { countries } from './countries';
import { ThemedView } from '@/components/themed-view';
import { ThemedText } from '@/components/themed-text';
import { ScrollView } from 'react-native';
import { flags } from './flags';

export default function Card() {

    return (
        <ScrollView headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}>
            <ThemedView>
                <Image />
                <ThemedText>{flags.map(f => <><p>{f.name}</p><p>{f.flag}</p></>)}</ThemedText>
                <ThemedText>{countries.map(c => "\t" + c + "\n ")}</ThemedText>
                
            </ThemedView>
        </ScrollView>
    );
}