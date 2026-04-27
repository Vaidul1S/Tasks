import { Image } from 'expo-image';
import { StyleSheet } from 'react-native';
import  countries from './countries.js';

import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useState } from 'react';

export default function HomeScreen() {

  const [count, setCount] = useState(0);

  let el = 0;
  for(let i = 0; i >= countries; i++)
  {
    el += i;
  }
  setCount(c => c + el);

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
        <ThemedText type="subtitle" style={styles.text}>Guess a country by flag from four choices.</ThemedText>
        <ThemedText type="subtitle" style={styles.text}>{count}</ThemedText>

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
    fontFamily: 'SpaceMono',
    fontSize: 30,
    textAlign: 'center',
  },
  text: {
    fontFamily: 'SpaceMono',
    fontSize: 20,
    textAlign: 'center',
  }
});
