import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  ScrollView,
  FlatList,
  Image,
} from "react-native";

export default function App() {
  const dogs = [
    { id: 1, name: "yoshi", age: 2, rescued: "2 days ago" },
    { id: 2, name: "doge", age: 1, rescued: "1 day ago" },
    { id: 3, name: "cheems", age: 3, rescued: "3 days ago" },
    { id: 4, name: "cheems samurai", age: 4, rescued: "4 days ago" },
    { id: 5, name: "firulais", age: 5, rescued: "5 days ago" },
    { id: 6, name: "cachupin", age: 3, rescued: "4 days ago" },
    { id: 7, name: "Telmo", age: 5, rescued: "1400 days ago" },
  ];
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text>Find a Home App</Text>
      </View>
      <View style={styles.body}>
        <FlatList
          keyExtractor={(item) => item.id}
          data={dogs}
          renderItem={({ item }) => (
            <View>
              <Text style={styles.dogName}>{item.name}</Text>
              <Image
                style={{ width: 100, height: 100, marginHorizontal: 80 }}
                source={{
                  uri: "https://steamuserimages-a.akamaihd.net/ugc/1808733554869125207/47E93F0E5473A18A73FE55D81FD92F0E2FDAD3AC/?imw=512&&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false",
                }}
              />
              <Text style={styles.dogAge}>{item.age}</Text>
              <Text style={styles.dogRescued}>{item.rescued}</Text>
            </View>
          )}
        ></FlatList>
      </View>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffa",
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    backgroundColor: "yellow",
    padding: 20,
  },
  body: {
    backgroundColor: "yellow",
    padding: 10,
  },
  dogName: {
    marginTop: 24,
    padding: 15,
    backgroundColor: "pink",
    fontSize: 18,
    marginHorizontal: 80,
  },
  dogAge: {
    marginTop: 1,
    padding: 4,
    backgroundColor: "orange",
    fontSize: 15,
    marginHorizontal: 80,
  },
  dogRescued: {
    marginTop: 1,
    padding: 4,
    backgroundColor: "red",
    marginHorizontal: 80,
  },
});
