import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import WelcomeScreen from "./src/screens/WelcomeScreen";
import GenderScreen from "./src/screens/GenderScreen";
import { RootStackParamList } from "./src/navigation/Type"; // fixed file name
import WorkoutScreen from "./src/screens/WorkoutScreen";
import HeightWeightScreen from "./src/screens/HeightWeightScreen";
import DOBScreen from "./src/screens/DOBScreen";
import GoalScreen from "./src/screens/GoalScreen";
import DesiredWeightScreen from "./src/screens/DesiredWeightScreen";
import SummaryScreen from "./src/screens/SummaryScreen";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Welcome"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Gender" component={GenderScreen} />
        <Stack.Screen name="Workout" component={WorkoutScreen} />
        <Stack.Screen name="HeightWeight" component={HeightWeightScreen} />
        <Stack.Screen name="DOB" component={DOBScreen} />
        <Stack.Screen name="Goal" component={GoalScreen} />
        <Stack.Screen name="DesiredWeight" component={DesiredWeightScreen} />
        <Stack.Screen name="Summary" component={SummaryScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// <View style={styles.container}>
//   <Text>Open up App.tsx to start working s on your app! fuck</Text>
//   <StatusBar style="auto" />
// </View>

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
