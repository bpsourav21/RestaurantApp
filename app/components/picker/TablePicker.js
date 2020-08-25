import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Picker, TouchableOpacity, TouchableHighlight } from 'react-native';
import { Container, Header, Content, Button, Item, Icon, Input, Card, CardItem, Thumbnail, Body, Left, Right, Form, Drawer, Title } from 'native-base';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Modal from 'react-native-modal';
//importing actions
import { selectTable } from '../../actions/order'
//importing variables
import { Colors } from '../../constant.js';

var floorObj = [{ lvlName: "Floor 1", tblName: ["table 1", "table 2", "table 3", "table 4"] }, { lvlName: "Floor 2", tblName: ["table 2", "table 3", "table 4"] },]
class TablePicker extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visibleModal: false,
            flrIndex: 0
        }
    }
    _toggleModal() { this.setState({ visibleModal: !this.state.visibleModal }) }

    render() {
        var flrIndex = this.state.flrIndex
        var showTableButton = []
        var showLevelButton = []
        for (let lvl = 0; lvl < floorObj.length; lvl++) {
            showLevelButton.push(<Button key={lvl} full success  style={{ margin: 5 , height: 80}} onPress={() => {
                this.setState({ flrIndex: lvl })
            }}>
                <Text style={{ fontSize: 20, textAlign: 'center', color: Colors.black }}>{floorObj[lvl].lvlName}</Text>
            </Button>)
        }
        for (let i = 0; i < floorObj[flrIndex]["tblName"].length; i++) {
            showTableButton.push(<Button key={i} info style={{ margin: 5, flex: 1 , height: 100}} onPress={(e) => {
                var tableVal = floorObj[flrIndex]["lvlName"] + ", " + floorObj[flrIndex].tblName[i]
                this.props.dispatch(selectTable(tableVal))
                this.setState({ visibleModal: false, })
                console.log(tableVal)
            }}>
                <Text style={{ fontSize: 20, textAlign: 'center', color: Colors.black }}>{floorObj[flrIndex].tblName[i]}</Text>
            </Button>)

        }
        return (
            <View >
                {/*<View style={{ flexDirection: "row" }}>*/}
                <Button full style={{ backgroundColor: Colors.Brown_Rust, alignItems: "center", height: 50 }}
                    onPress={() => {
                        this.setState({ visibleModal: true })
                    }}>
                    <Text style={{ fontSize: 20, textAlign: 'center', color: Colors.black }}>{this.props.tableName == null ? "Please Choose your table" : this.props.tableName}</Text>
                </Button>
                {/*</View>*/}
                <Modal
                    isVisible={this.state.visibleModal}
                    //backdropColor={'black'}
                    //backdropOpacity={0.7}
                    animationIn={'zoomInDown'}
                    animationOut={'zoomOut'}
                // animationInTiming={1000}
                // animationOutTiming={1000}
                // backdropTransitionInTiming={1000}
                // backdropTransitionOutTiming={1000}
                >
                    <View style={styles.modalContent}>
                        <View style={{ flex: 1, borderBottomColor: 'rgba(0, 0, 0, 0.3)', borderBottomWidth: 1 }}>
                            <Text style={{ fontSize: 20, textAlign: 'center', color: Colors.black }}>Please Choose your table</Text>
                        </View>
                        <View style={{ flex: 10 }}>
                            <View style={{ flexDirection: "row" }}>
                                <View style={{ flex: 1, padding: 10 }}>
                                    {showLevelButton}
                                </View>
                                <View style={{ flex: 3, padding: 10, flexDirection: "row" }}>
                                    {showTableButton}
                                </View>
                            </View>

                        </View>

                        <View style={{ flex: 1, }}>
                            <Button block danger onPress={() => { this.setState({ visibleModal: false }) }}>
                                <Text>close</Text>
                            </Button>
                        </View>
                    </View>
                </Modal>

            </View >

        );
    }
}

const styles = StyleSheet.create({
    modalContent: {
        flex: 1,
        backgroundColor: Colors.white,
        padding: 20,
        borderRadius: 4,
        borderColor: 'rgba(0, 0, 0, 0.1)',
    }
});
// ======================== REDUX CONNECTORS ========================
const mapStateToProps = (state) => {
    return {
        tableName: state.order.tableName
    };
};

// ==================================================================
export default connect(mapStateToProps)(TablePicker);