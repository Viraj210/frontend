import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StatusBar } from 'react-native'
import CheckoutItems from '../components/CheckoutItems.component';
import { Body, Button, Container, Header, Icon, Left, Right, Text, Title } from "native-base";

export class Checkout extends Component {

    state = {

    }


    renderHeaderIcon = () => {
        return (

            <Icon name="arrow-back" style={{ color: 'white' }}
                onPress={() => this.props.navigation.navigate('Dashboard1')} />

        )
    }

    renderHeader = () => {
        return (
            <Header style={{ backgroundColor: 'green' }}>
                <Left>
                    {this.renderHeaderIcon()}
                </Left>
                <Body>
                    <Title>Checkout </Title>
                </Body>
            </Header>
        )
    }

    //////////////////////////////////////////////////////////////////

    render() {
        const { cartItems, navigation, cartTotal } = this.props;

        return (
            <Container>
                {this.renderHeader()}
                <StatusBar backgroundColor={'blue'} barStyle="light-content" />
                <CheckoutItems cartItems={cartItems} cartTotal={cartTotal} navigation={navigation} />

            </Container>
        );
    }
}

const mapStateToProps = (state) => ({
    cartItems: state.cart.cart,
    cartTotal: state.cart.total
});


export default connect(mapStateToProps)(Checkout);
