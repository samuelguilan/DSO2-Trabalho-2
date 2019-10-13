import * as React from 'react';
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
  Button,
  FlatList,
  ScrollView,
} from 'react-native';
//import MainServices from './services/MainServices'

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Consulta de transparência',
  };

  constructor(props) {
    super(props);
    this.state = { 
      isLoading: true,
      page: 1,
      orgaos: [],
      descricao: null
    };
  }

  componentDidMount() {
    const { navigation } = this.props;

    this.focusListener = navigation.addListener('didFocus', () => {
      this.buscaOrgaos();
     });
  }

  componentWillUnmount() {
    this.focusListener.remove();
  }

  buscaPorOrgao() {
    var d = this.state.descricao;
    var p = this.state.page;
    var descricaoUrl= encodeURI(d);
    var paginaUrl = encodeURI(p);
    var uri =
      'http://www.transparencia.gov.br/api-de-dados/orgaos-siafi' +
      '?descricao=' + descricaoUrl +
      '&pagina=' + paginaUrl; 
    fetch(uri)
      .then(response => response.json())
      .then(responseJson => {
        this.setState({
              isLoading: false,
              orgaos: responseJson,
            }, () => {});
      })
      .catch(error => {
          console.error(error);
        });  
  }

  buscaOrgaos = () => {
    
    const { orgaos, page } = this.state
    this.setState({ isLoading: true})
    return fetch(
        `http://www.transparencia.gov.br/api-de-dados/orgaos-siafi?pagina=${page}`
      )
        .then(res => res.json())
        .then(resJson => {
          this.setState({
              isLoading: false,
              orgaos: resJson,
            }, () => {});
        })
        .catch(error => {
          console.error(error);
        });
    }
    

  



  handleNextPage = () => {
    this.setState({
      page: this.state.page + 1
    }, () => {
      if(this.state.descricao== null){
        this.buscaOrgaos()
      }else{
        this.buscaPorOrgao()
      }
    })
  }

  handlePreviousPage = () => {
    if( this.state.page >= 1) {
    this.setState({
      page: this.state.page - 1
    }, () => {
      if(this.state.descricao== null){
        this.buscaOrgaos()
      }else{
        this.buscaPorOrgao()
      }
    })
    } else {
      console.log('erro')
    }
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <ScrollView>
        <Text> </Text>
        <Text>Insira a descrição do órgão que dejesa consultar</Text>
        <TextInput
          onChangeText={text => this.setState({ descricao: text })}
          //value={''}
        />
        {this.state.isLoading ? <Text> Carregando... </Text> : <Text>  </Text>}
        <Button
          title="Buscar"
          onPress={() =>  {
            this.setState({
              page: 1,
              isLoading: true
              },
              ()=>this.buscaPorOrgao())
            
          }}
        />
        <FlatList
          data={this.state.orgaos}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => navigate('Orgao', { orgao: item })}>
              <View>
                <Text style={styles.item}>
                  {item.codigo}, {item.descricao}
                </Text>
              </View>
            </TouchableOpacity>
          )}
        />
        <Button 
          title="Próxima Página"
          onPress={() => {
            this.handleNextPage()
          }}
          />
          {this.state.page === 1 && this.state.isLoading === false ? <Text></Text> : <Button 
          title="Página Anterior"
          onPress={() => {
            this.handlePreviousPage()
          }}
          />}
      </ScrollView>
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
