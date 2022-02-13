import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  Pressable,
} from 'react-native';
import Colors from "./Themes/colors";
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export function Song({ name, artist, album, duration, imageUrl, external_url, preview_url}) {
  const navigation = useNavigation();
  return (
    <View>
      <Pressable onPress={() => {navigation.navigate('SongPreview', {external_url: external_url})}}>
        <View style={styles.songSection}>
          <View style={styles.subSection}>
            <Pressable onPress={(e) => {
              e.stopPropagation();
              navigation.navigate('SoundPreview', {preview_url: preview_url})
              }}
            >
              <Ionicons name="ios-play-circle" style={styles.icon} size={24} color={Colors.spotify} />
            </Pressable>
          </View>
          <View style={styles.subSection}>
            <Image style={styles.albumCover} source={{uri : imageUrl}}/>
          </View>
          <View style={styles.subSection}>
            <View style={styles.titleAndArtist}>
              <Text style={styles.title} numberOfLines={1}> {name} </Text>
              <Text style={styles.artist} numberOfLines={1}> {artist} </Text>
            </View>
          </View>
          <View style={styles.subSection}>
            <Text style={styles.album} numberOfLines={1}> {album} </Text>
          </View>
          <View style={styles.subSection}>
            <Text style={styles.duration}> {duration} </Text>
          </View>
        </View>
      </Pressable>
    </View>
  );
}

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  songSection: {
    margin: 7,
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    color: 'white',
    width: windowWidth,
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  subSection: {
    margin: 2,
    alignSelf: 'center',
  },
  icon: {
    color: Colors.spotify,
    width: 24,
    display: 'flex',
    justifyContent: 'center',
    marginRight: 6,
  },
  albumCover: {
    width: 55,
    height: 55,
  },
  title: {
    color: 'white',
    width: 150,
    height: 20,
  }, 
  artist: {
    color: Colors.gray,
  },
  album: {
    color: 'white',
    width: 90,
    height: 20,
  },
  duration: {
    color: 'white',
    marginRight: 10,
  }
});