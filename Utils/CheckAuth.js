import React, { Component } from 'react';
import { View, Text } from 'react-native'
import AsyncStorage from "@react-native-community/async-storage"
import { Spinner } from 'native-base';


class CheckAuth extends Component {
  constructor(props) {
    super(props);
  }
  state = {

  }
  componentDidMount = () => {
    
    this._bootstrapAsync();              
  }

  static navigationOptions = () => {
    return {
      header: null,
    }
  }


  _bootstrapAsync = async () => {

    const userToken = await AsyncStorage.getItem('token');
    if (userToken) {
      this.props.navigation.navigate('Dashboard1');

    }

    else {
      await AsyncStorage.removeItem('token')
      this.props.navigation.navigate('LoginScreen');
    }

  }
  
  render() {
    return (
      <View style={{ display: "flex", paddingVertical: 200, alignItems: "center", justifyContent: "center", backgroundColor:'#ccc' }}>

        <Text style={{ marginTop: -30, }}></Text>
        <Spinner size='large' color='#a66' />

        <Text style={{ fontSize: 40, color: 'red', marginTop: -30, fontWeight: 'bold', padding: 30 }}> Food Hub </Text>

        <Text style={{ fontSize: 16, color: '#252626' }}

        >Loading</Text>
      </View>
    );
  }
}

export default CheckAuth;
