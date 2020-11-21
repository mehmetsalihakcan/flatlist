import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  FlatList,
  Image,
  ActivityIndicator,
  Platform,
  StatusBar,
} from 'react-native';

const App = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [pageCurrent, setPageCurrent] = useState(1);

  useEffect(() => {
    console.log('useEffect');
    console.log('useEffect currentPage', pageCurrent);
    setIsLoading(true);
    getData();
    return () => {};
  }, [pageCurrent]);

  const getData = async () => {
    console.log('getData');
    const apiURL =
      'https://jsonplaceholder.typicode.com/photos?_limit=10&_page=' +
      pageCurrent;

    fetch(apiURL)
      .then((res) => res.json())
      .then((resJson) => {
        setData(data.concat(resJson));
        setIsLoading(false);
      });
  };

  const renderItem = ({item}) => {
    return (
      <View style={styles.itemRow}>
        <Image source={{uri: item.url}} style={styles.itemImage} />
        <Text style={styles.itemText}>{item.id}</Text>
        <Text style={styles.itemText}>{item.title}</Text>
      </View>
    );
  };
  const renderFooter = () => {
    return isLoading ? (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="green" />
      </View>
    ) : null;
  };
  const handleLoadMore = () => {
    console.log('handleLoadMore');
    setPageCurrent(pageCurrent + 1);
    setIsLoading(true);
  };

  const renderHeader = () => {
    return (
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Header Başlık</Text>
        <Text style={styles.headerDescription}>Açıklama eklenecek yer</Text>
      </View>
    );
  };
  return (
    <View style={{backgroundColor: 'red'}}>
      <StatusBar barStyle="default" backgroundColor="red" />
      <SafeAreaView>
        <FlatList
          style={styles.flatContainer}
          data={data}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          ListFooterComponent={renderFooter}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0}
          ListHeaderComponent={renderHeader}
        />
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 0,
  },
  flatContainer: {
    marginTop: 0,
    backgroundColor: '#f5fcff',
  },
  itemImage: {
    height: 200,
    justifyContent: 'center',
    width: '90%',
    alignItems: 'center',
    margin: 20,
    borderRadius: 10,
    resizeMode: 'cover',
  },
  itemRow: {
    borderColor: '#ccc',
    margin: 20,
    borderBottomWidth: 1,
  },
  itemText: {
    fontSize: 16,
    padding: 5,
  },
  loader: {
    margin: 10,
    alignItems: 'center',
  },
  header: {
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: 'red',
    height: Platform.OS === 'android' ? 60 : 80,
    //height: Platform.OS === 'ios' ? 200 : 100
  },
  headerTitle: {
    fontSize: 25,
    color: 'white',
    fontWeight: 'bold',
  },
  headerDescription: {
    color: 'white',
    fontSize: 16,
  },
});

export default App;
