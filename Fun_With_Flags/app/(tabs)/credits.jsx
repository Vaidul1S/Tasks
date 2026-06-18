import { Image } from 'expo-image';
import { StyleSheet, ScrollView, Text, View } from 'react-native';
import { flags } from '../../assets/data/flags';
import { Link } from 'expo-router';

export default function Credits() {

  const count = flags.length;

  return (
    <ScrollView style={{ height: '100vh', backgroundColor: '#446b7762' }}>

      <Image
        source={require('@/assets/images/flag_map.jpg')}
        style={styles.background}
      />

      <View style={styles.container}>
        <View style={styles.bin}>
          <Text type="title" style={styles.title}>Fun With Flags!</Text>
          <Text type="subtitle" style={styles.text}>Guess a country by the flag.</Text>
          <Text type="subtitle" style={styles.text}>List of {count} countries.</Text>
        </View>
        <Link style={styles.link} href='https://github.com/Vaidul1S' target='_blank'>GitHub
          <br /> <Image
            source={require("../../assets/images/gg.jpg")}
            style={styles.image} />
          <br />&copy; Vaidul1s {new Date().getFullYear()}</Link>

      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    top: 0,
    left: 0,
  },
  container: {
    flex: 1,    
    justifyContent: 'space-between',    
  },
  bin: {
    
    height: '40%',
  },
  title: {
    fontFamily: 'papyrus',
    fontSize: 34,
    textAlign: 'center',
    margin: 30,
    color: 'white',
  },
  text: {
    fontFamily: 'papyrus',
    fontSize: 28,
    textAlign: 'center',
    color: 'white',
  },
  link: {
    fontFamily: 'papyrus',
    fontSize: 20,
    textAlign: 'center',
    color: 'white',
    height: '40%',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 100,
    top: -12,
  },
});
