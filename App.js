import React from 'react';
import { View, StyleSheet, Text, ScrollView, Image, TouchableHighlight, Alert} from 'react-native';
import axios from 'axios';

const App = () => {

  const source_url = 'https://reqres.in/api/users'

  const [data, setData] = React.useState([]);
  const [isLoading, setLoading] = React.useState(true);

   React.useEffect(() => {
      axios.get(source_url)
        .then((json) => setData(json.data.data))
        .finally(() => setLoading(false));
  }, []);

  const [fullName, setFullName] = React.useState('Patrick Perez');
  const [email, setEmail] = React.useState('test@gmail.com');

  const postData = async () => {
    axios.post((source_url), {fullName, email})
    .then(response => console.log(response.data));
  }; 

  const [refreshing, setRefreshing] = React.useState(false);

  const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  }
  
  const deleteData = async (id,key) => {
    axios.delete(source_url)
        .then(response => console.log(response.data))
        .finally(() => setLoading(false));
    delete data[key];

    setRefreshing(true);
    wait(100).then(() => setRefreshing(false));
    console.log('USER DELETED')
  };
  
  const deleteAlert = () =>
    Alert.alert(
      "Success!",
      'The user was successfully deleted'
    );

  return (
      <View style = {styles.container}>
        
        <View style = {styles.header}>
          <Text style = {styles.headerText}>List of Users</Text>
        </View>
          
          <View style = {styles.headerBtnContainer}>
            <View style = {styles.headerBtn}>
              <TouchableHighlight activeOpacity={5} underlayColor= "#3c6748" onPress={() => console.log(data)}>
                  <Text style = {styles.btnText}>GET API</Text>
              </TouchableHighlight>
            </View>
            <View style = {styles.headerBtn}>
              <TouchableHighlight activeOpacity={5} underlayColor= "#3c6748" onPress={() => postData()}>
                  <Text style = {styles.btnText}>POST API</Text>
              </TouchableHighlight>
            </View>
          </View>
              
              <ScrollView>
                { 
                  data.map((l, i) => (
                    <View key={i} style={styles.itemContainer}>
                      <View style = {{flexDirection: 'row'}}>
                        <Image style = {styles.userImage} source={{ uri: l.avatar }}/>
                          <View style = {{marginLeft: 10}}>
                            <Text style = {styles.userDetails}>ID: {l.id}</Text>
                            <Text style = {styles.userDetails}>Name: {l.first_name} {l.last_name}</Text>
                            <Text style = {styles.userDetails}>Email: {l.email}</Text>
                          </View>
                      </View>
                        <View style = {styles.deleteBtnContainer}>
                          <TouchableHighlight activeOpacity={5} underlayColor= "#3c6748" onPress={() => (deleteData(l.id,i), deleteAlert())}>
                            <Text style = {styles.btnText}>DELETE USER</Text>
                          </TouchableHighlight>
                        </View>
                    </View>
                  ))
                }
              </ScrollView>
              
      </View>
  );
};


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#232323',
    flex: 1
  },
  header: {
    padding: 10,
    marginHorizontal: 5,
    marginTop: 3,
    borderBottomWidth: 2,
    borderColor: '#4f4f4f',
  },
  headerText: {
    textAlign: 'center',
    fontSize: 25,
    fontWeight: 'bold',
    color: '#d5d4d9',
  },
  headerBtnContainer: {
    padding: 5, 
    borderBottomWidth: 2, 
    borderColor: '#4f4f4f',
    marginBottom: 5
  },
  headerBtn: {
    margin: 5, 
    backgroundColor: '#1b477d',
    borderRadius: 5,
    marginHorizontal: 35
  },
  itemContainer:{
    marginHorizontal: 24,
    marginVertical: 2.5,
    padding: 12,
    borderColor: '#4f4f4f',
    borderWidth: 1,
    borderRadius: 3
  },
  userImage: {
    height: 75, 
    width: 75, 
    borderWidth: 1, 
    borderColor: '#cccccc', 
    borderRadius: 5
  },
  userDetails: {
    fontSize: 17, 
    color: '#d5d4d9',
  },
  deleteBtnContainer: {
    marginHorizontal: 108, 
    marginTop: 2, 
    backgroundColor: '#9c2828', 
    borderRadius: 5
  },
  btnText: {
    textAlign: 'center', 
    color: 'white', 
    padding: 3, 
    fontWeight: 'bold',
  }
});

export default App;