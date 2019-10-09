import * as React from 'react';
import { ActivityIndicator, Text, TextInput, TouchableOpacity, View, StyleSheet, Button, FlatList } from 'react-native';
 
export default class ViagensScreen extends React.Component {
  static navigationOptions = {
    title: 'Viagens realizadas',
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
      <Text>Total de gastos: </Text>
       <FlatList
          data={this.state.viagens}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => navigate('Viagem', { viagem: item })}>
              <View>
                <Text style={styles.item}>
                  {item.codigo}, {item.descricao}
                </Text>
              </View>
              }
            </TouchableOpacity>
          )}
        />
      <Button
        title="Próxima página"
        onPress={() => navigate('Viagem')}
      />
      </View>
    );

  }
}
const styles = StyleSheet.create({
  
  
})