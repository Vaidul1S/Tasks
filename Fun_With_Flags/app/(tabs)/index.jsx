import { Image } from 'expo-image';
import { StyleSheet } from 'react-native';
import { flags } from '../../assets/data/flags';

import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

export default function HomeScreen() {

  const count = flags.length;  

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/flag_map.jpg')}
          style={styles.background}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title" style={styles.title}>Fun With Flags!</ThemedText>

      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle" style={styles.text}>Guess a country by the flag.</ThemedText>
        <ThemedText type="subtitle" style={styles.text}>List of {count} countries.</ThemedText>

      </ThemedView>

    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'column',
    gap: 8,

  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,

  },
  background: {
    flex: 1,
    top: 0,
    left: 0,
  },
  title: {
    fontFamily: 'papyrus',
    fontSize: 34,
    textAlign: 'center',
  },
  text: {
    fontFamily: 'papyrus',
    fontSize: 28,
    textAlign: 'center',
  }
});
