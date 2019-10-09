import * as React from 'react';
import {
  ActivityIndicator,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
  Button,
  FlatList,
} from 'react-native';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Consulta de transparência',
  };

  constructor(props) {
    super(props);
    this.state = { isLoading: true };
  }

  componentDidMount() {
    const { navigation } = this.props;
    this.focusListener = navigation.addListener('didFocus', () => {
      return fetch(
        'http://www.transparencia.gov.br/api-de-dados/orgaos-siafi?pagina=1'
      )
        .then(response => response.json())
        .then(responseJson => {
          console.log(responseJson);
          this.setState(
            {
              isLoading: false,
              orgaos: responseJson,
            },
            function() {}
          );
        })
        .catch(error => {
          console.error(error);
        });
    });
  }

  componentWillUnmount() {
    this.focusListener.remove();
  }

buscaPorOrgao(){
    var descricaoUrl = encodeURI(this.state.descricao);
    var paginaUrl = encodeURI(1);
    var uri = "http://www.transparencia.gov.br/api-de-dados/orgaos-siafi"+
      "?descricao="+descricaoUrl+
      "&pagina="+paginaUrl;
    fetch(uri)
        .then((response) => response.json())
        .then((responseJson) => {

  });
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View>

        <Text> </Text>
        <Text>Insira a descrição do órgão que dejesa consultar</Text>
        <TextInput
          onChangeText={text => this.setState({ descricao: text })}
          //value={''}
        />
        <Text> </Text>
        <Button
          title="Buscar"
          onPress={() => {
            this.setState({
              isLoading: true
            })
            this.buscaPorOrgao
          }
          }
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
              }
            </TouchableOpacity>
          )}
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
