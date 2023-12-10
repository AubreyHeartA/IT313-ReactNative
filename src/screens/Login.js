import { View, ToastAndroid, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { Button, Text, TextInput, Icon } from "react-native-paper";
import fetchServices from "../services/fetchServices";

export default function LoginForm({ navigation }) {
  const [showPass, setShowPass] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [errors, setErrors] = React.useState({});
  const [loading, setLoading] = React.useState(false);

  const showToast = (message = "Something wen't wrong") => {
    ToastAndroid.show(message, 3000);
  };
  const handleLogin = async () => {
    try {
      setLoading(true);
      if (email === "") {
        setErrors({ email: true });
        return false;
      }

      if (password === "") {
        setErrors({ password: true });
        return false;
      }

      const url = "http://192.168.16.101(/api/v1/login";
      const data = {
        email,
        password,
      };
      const result = await fetchServices.postData(url, data);  
      console.debug(result);     
      if (result.message != null) {
        showToast(result?.message);
      } else {
        navigation.navigate("Home");
      }
    } catch (e) {
      console.debug(e.toString());
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Icon source="account-circle" color={'black'} size={100} />
      <Text variant="displaySmall">Welcome Back</Text>
      <TextInput
        mode="outlined"
        placeholder="Email"
        label="Email"
        style={styles.field}
        // error={true}
        value={email}
        onChangeText={setEmail}
        error={errors?.email} />
      <TextInput
        mode="outlined"
        placeholder="Password"
        label="Password"
        secureTextEntry={showPass}
        right={
          <TextInput.Icon
            icon={!showPass ? "eye" : "eye-off"}
            onPress={() => setShowPass(!showPass)}
          />
        }
        style={styles.field}
        value={password}
        onChangeText={setPassword}
        error={errors?.password}
      />


      {/* <Button icon="login" mode="contained" style={{ marginTop: 10 }}></Button> */}
      <Button
        loading={loading}
        disabled={loading}
        onPress={handleLogin}
        mode="contained"
        style={styles.field} >
        Login
      </Button>
      <Text style={{ marginTop: 10, fontSize: 15 }}>Don't have an account?</Text>
      <TouchableOpacity
      onPress={() => navigation.navigate("Register")}>
        <Text style={{ marginTop: 10, fontSize: 15, color: 'blue' }}>Sign up</Text>
      </TouchableOpacity>
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center', //horizontal
    alignItems: 'center', // vertical
  },

  field: {
    marginTop: 20,
    width: '85%',
  },
  
});