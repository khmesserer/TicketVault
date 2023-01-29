import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Image, Pressable } from 'react-native';
import { useState } from 'react';
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();
setTimeout(SplashScreen.hideAsync, 2000);

const ConcertImage = require('./assets/images/concert.png');

export default function App() {
  const [numTickets, setNumTickets] = useState(0);
  const [isValid, setIsValid] = useState(false);
  const [total, setTotal] = useState(0);

  // Calculate the total cost of tickets
  const calculateTotal = () => {
    const TicketCost = 99.99;

    if(isValid && numTickets > 0) {
      setTotal(TicketCost * numTickets);
    } else {
      alert('Invalid Entry');
    }
  };
  
  // Test for valid input
  const isValidInput = (input) => {
    setIsValid(!isNaN(input));
    if (isValid) {
      setNumTickets(parseInt(input));
    } else {
      setTotal(0);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ticket Vault</Text>
      <TextInput style={styles.textbox} onChangeText={newText => isValidInput(newText)} placeholder="Number of Tickets" />
      <View style={styles.buttonContainer}>
        <Pressable style={styles.button} onPress={calculateTotal}>
            <Text style={styles.label}>Find The Cost</Text>
        </Pressable>
      </View>
      <View>
      {total > 0 ? (
          <Text style={styles.result}>Ticket Cost: ${total.toFixed(2)}</Text>
      ) : (
          <Text />
      )}
      </View>
      <View style={styles.imageContainer}>
        <Image source={ConcertImage} />
      </View>
      <StatusBar style="dark" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 45,
    padding: 25,
  },
  textbox: {
    height: 40,
    width: 300,
    borderColor: '#000',
    borderWidth: 1,
    textAlign: 'center',
    fontSize: 15,
  },
  imageContainer: {
    paddingTop: 35,
  },
  buttonContainer: {
    padding: 25,
  },
  button: {
      backgroundColor: '#f98b88',
      padding: 10,
  },
  label: {
      fontSize: 20,
      color: '#000',
  },
  result: {
    padding: 25,
    fontSize: 30,
    color: '#000',
  }
});
