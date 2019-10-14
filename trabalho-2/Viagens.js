import * as React from 'react';
import { ActivityIndicator, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, View, Button, FlatList } from 'react-native';
 
export default class ViagensScreen extends React.Component {
  static navigationOptions = {
    title: 'Viagens realizadas',
  };

  constructor(props){
    super(props);
    let infoViagens = props.navigation.getParam('info');
    let paginasSomadas = [];
    console.log(infoViagens)
    this.state = {
      codigo:  infoViagens.orgao.codigo,
      dataMin: infoViagens.dataMin,
      dataMax: infoViagens.dataMax,
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
      let dataMin = this.converterData(this.state.dataMin);
      let dataMax = this.converterData(this.state.dataMax);
      let pagina = this.state.pagina


      let codigoUrl = encodeURI(codigo);
      let dataMinUrl = encodeURIComponent(dataMin);
      console.log(dataMinUrl)
      let dataMaxUrl = encodeURIComponent(dataMax);
      let paginaUrl = encodeURIComponent(pagina);

      console.log(dataMaxUrl)

      
      let uri = `http://www.transparencia.gov.br/api-de-dados/viagens?dataIdaDe=${dataMinUrl}&dataIdaAte=${dataMaxUrl}&dataRetornoDe=${dataMinUrl}&dataRetornoAte=${dataMaxUrl}&codigoOrgao=${codigoUrl}&pagina=${paginaUrl}`;
      
      console.log(uri)
      return fetch(uri)
        .then((response) => response.json())
        .then((responseJson) => {
          const v = responseJson;
          // this.somaTotalGastos(v);
          this.setState({
            viagens: v,
          }, function(){
          });
        })
        .catch((error) =>{
          console.error(error);
        });


  }
  converterData = (data) => {
    const [year, month, day] = data.split("-")
    let dataConvertida = `${day}/${month}/${year}`
    return dataConvertida 
  }
  somaTotalGastos(viagens) {
    if(!this.paginasSomadas.includes(this.state.pagina)){
        this.paginasSomadas.push(this.state.pagina);
        var totalGastos = this.state.somaTotalGastos;
        viagens.forEach((viagem)=>{totalGastos = totalGastos + this.state.valorTotalViagem;});
        this.setState({somaTotalGastos: totalGastos});
      }
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
      <ScrollView>
      <Text>Total de gastos: {this.state.somaTotalGastos}</Text>
      <Text> </Text>
       <FlatList
          data={this.state.viagens}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => navigate('Viagem', { viagem: item })}>
              <View>
                <Text style={styles.item}>
                  {item.pessoa.nome} | {item.dataInicioAfastamento} | {item.dataFimAfastamento} | R$ {item.valorTotalViagem}
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
      </ScrollView>
    );
   }
  }
  const styles = StyleSheet.create({
    item: {
      padding: 10,
      fontSize: 12,
      height: 44,
    },
});