import { Image } from 'expo-image';
import ParallaxScrollView from '@/components/parallax-scroll-view';
import { countries } from './countries';
import { ThemedView } from '@/components/themed-view';
import { ThemedText } from '@/components/themed-text';

export default function Card(){

    return (
        <ThemedView>
            <Image/>
            <ThemedText>{countries.map(c => c + "\n ")}</ThemedText>
        </ThemedView>        
        
    );
}