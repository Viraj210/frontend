import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { connect } from 'react-redux';
import Swipeout from 'react-native-swipeout';
import Icons from 'react-native-vector-icons/dist/FontAwesome';

import { removeItem } from '../../app/redux/actions/cartActions';
import { addQuantity } from '../../app/redux/actions/cartActions';
import { subtractQuantity } from '../../app/redux/actions/cartActions';



class CartItems extends Component {
    state = {
        activeRowKey: null
    }


    ///////////////////////////////////////////////////////////////////////////////////


    // handleAddQuantity = (item) => {
    //     this.props.addQuantity(item);
    // }

    // handleSubtractQuantity = (item) => {
    //     // this.props.subtractQuantity(item);
    // }


    /////////////////////////////////////////////////////////////////////////////////


    render() {

        const { item, index, addQuantity, subtractQuantity, removeItem } = this.props;

        const swipeSettings = {
            autoClose: true,
            onClose: (secId, rowId, direction) => { this.setState({ activeRowKey: null }) },
            onOpen: (secId, rowId, direction) => { this.setState({ activeRowKey: this.props.item._id }) },
            right: [
                {
                    onPress: () => {
                        const deleteRow = this.state.activeRowKey;
                        Alert.alert(
                            'Alert',
                            'Are you sure you want to delete?',
                            [
                                { text: 'No', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
                                { text: 'Yes', onPress: () => { this.props.removeItem({ index: this.props.index, item: this.props.item }) } },
                            ],
                            { cancelable: true }
                        )
                    },
                    text: 'Delete', type: 'delete'
                }
            ],
            rowId: this.props.index,
            sectionId: 1
        }

        return (
            <Swipeout {...swipeSettings}>
                <View style={styles.container}>

                    <View style={styles.productDes}>
                        <TouchableOpacity
                            onPress={(item)=>{this.props.subtractQuantity(item), alert('    cartItems.component')}}
                        >
                            <Icons name='minus' size={32} />
                        </TouchableOpacity>

                        <Text style={styles.text}>{item.productName}</Text>
                        <Text style={styles.text}>Rs.{(item.price).toFixed(2)}</Text>
                        <Text>{item.quantity}</Text>

                        <TouchableOpacity
                            onPress={(item)=>this.props.addQuantity(item), alert('    cartItems.component')}
                        >
                            <Icons name='plus' size={32} />
                        </TouchableOpacity>
                    </View>
                </View>
            </Swipeout>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    productDes: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        margin: 10,
    },
    text: {
        fontSize: 17,
        padding: 10,
        fontWeight: '400'
    }
});

export default connect(null, { removeItem, addQuantity, subtractQuantity })(CartItems);

// export default connect(null, { removeItem })(CartItems);

// const mapDispatchToProps = (dispatch) => {
//     return {
//         removeItem: () => { dispatch(removeItem()) },
//         addQuantity: () => { dispatch(addQuantity()) },
//         subtractQuantity: () => { dispatch(subtractQuantity()) }
//     }
//     // return bindActionCreators({ removeItem, addQuantity, subtractQuantity }, dispatch)
// }
// export default connect( mapDispatchToProps)(CartItems)







/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



// import React, { Component } from 'react';
// import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
// import { connect } from 'react-redux';
// import Swipeout from 'react-native-swipeout';
// import { removeItem, addQuantity, subtractQuantity } from '../../app/redux/actions/cartActions';
// import { bindActionCreators } from 'redux'
// import Icons from 'react-native-vector-icons/dist/FontAwesome';


// class CartItems extends Component {
//     state = {
//         activeRowKey: null
//     }


//     ///////////////////////////////////////////////////////////////////////////////////


//     handleAddQuantity = (item) => {
//         this.props.addQuantity(item);
//     }

//     handleSubtractQuantity = (item) => {
//         this.props.subtractQuantity(item);
//     }


//     /////////////////////////////////////////////////////////////////////////////////


//     render() {
//         const swipeSettings = {
//             autoClose: true,
//             onClose: (secId, rowId, direction) => { this.setState({ activeRowKey: null }) },
//             onOpen: (secId, rowId, direction) => { this.setState({ activeRowKey: this.props.item._id }) },
//             right: [
//                 {
//                     onPress: () => {
//                         const deleteRow = this.state.activeRowKey;
//                         Alert.alert(
//                             'Alert',
//                             'Are you sure you want to delete?',
//                             [
//                                 { text: 'No', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
//                                 { text: 'Yes', onPress: () => { this.props.removeItem({ index: this.props.index, item: this.props.item }) } },
//                             ],
//                             { cancelable: true }
//                         )
//                     },
//                     text: 'Delete', type: 'delete'
//                 }
//             ],
//             rowId: this.props.index,
//             sectionId: 1
//         }
//         const { item, index } = this.props;
//         return (
//             <Swipeout {...swipeSettings}>
//                 <View style={styles.container}>

//                     <View style={styles.productDes}>
//                         <TouchableOpacity
//                             onPress={this.handleSubtractQuantity(item)}
//                         >
//                             <Icons name='minus' size={32} />
//                         </TouchableOpacity>

//                         <Text style={styles.text}>{item.productName}</Text>
//                         <Text style={styles.text}>Rs.{(item.price).toFixed(2)}</Text>
//                         <Text>{item.quantity}</Text>

//                         <TouchableOpacity
//                             onPress={this.handleAddQuantity(item)}
//                         >
//                             <Icons name='plus' size={32} />
//                         </TouchableOpacity>
//                     </View>
//                 </View>
//             </Swipeout>
//         );
//     }
// }
// const styles = StyleSheet.create({
//     container: {
//         flex: 1
//     },
//     productDes: {
//         flexDirection: 'row',
//         justifyContent: 'space-around',
//         alignItems: 'center',
//         margin: 10,
//     },
//     text: {
//         fontSize: 17,
//         padding: 10,
//         fontWeight: '400'
//     }
// });
// export default connect(null, { removeItem, subtractQuantity, addQuantity })(CartItems);

// // const mapDispatchToProps = (dispatch) => {
// //     return {
// //         removeItem: () => { dispatch(removeItem()) },
// //         addQuantity: () => { dispatch(addQuantity()) },
// //         subtractQuantity: () => { dispatch(subtractQuantity()) }
// //     }
// //     // return bindActionCreators({ removeItem, addQuantity, subtractQuantity }, dispatch)
// // }
// // export default connect( mapDispatchToProps)(CartItems)