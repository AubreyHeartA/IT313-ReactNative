import { View } from 'react-native';
import React from 'react';
import { Button, Text } from 'react-native-paper';

export default function Home({ navigation }) {
  return (
    <View 
      style = {{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <Text
        style = {{
          fontSize: 30
        }}
      >WELCOME!</Text>
      <Button
        onPress={() => navigation.navigate("Login")} 
        style = {{
          marginTop: 20,
          width: '85%',
        }}
      >
      Logout
      </Button>
    </View>
  )
}