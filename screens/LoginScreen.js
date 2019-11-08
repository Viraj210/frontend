import React from "react";
import { Alert, View, StatusBar, StyleSheet, TextInput, TouchableHighlight, } from "react-native";
import validate from "../utility/validation"
import AsyncStorage from "@react-native-community/async-storage"
import { Body, Header, Left, Text, Title } from "native-base";
import axios from "react-native-axios";
import property from '../config'


const apiPostResetPassword = `${property.BASE_URL}resetpassword`;
const apiPostSingIn = `${property.BASE_URL}signin`;

class LoginScreen extends React.Component {

  state = {
    controls: {
      email: {
        value: "",
        valid: false,
        validationRules: {
          isEmail: true
        },
        touched: false
      },
      password: {
        value: "",
        valid: false,
        validationRules: {
          minLength: 4
        },
        touched: false
      },
      resetEmail: {
        value: "",
        valid: false,
        validationRules: {
          isEmail: true
        },
        touched: false
      }
    }
  };


  static navigationOptions = () => {
    return {
      headerTitle: 'LOGIN',
      headerLeft: null,
      headerTitleStyle: {
        textAlign: 'center',
        flexGrow: 1,
        alignSelf: 'center',
      },

    }
  }


  setToken = async token => {
    await AsyncStorage.setItem("token", token).then(async val => {
      const Token = await AsyncStorage.getItem('token')
        this.props.navigation.navigate('Dashboard1');
    });
  };

  signIn = () => {

    axios.post(apiPostSingIn, {
      email: this.state.controls.email.value,
      password: this.state.controls.password.value

    })
      .then(res => {
        if (res.status === 200) {
          this.setToken(res.data.token)
        }
        if (res.status === 201) {
          Alert.alert("Oops...", res.data.msg)
        }
      })
      .catch(err => {
        Alert.alert(
          "Network Error",
          'Something Went Wrong'
        )
        console.log();
        throw err;
      });
  };



  updateInputState = (key, value) => {
    let connectedValue = {};
    this.setState(prevState => {
      return {
        controls: {
          ...prevState.controls,

          [key]: {
            ...prevState.controls[key],
            value: value,
            valid: validate(
              value,
              prevState.controls[key].validationRules,
              connectedValue
            ),
            touched: true
          }
        }
      };
    });
  };
  


  render() {
    return (

      <View style={styles.con}>
        <StatusBar backgroundColor={'blue'} barStyle="light-content" />
        <View style={styles.container}>

          <TextInput style={[styles.inputContainer, !this.state.controls.email.valid && this.state.controls.email.touched ? styles.inputInvalid : null]}
            value={this.state.controls.email.value}
            onChangeText={(val) => this.updateInputState('email', val)}
            placeholder="Email"
            keyboardType="email-address"
            underlineColorAndroid='transparent'
          />

          <TextInput
            value={this.state.controls.password.value}
            onChangeText={(val) => this.updateInputState('password', val)}
            style={[styles.inputContainer, !this.state.controls.password.valid && this.state.controls.password.touched ? styles.inputInvalid : null]}
            placeholder="Password"
            secureTextEntry={true}
            underlineColorAndroid='transparent'
          />


          <TouchableHighlight underlayColor='#e3d8dd'
            disabled={!(this.state.controls.email.valid && this.state.controls.password.valid)}
            style={!(this.state.controls.email.valid && this.state.controls.password.valid) ? {
              shadowColor: '#000',
              shadowOpacity: 50,
              elevation: 5,
              height: 45,
              backgroundColor: "gray",
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: 30,
              marginTop: 30,
              width: 160,
              borderRadius: 30,
            } : {
                shadowColor: '#000',
                shadowOpacity: 50,
                elevation: 5,
                height: 45,
                backgroundColor: 'blue',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: 30,
                marginTop: 30,
                width: 160,
                borderRadius: 30,
              }}

            onPress={() => { this.signIn() }}
          >
            <Text style={{ color: '#eee', fontSize: 20, fontWeight: '600' }}>Login</Text>
          </TouchableHighlight>



          <TouchableHighlight underlayColor='#e3d8dd' style={styles.btnsm} onPress={() => this.props.navigation.navigate('Signup')}  >
            <Text style={{ fontWeight: '500' }}>Create New Account</Text>
          </TouchableHighlight>

        </View>
      </View>




    );
  }
}
const styles = StyleSheet.create({
  icon: {
    margin: 5
  },
  con: {
    backgroundColor: '#ccc',
    flex: 1
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ccc',
  },

  btnsm: {
    padding: 3,
    paddingHorizontal: 6,
    borderRadius: 13,
    alignItems: 'center',
  },
  btnReset: {
    padding: 3,
    paddingHorizontal: 6,
    borderRadius: 13,
    alignItems: 'center',
  },
  title: {
    fontWeight: 'bold'
  },

  welcome: {

    fontSize: 40,
    textAlign: 'center',
    margin: 10,
  },
  welcome1: {

    margin: 40,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  inputs: {
    height: 45,
    marginLeft: 16,
    borderBottomColor: '#FFFFFF',
    flex: 1,
  },
  buttonContainer: {

    shadowColor: '#000',
    shadowOpacity: 50,
    elevation: 5,
    height: 45,
    backgroundColor: 'blue', //////////////////////////////////////
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
    marginTop: 30,
    width: 200,
    borderRadius: 30,
  },
  buttonDisable: {
    shadowColor: '#000',
    shadowOpacity: 50,
    elevation: 5,

    height: 45,
    backgroundColor: "gray",
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
    marginTop: 30,
    width: 200,
    borderRadius: 30,
  },



  inputContainer: {
    borderBottomColor: '#F5FCFF',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    borderBottomWidth: 1,
    width: 300,
    height: 45,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    margin: 10,
    padding: 10
  },
  inputInvalid: {
    borderLeftColor: 'red',
    borderLeftWidth: 3,

  },

  invalidMsg:
  {
    fontSize: 12,
    marginTop: -10,
    marginBottom: 10,
    color: 'red'
  },

  invalidMsgFalse: {

    color: "#EEEEEE",
    fontSize: 12
  },
  modelButtonDisabled: {
    shadowColor: '#000',
    shadowOpacity: 50,
    elevation: 5,
    height: 45,
    backgroundColor: "gray",
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
    marginTop: 30,
    width: 140,
    borderRadius: 30,
    alignSelf: 'center'
  },

});

export default LoginScreen;
