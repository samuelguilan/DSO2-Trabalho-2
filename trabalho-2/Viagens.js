import * as React from 'react';
import { ActivityIndicator, Text, TextInput, TouchableOpacity, View, StyleSheet, Button, FlatList } from 'react-native';
 
export default class ViagensScreen extends React.Component {
  static navigationOptions = {
    title: 'Viagens realizadas',
  };

  constructor(props){
    super(props);
    let infoOrgao = props.navigation.getParam('informacoes');
    this.state = {
      codigo:infoOrgao.codigo,
      dataMin: infoOrgao.dataMin,
      dataMax: infoOrgao.dataMax,
      pagina: 1,
    };
  }
  
  componentDidMount(){
    const { navigation } = this.props;
    this.focusListener = navigation.addListener('didFocus', () => {
     
    });
  }


  componentWillUnmount() {
    this.focusListener.remove();
  } 
  buscaViagens(){
      var codigoUrl = encodeURI(this.state.codigo);
      var dataMinUrl = encodeURI(this.state.dataMin);
      var dataMaxUrl = encodeURI(this.state.dataMax);
      var paginaUrl = encodeURI(this.state.pagina);
      var uri = "http://www.transparencia.gov.br/api-de-dados/viagens?" +
               "dataIdaDe="+dataMinUrl+
               "&dataIdaAte="+dataMaxUrl+
               "&dataRetornoDe="+dataMinUrl+
               "&dataRetornoAte="+dataMaxUrl+
               "&codigoOrgaoSelecionado="+codigoUrl+
                "&pagina="+paginaUrl;
      return fetch(uri)
        .then((response) => response.json())
        .then((responseJson) => {
          this.setState({
            viagens: responseJson,
          }, function(){
          });
        })
        .catch((error) =>{
          console.error(error);
        });

  }
  somaTotalGastos() {
    this.viagens.forEach((viagem)=>{console.log.viagem.valorTotalViagem;});
      
    

  }

  paginaAnterior(){}

  proximaPagina(){}

  render() {
    
    const {navigate} = this.props.navigation;
    return (
      <View>
      <Text>Total de gastos: </Text>
       <FlatList
          data={this.state.viagens}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => navigate('Viagem', { viagem: item })}>
              <View>
                <Text style={styles.item}>
                  {item.beneficiario.nome}, {item.dataInicioAfastamento}, {item.dataFimAfastamento}, {item.valorTotalViagem}
                </Text>
              </View>
            </TouchableOpacity>
          )}
        />
      <Button
        title="Próxima página"
        onPress={() => this.proximaPagina}
      />
      <Button
        title="Página anterior"
        onPress={() => this.paginaAnterior}
      />
      </View>
    );
   }
  }
  const styles = StyleSheet.create({
    item: {
      padding: 10,
      fontSize: 18,
      height: 44,
    },
  });