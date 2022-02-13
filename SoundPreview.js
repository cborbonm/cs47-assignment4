import { WebView } from "react-native-webview";

export default function SoundPreview({ route }) {
  const params = route.params;
  return (
    <WebView source={{ uri: params.preview_url }} />
  );
}