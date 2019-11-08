import React, { Component } from 'react';
import { View, StyleSheet, FlatList, StatusBar, Text } from 'react-native';
import { connect } from 'react-redux';
import Product from '../components/Products.component';
import { addToCart } from '../redux/actions/cartActions';
import { fetchProducts } from '../../android/redux/actions/productAction';
import Cart from '../components/Cart.component';
import { Body, Container, Header, Icon, Left, Title, Right, } from "native-base";
import { SearchBar } from 'react-native-elements';
import { ScrollView,  } from 'react-native-gesture-handler';
import axios from "axios"
import property from '../../config'


const apiGetProduct = `${property.BASE_URL}productlist`

class Products extends Component {

  constructor(props) {
    super(props);

  }
  state = {
    isLoading: true,
    search: ''

  }

  componentDidMount = () => {

    this.props.fetchProducts();

    //////////////////////////////////////////////

    axios.get(apiGetProduct).then(res => {

        const dataProducts = res.data;
        this.setState({ dataSource: dataProducts })
      }).catch((error) => {
        console.error(`Error reddda is : ${error}`);
      });
  }

  addItemsToCart = (product) => {
    this.props.addToCart(product);
  }

  //////////////////////////////////////////////////////

  SearchFilterFunction(text) {
    const { products } = this.props
    //passing the inserted text in textinput
    const newData = products.filter(function (item) {
      //applying filter for the inserted text in search bar
      const itemData = item.productName ? item.productName.toUpperCase() : ''.toUpperCase();
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });

    this.setState({
      //setting the filtered newData on datasource
      //After setting the data it will automatically re-render the view
      dataSource: newData,
      search: text,
      isLoading: false
    });

  }

  /////////////////////////////////////////////////////////////

  renderHeader = () => {
    const { navigation } = this.props
    return (
      <Header style={{ backgroundColor: 'green' }} >

        <Left style={{ flexDirection: 'row' }}>
          <Icon onPress={() => this.props.navigation.openDrawer()} name="md-menu" style={{ color: 'white', marginRight: 15 }} />
        </Left>
        <Body style={{ flex: 1 }}>
          <Title>New Products</Title>

        </Body>
        <Right style={{ flexDirection: 'row', }}>
          <Cart navigation={navigation} style={{ alignItems: 'center' }} />
        </Right>
      </Header>
    )
  }


  render() {
    const { products, navigation } = this.props

    return (

      <Container style={{ flexDirection: 'column', }}>

        {this.renderHeader()}

        <SearchBar
          round
          searchIcon={{ size: 24 }}
          onChangeText={text => this.SearchFilterFunction(text)}
          onClear={text => this.SearchFilterFunction('')}
          placeholder="Type Here..."
          value={this.state.search}
          containerStyle={{ backgroundColor: 'black' }}
        />
        <ScrollView >
          <StatusBar backgroundColor={'blue'} barStyle="light-content" />
      
          <View style={styles.body}>
            <FlatList
              data={this.state.dataSource}
              renderItem={({ item }) =>
                <Product navigation={navigation} item={item} addItemsToCart={this.addItemsToCart} product={item} />
              }
              keyExtractor={(item) => item.id}
              ItemSeparatorComponent={() => <View style={{ height: 5, backgroundColor: '#fff', }} />}
            />
          </View>
        </ScrollView>
      </Container>


    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column'
  },
  body: {
    backgroundColor:'#ccb',
    alignItems:'center',
    paddingVertical: 2,
    marginHorizontal:'1%',
    width:'98%'

  }
});
const mapStateToProps = (state) => ({
  products: state.products.items
})
export default connect(mapStateToProps, { addToCart, fetchProducts })(Products);












