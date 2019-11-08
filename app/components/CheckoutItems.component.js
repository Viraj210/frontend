import React, { Component } from 'react';
import { View, Text, FlatList, StyleSheet, ScrollView, TouchableHighlight } from 'react-native';
import CartItems from './CartItems.component';
import CustomerForm from './CustomerForm.component';


class CheckoutItems extends Component {

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
    }
  };


  getTotal() {
    let total = 0;
    const { cartItems } = this.props;

    for (let i = 0; i < cartItems.length; i++) {
      total = total + cartItems[i].price
    }

    return <Text style={{
      textAlign: 'center',
      color: 'red',
      fontSize: 22,
      fontWeight: '900'
    }}>Total: Rs. {(total).toFixed(2)}</Text>
  }

  render() {
    const { cartItems, navigation, cartTotal } = this.props;

    return (
      <View style={styles.container}>

        <View style={styles.ckitems}>

          <FlatList
            data={cartItems}
            renderItem={({ item, index }) =>
              <CartItems item={item} index={index} />
            }
            keyExtractor={(item) => item.id}
            ItemSeparatorComponent={() => <View style={{ height: 0.3, backgroundColor: '#34495e90' }} />}
          />
          <Text style={{
            textAlign: 'center',
            color: 'red',
            fontSize: 22,
            fontWeight: '900'
          }}>Total: Rs. {cartTotal} from redux</Text>


        </View>

        <View style={styles.custForm}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <CustomerForm navigation={navigation} cartItems={cartItems} />
          </ScrollView>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  custForm: {
    flex: 1
  },
  ckitems: {
    height: 200,
    backgroundColor: '#ddd'
  },
});


export default CheckoutItems;


