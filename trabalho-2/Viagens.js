import * as React from 'react';
import { ActivityIndicator, Text, TextInput, TouchableOpacity, View, StyleSheet, Button, FlatList } from 'react-native';
 
export default class ViagensScreen extends React.Component {
  static navigationOptions = {
    title: 'Viagens realizadas',
  };

  constructor(props){
    super(props);
    let infoOrgao = props.navigation.state;
    console.log(infoOrgao)
    let paginasSomadas = [];
    this.state = {
      codigo:  infoOrgao.params.codigo,
      dataMin: infoOrgao.params.dataMin,
      dataMax: infoOrgao.params.dataMax,
      pagina: 1,
      somaTotalGastos: 0,
    };
  }
  
  componentDidMount(){
    const { navigation } = this.props;
    this.focusListener = navigation.addListener('didFocus', () => {
     this.buscaViagens()
    });
  }


  componentWillUnmount() {
    this.focusListener.remove();
  } 
  buscaViagens = () => {
      let codigo = this.state.codigo;
      let dataMin = this.state.dataMin;
      let dataMax = this.state.dataMax;
      let pagina = this.state.pagina


      let codigoUrl = encodeURI(codigo);
      let dataMinUrl = encodeURI(this.converterData(dataMin));
      let dataMaxUrl = encodeURI(this.converterData(dataMax));
      let paginaUrl = encodeURI(pagina);

      console.log(dataMaxUrl)

      
      let uri = `http://www.transparencia.gov.br/api-de-dados/viagens?dataIdaDe=${dataMinUrl}&dataIdaAte=${dataMaxUrl}&dataRetornoDe=${dataMinUrl}&dataRetornoAte=${dataMaxUrl}&codigoOrgaoSelecionado=${codigoUrl}&pagina=${paginaUrl}`;
      
      console.log(uri)
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
    if(!this.paginasSomadas.includes(this.state.pagina)){
        this.paginasSomadas.push(this.state.pagina);
        var totalGastos = this.state.somaTotalGastos;
        viagens.forEach((viagem)=>{totalGastos = totalGastos + this.state.valorTotalViagem;});
        this.setState({somaTotalGastos: totalGastos});
      }
  }

  converterData = (data) => {
    const [year, month, day] = data.split("-")
    let dataConvertida = `${day}/${month}/${year}`
    return dataConvertida 
  }


  paginaAnterior(){

    if( this.state.pagina >= 1) {
    this.setState({
      page: this.state.pagina - 1
    }, () => {
      this.buscaViagens()
    })
    } else {
      console.log('erro')
    }

  }

  proximaPagina(){

    if( this.state.pagina >= 1) {
    this.setState({
      page: this.state.pagina + 1
    }, () => {
      this.buscaViagens()
    })
    } else {
      console.log('erro')
    }

  }

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
      {this.state.pagina === 1 && this.state.isLoading === false ? <Text></Text> : <Button 
          title="Página Anterior"
          onPress={() => {
            this.paginaAnterior()
          }}
          />}
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