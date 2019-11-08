import React, { Component } from "react";
import { View, Image, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { Body, Container, Header, Icon, Left, Right, Text, Title, } from "native-base";
import AsyncStorage from "@react-native-community/async-storage"
import axios from "axios"
import property from '../config'

const apiSendToken = `${property.BASE_URL}ecomuserprofile`


class ProfileScreen extends Component {
  constructor() {
    super();
    this.state = {
      data: [
        { name: "Preferences", header: false },
        { name: "Account", header: false },
        { name: "Help Center", header: false },
      ],
      userDetails: [],
      user: [],
      stickyHeaderIndices: [],
      fullName: "",
      email: "",
      gender: '',
    };
  }

  componentDidMount() {

    this.getToken().then(res => this.sendTokenToServer(res))
  }


  getToken = async () => {
    const Token = await AsyncStorage.getItem('token')
    this.setState({ Token: Token })
    return Token
  };


  sendTokenToServer = (token) => {

    const Token = 'Bearer ' + token;
    var headers = {
      'Content-Type': 'application/json',
      'Authorization': Token
    }


    axios.get(apiSendToken, { headers: headers }).then((response) => {

      const data = response.data.Customer
      this.setState({ userDetails: data })
    })
      .catch((error) => {
        console.log("axios error:", error);
      });
  }


  render() {
    const { navigation } = this.props
    return (
      <Container>

        <Header style={{ backgroundColor: 'green' }}>
          <Left>
            <Icon name="arrow-back" style={{ color: 'white' }}
              onPress={() => navigation.navigate('Dashboard1')} />
          </Left>
          <Body>
            <Title> User Profile </Title>
          </Body>
          <Right>
          </Right>
        </Header>

        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.fullView}>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('EditProPic')}>
              <Image
                style={styles.image}
                source={require("../app/assets/images/profile.png")}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.text}>
            <Text style={styles.textName}>
              {this.state.userDetails.name}
            </Text>
            <Text style={styles.textEmail}> {this.state.userDetails.email}</Text>
          </View>
        </ScrollView></Container>
    );
  }
}

export default ProfileScreen;

const styles = StyleSheet.create({

  infomation: {
    flexDirection: 'row',
    width: '95%',
    paddingVertical: 20,
    fontSize: 16,
    backgroundColor: "#aaa",
    alignItems: "center",
    justifyContent: 'space-evenly',
    margin: 10,

  },
  textName: {
    marginVertical: 5,
    fontSize: 22,
    fontWeight: '400'
  },
  textEmail: {
    marginVertical: 5,
    fontSize: 15,
    fontWeight: '300'
  },
  image: {
    borderWidth: 5,
    borderColor: "white",
    borderRadius: 150,
    alignSelf: 'center',
    width: 220,
    height: 220,
  },
  fullView: {
    alignItems: "center",
    backgroundColor: '#ddd',
    flex: 1
  },
  text: {
    alignItems: "center",
    backgroundColor: '#ddd',
    flex: 1
  },
});






















// import React, { Component } from "react";
// import { View, Image, FlatList,TouchableOpacity } from "react-native";
// import axios from "axios";
// import Icon from "react-native-vector-icons/MaterialIcons";
// import { Text, ListItem, Left, Body, Right, Title, Card, CardItem } from "native-base";

// class ProfileScreen extends Component {
//   constructor() {
//     super();
//     this.state = {
//       data: [
//         { name: "Preferences", header: false },
//         { name: "Account", header: false },
//         { name: "Help Center", header: false },
//       ],
//       userData: [],
//       stickyHeaderIndices: [],
//       fname: "",
//       lname: "",
//     };
//   }

//   componentDidMount() {
//     axios
//       .get("/auth/user/me")
//       .then(res => {
//         axios
//           .get("/users/" + res.data.id)
//           .then(res => {
//             console.log("Users : ");
//             console.log(res.data);
//             this.setState({
//               fname: res.data.fname,
//               lname: res.data.lname ? res.data.lname : "",
//             });
//           })
//           .catch(err => console.log(err));
//       })
//       .catch(err => {
//         console.log(err);
//         throw err;
//       });
//   }

//   renderItem = ({ item }) => {
//     if (item.header) {
//       return (
//         <ListItem itemDivider>
//           <Left />
//           <Body style={{ marginRight: 40 }}>
//             <Text style={{ fontWeight: "bold" }}>{item.name}</Text>
//           </Body>
//           <Right />
//         </ListItem>
//       );
//     } else if (!item.header) {
//       return (
//         <ListItem style={{ marginLeft: 0 }}>
//           <Body>
//             <Text>{item.name}</Text>
//           </Body>
//         </ListItem>
//       );
//     }
//   };

//   render() {
//     return (
//       <View>
//         <View
//           style={{
//             width: "100%",
//             backgroundColor: "#ab0a80",
//             display: "flex",
//             flexDirection: "row",
//             alignItems: "center",
//           }}
//         >
//           <TouchableOpacity onPress={()=> this.props.navigation.navigate('EditProPic')}>
//           <Image
//             style={{
//               borderWidth: 5,
//               borderColor: "white",
//               borderRadius: 100,
//               margin: 10,
//               marginLeft: 10,
//               width: 80,
//               height: 80,
//             }}
//             source={{ uri: "https://www.gstatic.com/webp/gallery3/1.sm.png" }}
//           />
// </TouchableOpacity>
//           <Text style={{ fontSize: 30, color: "white" }}>
//             {this.state.fname + " " + this.state.lname}
//           </Text>
//         </View>
//         <Card style={{marginBottom: 0}}>
//           <CardItem style={{backgroundColor: "#82E17B"}}>
//             <Body style={{display: "flex",flexDirection: "row",alignItems: "center"}}>
//             <Icon name="contacts" size={30} color="black" />
//               <Text style={{marginLeft: 5}}>Contact</Text>
//             </Body>
//           </CardItem>
//         </Card>

//         <Card style={{marginBottom: 0}}>
//           <CardItem style={{backgroundColor: "#82E17B"}}>
//             <Body style={{display: "flex",flexDirection: "row",alignItems: "center"}}>
//             <Icon name="work" size={30} color="black" />
//               <Text style={{marginLeft: 5}}>Work</Text>
//             </Body>
//           </CardItem>
//         </Card>

//         <Card style={{marginBottom: 0}}>
//           <CardItem style={{backgroundColor: "#82E17B"}}>
//             <Body style={{display: "flex",flexDirection: "row",alignItems: "center"}}>
//             <Icon name="school" size={30} color="black" />
//               <Text style={{marginLeft: 5}}>Education</Text>
//             </Body>
//           </CardItem>
//         </Card>
//         {/* <FlatList
//                style={{marginTop: "40%"}}
//         data={this.state.data}
//         renderItem={this.renderItem}
//         keyExtractor={item => item.name}
//         stickyHeaderIndices={this.state.stickyHeaderIndices}
//       /> */}
//       </View>
//     );
//   }
// }

// export default ProfileScreen;
