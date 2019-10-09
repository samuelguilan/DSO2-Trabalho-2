import * as React from 'react';
import { ActivityIndicator, Text, TextInput, TouchableOpacity, View, StyleSheet, Button, FlatList, Component } from 'react-native';
import DatePicker from 'react-native-datepicker'
 
export default class OrgaoScreen extends React.Component {
  static navigationOptions = {
    title: 'Viagens do órgão selecionado',
  };

  constructor(props){
    super(props);
    this.state = { 
      isLoading: true,
      orgao: null }
  }
  
  componentDidMount(){
    const { navigation } = this.props;
    this.focusListener = navigation.addListener('didFocus', () => {
      return fetch('http://www.transparencia.gov.br/api-de-dados/orgaos-siafi?pagina=1')
        .then((response) => response.json())
        .then((responseJson) => {
          this.setState({
            isLoading: false,
          }, function(){
          });
        })
        .catch((error) =>{
          console.error(error);
        });
    });
  }


  componentWillUnmount() {
    this.focusListener.remove();
  } 

  buscaViagens() {

  }

  render() {
    

    
    const {navigate} = this.props;
    return (
      <View>
      <Text>Órgão selecionado: </Text>
      <Text> </Text>
      <Text>Insira o período de viagens que deseja consultar: (MÁXIMO DE 1 MÊS)</Text>
      <Text>DE </Text>
      <DatePicker 
          format= "DD-MM-YYYY"
          confirmBtnText="Escolher"
          cancelBtnText="Cancelar"
          onDateChange={(date) => {this.setState({de: date})}}
        />
      <Text>ATÉ </Text>
      <DatePicker 
          format= "DD-MM-YYYY"
          confirmBtnText="Escolher"
          cancelBtnText="Cancelar"
          onDateChange={(date) => {this.setState({ate: date})}}
        />
      <Text> </Text>
      <Button
          title="Pesquisar"
          onPress={() => this.buscaViagens}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  
  
})