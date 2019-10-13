import * as React from 'react';
import { ActivityIndicator, Alert, Text, TextInput, TouchableOpacity, View, StyleSheet, Button, FlatList, Component } from 'react-native';
import DatePicker from 'react-native-datepicker';
 
export default class OrgaoScreen extends React.Component {
  static navigationOptions = {
    title: 'Viagens do órgão selecionado',
  };

  constructor(props){
    super(props);
    const { navigation } = this.props;
    this.state = { 
      isLoading: true,
      orgao: null,
      de: null,
      ate: null }
  }
  
  componentDidMount(){
    const { navigation} = this.props;
    this.focusListener = navigation.addListener('didFocus', () => {
    this.buscaViagens();
    })
  }


  componentWillUnmount() {
    this.focusListener.remove();
  } 

  buscaViagens() {
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
  }


enviaDadosViagem = () => {
  let de = this.state.de
  let ate = this.state.ate

  const success = this.handleData(this.state.de, this.state.ate)

    if(success) {
      this.setState({
          de: de,
          ate: ate
        })
      this.Alert.alert('sucesso')
    }
    else {
      this.Alert.alert('tente novamente')
    }
}

handleData = (de, ate) => {

    const d1 = Date.parse(de)
    const d2 = Date.parse(ate)
    let success = false;

    var differenceInTime = d2.getTime() - d1.getTime();
    var differenceInDays = differenceInTime / 1000 * 3600 * 24
    
    if(differenceInDays < 0) 
    {
      success = false;
      alert('Erro! Data de inicio não pode ser maior do que a data fim')
    
    } 
    else if (differenceInDays > 30)
    {
      success = false;
      alert('Erro! Intervalo precisa ser de até um mês')

    }
    else if (differenceInDays <= 30)
    {
      success = true;
    }
    else {
      success = false;
      alert('Erro! Tente novamente!')
    }
    
    return success

    // if(d1.getMonth() - d2.getMonth() === 0)
    //   this.setState({
    //     de: de,
    //     ate: ate
    //   })


    // if(d1 > d2)
    //   alert('Erro! Data de inicio não pode ser maior do que a data fim')
    
      // if(d1.getMonth() - d2.getMonth() === 1)
      //   if(d1.getDay() > d2.getDay())
      //     alert('Erro! Intervalo precisa ser de até um mês')
    
    // if(d1.getMonth === 11 && d2.getMonth === 0)
}




  render() {
    
    const {navigate} = this.props.navigation;
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
          date={this.state.de}
          onDateChange={(date) => {this.setState({de: date})}}
        />
      <Text>ATÉ </Text>
      <DatePicker 
          format= "DD-MM-YYYY"
          confirmBtnText="Escolher"
          cancelBtnText="Cancelar"
          date={this.state.ate}
          onDateChange={(date) => {this.setState({ate: date})}}
        />
      <Text> </Text>
      <Button
          title="Pesquisar"
          onPress={() => navigate('Viagens', {})}
          // onPress={() => this.enviaDadosViagem}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  
  
})