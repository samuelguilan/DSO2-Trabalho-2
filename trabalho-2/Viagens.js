import * as React from 'react';
import { ActivityIndicator, Text, TextInput, TouchableOpacity, View, StyleSheet, Button, FlatList } from 'react-native';
 
export default class ViagensScreen extends React.Component {
  static navigationOptions = {
    title: 'Viagens realizadas',
  };

  constructor(props){
    super(props);
    let infoOrgao = props.navigation.getParam('informacoes');
    let paginasSomadas = [];
    this.state = {
      codigo:infoOrgao.codigo,
      dataMin: infoOrgao.dataMin,
      dataMax: infoOrgao.dataMax,
      pagina: 1,
      somaTotalGastos: 0,
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
          const v = responseJson;
          this.somaTotalGastos(v);
          this.setState({
            viagens: v,
          }, function(){
          });
        })
        .catch((error) =>{
          console.error(error);
        });

  }
  somaTotalGastos(viagens) {
    if(!this.paginasSomadas.contains(this.state.pagina)){
        this.paginasSomadas.push(this.state.pagina);
        var totalGastos = this.state.somaTotalGastos;
        viagens.forEach((viagem)=>{totalGastos = totalGastos + this.state.valorTotalViagem;});
        this.setState({somaTotalGastos: totalGastos});
      }
  }

  paginaAnterior(){}

  proximaPagina(){}

  render() {
    
    const {navigate} = this.props.navigation;
    return (
      <View>
      <Text>Total de gastos: this.state.somaTotalGastos</Text>
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
      <Button
        title="Voltar"
        onPress={() => navigate('Orgaos')}
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