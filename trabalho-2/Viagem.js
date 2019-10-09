import * as React from 'react';
import { ActivityIndicator, Text, TextInput, TouchableOpacity, View, StyleSheet, Button, FlatList } from 'react-native';
 
export default class ViagemScreen extends React.Component {
  static navigationOptions = {
    title: 'Detalhes de viagem',
  };

  constructor(props){
    super(props);
    this.state = { isLoading: true }
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

  render() {
    

    
    const {navigate} = this.props.navigation;
    return (
      <View>
      <Text>Data de ida: </Text>
      <Text>Data de volta: </Text>
      <Text> </Text>
      <Text>Nome do servidor: </Text>
      <Text> </Text>
      <Text>Motivo da viagem: </Text>
      <Text> </Text>
      <Text>Valores: </Text>
      <Text>        Restituição: </Text>
      <Text>        Taxa de agenciamento: </Text>
      <Text>        Multa: </Text>
      <Text>        Diárias: </Text>
      <Text>        Passagem: </Text>
      <Text>Total de valores: </Text>
      <Text>Total de devolução: </Text>
      
      <Button
        title="Voltar"
        onPress={() => navigate('Orgao')}
      />
      </View>
    );

  }
}
const styles = StyleSheet.create({
  
  
})