import { Image } from 'expo-image';
import { StyleSheet, Text, View } from 'react-native';
import { flags } from '../../assets/data/flags';
import { Link } from 'expo-router';

export default function Credits() {

  const count = flags.length;

  return (
    <View style={{ flex: 1, backgroundColor: '#446b7762' }}>

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
        <Link style={styles.link} href='https://github.com/Vaidul1S' target='_blank'>{'GitHub\n'}
          <Image
            source={require("../../assets/images/gg.jpg")}
            style={styles.image} />
          {'\n'}&copy; Vaidul1s {new Date().getFullYear()}</Link>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    top: 0,
    left: 0,
  },
  container: {
    flex: 3,
    justifyContent: 'space-between',
    flexDirection: 'column',
  },
  bin: {
    flex: 2,
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
    flex: 1,
    fontFamily: 'papyrus',
    fontSize: 20,
    textAlign: 'center',
    color: 'white',    
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 100,
    top: -12,
  },
});
