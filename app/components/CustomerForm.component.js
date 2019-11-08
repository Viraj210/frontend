import React, { Component } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { connect } from 'react-redux';
import { addOrder } from '../redux/actions/orderAction';
import { emptyCart } from '../../app/redux/actions/cartActions';


class CustomerForm extends Component {
    state = {
        name: '',
        phone: '',
        email: '',
        street: '',
    }

    onPressButton = () => {
        const { name, phone, email, street } = this.state;
        const { navigation, addOrder, emptyCart, cartItems } = this.props;
        alert(cartItems + ' -----   customerForm.comporment')

        if (name === '') { return Alert.alert('enter name') }
        if (phone === '') { return Alert.alert('enter phone') }
        if (email === '') { return Alert.alert('enter email') }
        if (street === '') { return Alert.alert('enter street') }
        let customer = { name: name, phone: phone, email: email, street: street }

        addOrder({ cartItems: cartItems, customer: customer });             

        emptyCart();
        this.setState({ name: '' });
        this.setState({ phone: '' });
        this.setState({ email: '' });
        this.setState({ street: '' });

        navigation.navigate('Receipt');

    }


    renderButton() {
        return (
            <TouchableOpacity
                style={{
                    backgroundColor: 'orange',
                    shadowColor: '#000',
                    shadowOpacity: 50,
                    elevation: 5,
                    height: 45,
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    alignSelf: 'center',
                    marginBottom: 30,
                    marginTop: 30,
                    width: 220,
                    borderRadius: 30,
                }}
                onPress={this.onPressButton}>
                <Text style={styles.btnText}>proceed to checkout</Text>
            </TouchableOpacity>
        );
    }

    renderTextfield(options) {
        return (
            <TextInput style={styles.textField} onChangeText={(value) => this.setState({ [options.name]: value })}
                placeholder={options.label} value={this.state[options.name]} keyboardType={options.keyboard || 'default'} />
        );
    }



    render() {
        return (
            <View style={styles.panel}>
                {this.renderTextfield({ name: 'name', label: 'Your name' })}
                {this.renderTextfield({ name: 'phone', label: 'Your phone number', keyboard: 'phone-pad' })}
                {this.renderTextfield({ name: 'email', label: 'Your email address', keyboard: 'email-address' })}
                {this.renderTextfield({ name: 'street', label: 'Your street' })}
                {this.renderButton()}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    panel: {
        backgroundColor: '#ccc',
        borderRadius: 3,
        width: '100%'
    },
    textField: {
        height: 40,
        margin: 8,
        backgroundColor:'#fff'
    },
    btnText: {
        textAlign: 'center',
        color: '#fff',
        fontSize: 16
    }
});
const mapStateToProps = (state) => ({
    cartItems: state.cart.cart
})
export default connect(mapStateToProps, { addOrder, emptyCart })(CustomerForm);