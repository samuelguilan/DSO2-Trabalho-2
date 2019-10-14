import * as React from 'react';
import { ActivityIndicator, Text, TextInput, TouchableOpacity, View, StyleSheet, Button, FlatList } from 'react-native';
 
export default class ViagemScreen extends React.Component {
  static navigationOptions = {
    title: 'Detalhes de viagem',
  };

  constructor(props){
    super(props);
    let viagem = props.navigation.getParam('viagem');
    this.state = { viagem:viagem }
  }
  
  componentDidMount(){
    const { navigation } = this.props;
    this.focusListener = navigation.addListener('didFocus', () => {
      console.log("Detalhes de viagem");
    });
  }


  componentWillUnmount() {
    this.focusListener.remove();
  } 

  render() {
    

    
    const {navigate} = this.props.navigation;
    return (
      <View>
      <Text>Data de ida: {this.state.viagem.dataInicioAfastamento}</Text>
      <Text>Data de volta: {this.state.viagem.dataFimAfastamento}</Text>
      <Text>Nome do servidor: {this.state.viagem.pessoa.nome}</Text>
      <Text>Motivo da viagem: {this.state.viagem.dimViagem.motivo}</Text>
      <Text>Valores: </Text>
      <Text>        Restituição: {this.state.viagem.valorTotalRestituicao}</Text>
      <Text>        Taxa de agenciamento: {this.state.viagem.valorTotalTaxaAgenciamento}</Text>
      <Text>        Multa: {this.state.viagem.valorMulta}</Text>
      <Text>        Diárias: {this.state.viagem.valorTotalDiarias}</Text>
      <Text>        Passagem: {this.state.viagem.valorTotalPassagem}</Text>
      <Text>Total de valores: {this.state.viagem.valorTotalViagem}</Text>
      <Text>Total de devolução: {this.state.viagem.valorTotalDevolucao}</Text>
      
      <Button
        title="Voltar"
        onPress={() => navigate('Viagens')}
      />
      </View>
    );

  }
}
