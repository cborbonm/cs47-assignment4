import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions
} from 'react-native';
import Colors from "./Themes/colors";

export default function Song({ name, id, artist, album, duration, imageUrl }) {
  return (
    <View style={styles.songSection}>
      <View style={styles.subSection}>
        <Text style={styles.trackNumber}>{id}</Text>
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
  },
  subSection: {
    margin: 2,
    alignSelf: 'center',
  },
  trackNumber: {
    color: Colors.gray,
    width: 20,
    display: 'flex',
    justifyContent: 'center',
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
    width: 100,
    height: 20,
  },
  duration: {
    color: 'white',
    marginRight: 10,
  }
});