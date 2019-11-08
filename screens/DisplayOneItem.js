import React, { Component } from 'react';
import { StyleSheet, View, Image, TouchableOpacity, StatusBar } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Body, Container, Header, Icon, Left, Right, Text, Title } from "native-base";
import Icons from 'react-native-vector-icons/dist/FontAwesome';
import Cart from '../app/components/Cart.component';
// import SliderImages from './SliderImages'
import { connect } from 'react-redux';
import { addToCart } from '../app/redux/actions/cartActions';
import { fetchProducts } from '../android/redux/actions/productAction';

import axios from "axios"
import property from '../config'


class DisplayOneItem extends Component {

    constructor(props) {
        super(props);

    }

    state = {
        foodsFromServer: '',
        spinnerVisible: false,
    }

    ///////////////////////////////////////////////////////////////////////////


    componentDidMount() {
        const _id = this.props.navigation.getParam('_id', '');
        axios.get(`${property.BASE_URL}product/${_id}`)
            .then(res => {
                const foodsFromServer = res.data;
                this.setState({ foodsFromServer });
            })
    }

    componentDidUpdate() {
        const _id = this.props.navigation.getParam('_id', '');
        axios.get(`${property.BASE_URL}product/${_id}`)
            .then(res => {
                const foodsFromServer = res.data;
                this.setState({ foodsFromServer });
            })
    }


    addItemsToCart = () => {
        this.props.addToCart(this.state.foodsFromServer)
    }


    renderHeaderIcon = () => {
        return (

            <Icon name="arrow-back" style={{ color: 'white' }}
                onPress={() => this.props.navigation.navigate('Dashboard1')} />

        )
    }


    render() {

        const { navigation } = this.props

        return (
            <ScrollView showsVerticalScrollIndicator={false} style={{ backgroundColor: '#eee' }}>
                <Header style={{ backgroundColor: 'green' }}>
                    <Left>
                        {this.renderHeaderIcon()}
                    </Left>
                    <Body>
                        <Title>View</Title>
                    </Body>
                    <Right>
                        <Cart navigation={navigation} style={{ alignItems: 'center' }} />
                    </Right>
                </Header>

                <View style={{ flex: 1, flexDirection: 'column', }}>
                    <StatusBar backgroundColor={'blue'} barStyle="light-content" />
                    <View style={styles.imageViewStyle}>
                        <TouchableOpacity style={styles.imageStyle}>

                            <Image
                                source={{ uri: `${this.state.foodsFromServer.imgs}` }}
                                style={{ width: '100%', height: '100%', }}
                            >
                            </Image>
                        </TouchableOpacity>

                        <View style={{ flexDirection: 'row', width: '100%', backgroundColor: '#fff', height: 60 }}>

                            <View style={styles.imageTextStyle}>
                                <Text style={{ fontSize: 22, padding: 5 }}>{this.state.foodsFromServer.productName}</Text>

                            </View>
                            {/* Rs.{(item.price).toFixed(2)} */}

                            <TouchableOpacity
                                onPress={() => { this.addItemsToCart() }}
                                style={{ justifyContent: 'center', paddingTop: 10, paddingRight: 15 }}
                            >
                                <Icons
                                    style={{
                                        width: 50, height: 50, backgroundColor: 'white',
                                        alignSelf: 'stretch', textAlign: 'center', justifyContent: 'center'
                                    }}
                                    name='cart-plus'
                                    size={35}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={styles.descriptionView}>
                        <Text style={styles.description}>Price : {this.state.foodsFromServer.price}/=</Text>
                        <Text style={styles.description}>Availability : {this.state.foodsFromServer.availablity} </Text>
                        <Text style={styles.description}>Description : {this.state.foodsFromServer.description}</Text>
                        <Text style={styles.description}>{this.state.foodsFromServer.imgs} </Text>

                    </View>

                </View>
            </ScrollView>

        );
    }
}
// alert(this.state.foodsFromServer)
const mapStateToProps = (state) => ({

    products: state.foodsFromServer

})
export default connect(mapStateToProps, { addToCart, fetchProducts })(DisplayOneItem);


const styles = StyleSheet.create({

    imageViewStyle: {
        flexDirection: 'column', height: 380, marginHorizontal: 10,
        justifyContent: 'center', marginVertical: 5,
        alignItems: 'center', borderWidth: 2, borderColor: '#bbb',
    },
    imageStyle: {
        height: 320,
        // backgroundColor: 'green', 
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },
    imageTextStyle: {
        height: 40,
        justifyContent: 'center',
        width: '85%',
        paddingTop: 10

    },
    description: {
        color: 'black',
        padding: 10,
        fontSize: 16,
    },
    descriptionView: {
        backgroundColor: '#eee',
        borderWidth: 2,
        borderColor: '#bbb',
        flexDirection: 'column',
        marginHorizontal: 10,
        height: 'auto',
    }
});



