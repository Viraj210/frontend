import React from 'react';
import { createStackNavigator, createAppContainer, createDrawerNavigator, createSwitchNavigator, DrawerItems } from 'react-navigation';
import { View, ImageBackground, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { Container, Text, Root, Icon } from 'native-base';
import AsyncStorage from "@react-native-community/async-storage";
import axios from 'axios';



import Products from '../pages/Products';
import Checkout from '../../app/pages/Checkout';
import Receipt from '../pages/Receipt';
import Signup from '../../screens/SignupScreen';
import LoginScreen from '../../screens/LoginScreen'
import Profile from '../../screens/ProfileScreen';
import CheckAuth from '../../Utils/CheckAuth'
import DisplayOneItem from '../../screens/DisplayOneItem'



const oneStackNavigation = createStackNavigator({

  CheckAuth: { screen: CheckAuth },
  LoginScreen: { screen: LoginScreen },
  Signup: { screen: Signup }
}, {
  initialRouteName: 'CheckAuth',
})


const Drawer = createDrawerNavigator({
  Dashboard1: {
    screen: Products,
    navigationOptions: {
      drawerLabel: 'Products',
      drawerIcon: () => (
        <Icon name={'home'} size={25} />
      )
    }
  },
  DisplayOneItem: {
    screen: DisplayOneItem,
    navigationOptions: {
      drawerLabel: () => null
    }
  },
  Receipt: {
    screen: Receipt,
    navigationOptions: {
      drawerLabel: () => null
    }
  },

  Profile: {
    screen: Profile,
    navigationOptions: {
      drawerLabel: () => 'Profile',
      drawerIcon: () => (
        <Icon name={'person-add'} size={25} />
      )
    }
  },

  Checkout: {
    screen: Checkout,
    navigationOptions: {
      drawerLabel: () => null
    }
  },
},
  {
    backBehavior: 'initialRoute',
    contentComponent: (props) => (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#bbb', justifyContent: 'space-around', borderLeftWidth: 20, borderColor: '#777' }}>
        <View style={{ height: hp("30%"), alignItems: 'center', justifyContent: 'center', marginVertical: 45 }}>
          <ImageBackground
            source={require("../assets/images/profile.png")}
            style={{ width: wp("65%"), height: hp("35%") }} >
          </ImageBackground>
        </View>

        <ScrollView >
          <DrawerItems {...props} />
          <TouchableOpacity onPress={() => props.navigation.navigate('SignIn')}
            style={{ marginTop: 150 }}>
            <View style={{
              width: wp('68%'), flexDirection: 'row',
              marginTop: hp('1%'),
              alignItems: 'flex-end'
            }}>
              <View>
                <Icon name={'power'} size={25} style={{ marginStart: wp('4.6%'), color: '#4e4e4e' }} />
              </View>
              <View>
                <Text style={{ fontWeight: '600', fontSize: wp('3.5%'), marginStart: wp('7%'), color: '#933' }}
                  onPress={() => {

                    AsyncStorage.removeItem('token')
                    props.navigation.navigate('LoginScreen');
                  }}
                >Logout</Text>
              </View>
            </View>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    )
  });


const MainNavigation = createSwitchNavigator({
  AuthStack: oneStackNavigation,
  DrawNavigator1: Drawer,

},

  {
    initialRouteName: "AuthStack",
  })



const Route = createAppContainer(MainNavigation);
export default Route;





