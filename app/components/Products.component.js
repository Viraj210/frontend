
import React, { Component } from 'react';
import { View, Image, TouchableOpacity, StyleSheet, } from "react-native";
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import { Container, Header, Content, List, ListItem, Text, Left, Body, Right, Button } from 'native-base';


class Product extends Component {

    addToCart = () => {
        this.props.addItemsToCart(this.props.item)
    }
    render() {
        const { item } = this.props;
        return (


            <Container style={styles.container}>


                <View style={{ marginHorizontal: 0, width: 120, backgroundColor: '#999' }}>
                    <TouchableOpacity
                        onPress={() => this.props.navigation.navigate('DisplayOneItem', {
                            _id: item._id
                        })}
                    >
                        <Image
                            source={{ uri: `${item.imgs}` }}
                            style={{ width: 120, height: 100, margin: 5, borderRadius: 10 }}
                        >

                        </Image>
                    </TouchableOpacity>
                </View>
                <View style={{ width: 190, marginHorizontal: 5, }}>
                    <TouchableOpacity
                        onPress={() => this.props.navigation.navigate('DisplayOneItem', {
                            _id: item._id
                        })}
                    >
                        <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'black', margin: 6, width: 130 }}>{item.productName}</Text>
                    </TouchableOpacity>
                    <Text style={{ fontSize: 12, margin: 4, color: 'black', width: 130 }}>Rs.{(item.price).toFixed(2)} </Text>
                    <View style={{ backgroundColor: '#bbb', height: 2, marginTop: 20 }}></View>
                </View>
                <View style={{ alignItems: 'flex-end', width: 20 }}>
                    <TouchableOpacity
                        onPress={this.addToCart} //alert(item._id);
                        style={{ justifyContent: 'center', }}
                    >
                        <Icon                                                // add to cart icon here
                            style={{ width: 50, height: 50, alignItems: 'flex-end', alignSelf: 'stretch', marginLeft: 5, }}
                            name='cart-plus'
                            size={30}
                        />
                    </TouchableOpacity>
                </View>


            </Container>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        justifyContent: 'flex-start',
        flexDirection: 'row',
        height: 120,
        paddingVertical: 25,
        borderRadius: 15,
        width: '100%',
        backgroundColor: '#bcb'
    },
    productDes: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
    },
    text: {
        color: '#fff',
        fontSize: 16,
        padding: 10
    }

});
export default Product;










