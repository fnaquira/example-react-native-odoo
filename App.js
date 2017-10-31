import React from 'react';
import { FlatList, Image, StyleSheet, Text, View } from 'react-native';

const Odoo = require('react-native-odoo');

const odoo = new Odoo({
  host: '192.168.43.197',
  port: 8069,
  database: 'ldk',
  username: 'test@test.com',
  password: 'test'
});

// Connect to Odoo 
odoo.connect(function (err) {
  if (err) { return console.log(err); }
})


export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      partners: [{name:'xxx'}]
    }
  }
  componentDidMount() {
    odoo.get('res.partner',{
      ids: [1,2,3,4,5,29],
      fields: [ 'name' ],
    },function(err,partners){
      console.log(partners);
      this.setState({
        partners: partners
      })
    }.bind(this))
  }
  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.partners}
          renderItem={({item}) => <Text>{item.name}</Text>}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
