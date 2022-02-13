import { StyleSheet, Text, SafeAreaView, Pressable, Image, View, FlatList } from "react-native";
import { useState, useEffect } from "react";
import { ResponseType, useAuthRequest } from "expo-auth-session";
import { myTopTracks, albumTracks } from "./utils/apiOptions";
import { REDIRECT_URI, SCOPES, CLIENT_ID, ALBUM_ID } from "./utils/constants";
import Colors from "./Themes/colors";

import { Song } from './Song';
import millisToMinutesAndSeconds from './utils/millisToMinuteSeconds';

import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SongPreview from './SongPreview';
import SoundPreview from './SoundPreview';

// Endpoints for authorizing with Spotify
const discovery = {
  authorizationEndpoint: "https://accounts.spotify.com/authorize",
  tokenEndpoint: "https://accounts.spotify.com/api/token"
};

export default function App() {
  const [token, setToken] = useState("");
  const [tracks, setTracks] = useState([]);
  const [request, response, promptAsync] = useAuthRequest(
    {
      responseType: ResponseType.Token,
      clientId: CLIENT_ID,
      scopes: SCOPES,
      // In order to follow the "Authorization Code Flow" to fetch token after authorizationEndpoint
      // this must be set to false
      usePKCE: false,
      redirectUri: REDIRECT_URI
    },
    discovery
  );

  useEffect(() => {
    if (response?.type === "success") {
      const { access_token } = response.params;
      setToken(access_token);
    }
  }, [response]);

  useEffect(() => {
    if (token) {
      myTopTracks(setTracks, token);
    }
  }, [token]);

  const RenderItem = (item) => {
    const duration = millisToMinutesAndSeconds(item.item.duration_ms);
    let artistArrayofObjs = item.item.artists;
    let artist = artistArrayofObjs[0].name;
    return(
      <Song
        name={item.item.name}
        artist={artist}
        album={item.item.album.name}
        duration={duration} 
        imageUrl={item.item.album.images[2].url} 
        external_url={item.item.external_urls.spotify}
        preview_url={item.item.preview_url}
      />
    );
  }

  function Tracklist({ route, navigation }) {
    return (
      <View style={styles.container}>
        <View style={styles.titleRow}>
          <Image style={styles.titleLogo} source={require('./assets/spotify-logo.png')}></Image>
            <Text style={styles.titleText}>My Top Tracks</Text>
        </View>
        <View style={styles.subContainer}>
            <FlatList
            data={tracks}                           // the array of data that the FlatList displays
            renderItem={(item) => RenderItem(item)} // function that renders each item
            keyExtractor={(item) => item.id}        // unique key for each item
            contentContainerStyle={{ paddingBottom: 35 }}
            />
        </View>
      </View>
    );
  }
  
  const Stack = createStackNavigator();
  return (
    <SafeAreaView style={styles.container}>
      <>
      {token ?
        <NavigationContainer theme={DarkTheme}>
        <Stack.Navigator>
          <Stack.Screen name="Back" component={Tracklist} options={{headerShown: false}} />
          <Stack.Screen name="SongPreview" component={SongPreview} />
          <Stack.Screen name="SoundPreview" component={SoundPreview} />
        </Stack.Navigator>
        </NavigationContainer>
      : 
        <Pressable style={styles.loginButton} onPress={() => promptAsync()}>
          <Image style={styles.loginLogo} source={require('./assets/spotify-logo.png')}></Image>
          <Text style={styles.loginText}>Connect with Spotify</Text>
        </Pressable>
      }
      </>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.background,
    justifyContent: 'center',
    flex: 1,
  },
  subContainer: {
    top: 45,
  },
  loginButton: {
    backgroundColor: Colors.spotify,
    color: "white",
    height: 40,
    width: 225,
    borderRadius: 100,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    alignSelf: "center",
  },
  loginLogo: {
    height: 21,
    width: 21,
  },
  loginText: {
    color: "white",
    textTransform: "uppercase",
    fontFamily: "Helvetica",
    fontWeight: "bold",
  },
  titleRow: {
    display: "flex",
    flexDirection: "row",
    alignSelf: "center",
    position: "absolute",
    top: 0,
    width: 200,
  },
  titleLogo: {
    height: 25,
    width: 25,
    marginRight: 10,
  },
  titleText: {
    color: "white",
    fontFamily: "Helvetica",
    fontWeight: "bold",
    fontSize: 22,
  },
});
