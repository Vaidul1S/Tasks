import { Image } from 'expo-image';
import { StyleSheet, ScrollView } from 'react-native';
import { flags } from '../../assets/data/flags';
import { Link } from 'expo-router';

import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

export default function Credits() {

  const count = flags.length;

  return (
    <ScrollView style={{ height: '100vh', backgroundColor: '#446b7762' }}>

      <Image
        source={require('@/assets/images/flag_map.jpg')}
        style={styles.background}
      />

      <ThemedView style={styles.container}>
        <ThemedText type="title" style={styles.title}>Fun With Flags!</ThemedText>
        <ThemedText type="subtitle" style={styles.text}>Guess a country by the flag.</ThemedText>
        <ThemedText type="subtitle" style={styles.text}>List of {count} countries.</ThemedText>

        <Link style={styles.link} href='https://github.com/Vaidul1S' target='_blank'>GitHub
          <br /> <Image
            source={require("../../assets/images/gg.jpg")}
            style={styles.image} />
          <br />&copy; Vaidul1s {new Date().getFullYear()}</Link>

      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'transperent',
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
    margin: 30,
  },
  text: {
    fontFamily: 'papyrus',
    fontSize: 28,
    textAlign: 'center',
  },
  link: {
    fontFamily: 'papyrus',
    fontSize: 20,
    textAlign: 'center',
    color: 'white',
    marginTop: 210,    
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 100,

  },
});
