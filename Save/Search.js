import React, { Component } from "react";
import {
  View,
  Text,
  Button,
  Image,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  ListView,
  TouchableHighlight,
  TextInput
} from "react-native";

import SearchBarre from './SearchBarre';


var ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 === r2 });

class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      barActivated: false,
      search: null,
      selected: 1,
      active: false,
      changed: false,
      text: "Useless Placeholder",
      dataSource: this.props.list
    };
  }

  onChangeText(text) {
    console.log("laaaaa");
    if (text == "") {
        return (this.setState({search: null}));
    }
    this.setState({search: text,
    dataSource: this.state.dataSource.cloneWithRows(this.props.data)});
    console.log("text -" + text);
    console.log(this.state.search);
  }

  renderRow(record) {
    if (this.state.search != null && record.id.indexOf(this.state.search) == -1) {
      current = "";
      current = this.state.search;
        return (
          <View />
          );
    }

    return (
      <TouchableHighlight onPress={this.toggleClass.bind(this, record.rank)}>
        <View style={{ width: "100%" }}>

          <View
            style={
              this.state.selected === record.rank ? styles.active : styles.liste
            }
          >
            <Image
              style={
                this.state.selected === record.rank
                  ? styles.activeImage
                  : styles.image
              }
              source={{
                uri:
                  "https://files.coinmarketcap.com/static/img/coins/32x32/" +
                  record.id +
                  ".png"
              }}
            />
            <Text
              style={
                this.state.selected === record.rank
                  ? styles.activeText
                  : styles.text
              }
            >
              {record.id}
            </Text>
          </View>
          <View
            style={
              this.state.selected === record.rank ? styles.infos : styles.null
            }
          >
            <Text style={styles.infosText}>Price : {record.price_usd}$</Text>
            <Text
              style={[
                styles.infosText,
                record.percent_change_24h.indexOf("-")
                  ? styles.green
                  : styles.red
              ]}
            >
              1 day %: {record.percent_change_24h}$
            </Text>
            <Text
              style={[
                styles.infosText,
                record.percent_change_7d.indexOf("-")
                  ? styles.green
                  : styles.red
              ]}
            >
              7day %: {record.percent_change_7d}$
            </Text>
          </View>
        </View>
      </TouchableHighlight>
    );
  }

  toggleClass(rank) {
    currentState = this.state.active;
    rank = rank === this.state.selected ? null : rank;
    this.setState({
      active: !currentState,
      dataSource: this.state.dataSource.cloneWithRows(this.props.data),
      selected: rank
    });
  }

  render() {
    return (
      <View style={styles.size}>
        <View>
        <SearchBarre
          obj={this}
        />
      </View>
        <ListView
          style={styles.containerListeView}
          dataSource={this.state.dataSource}
          renderRow={this.renderRow.bind(this)}
        />
      </View>
        );
  }
}

const styles = {
  Search: {
    fontSize: 22,
    height: 10
  },
  size: {
    width: "80%",
  },
  liste: {
    height: 80,
    borderRadius: 4,
    borderBottomWidth: 1,
    borderColor: "#d6d7da",
    alignItems: "center",
  },
  unactive: {},
  green: {
    color: "green"
  },
  red: {
    color: "red"
  },
  iconMenu: {
    height: 30,
    width: 30,
    margin: 20
  },
  active: {
    height: 80,
    borderRadius: 4,
    alignSelf: "center",
    borderColor: "#d6d7da"
  },
  infos: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  infosText: {
    marginLeft: 10,
    marginBottom: 20,
    fontSize: 11,
    fontWeight: "bold"
  },
  null: {
    display: "none"
  },
  menu: {
    width: 100
  },
  activeImage: {
    height: 30,
    width: 30,
    alignSelf: "center",
    marginTop: 7
  },
  activeText: {
    marginLeft: 5,
    alignSelf: "center",
    flex: 1,
    fontSize: 15,
    fontWeight: "bold"
  },
  image: {
    marginTop: 16,
    height: 20,
    width: 20,
    alignSelf: "center"
  },
  text: {
    marginLeft: -7,
    flex: 1,
    alignSelf: "center",
    fontSize: 19,
    fontWeight: "bold"
  },
  errorTextStyle: {
    color: "#E64A19",
    alignSelf: "center",
    paddingTop: 10,
    paddingBottom: 10
  },
  containerListeView: {
    width: "100%"
  }
};

export default Search;
