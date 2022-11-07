import React from 'react';
import axios from 'axios';

import { Alert, View, FlatList, RefreshControl, TouchableOpacity } from 'react-native';
import { Post } from '../components/Post';
import { Loading } from '../components/Loading';

export const HomeScreen = ({ navigation }) => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [items, setItems] = React.useState();

  const fetchPosts = () => {
    setIsLoading(true);

    axios
      .get('https://62e7c43093938a545bd89e33.mockapi.io/users')
      .then(({ data }) => {
        setItems(data);
      })
      .catch((err) => {
        console.log(err);
        Alert.alert('Ошибкак', 'Ошибкак при получении статей :(');
      })
      .finally(() => setIsLoading(false));
  };

  React.useEffect(fetchPosts, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <View style={{ paddingTop: 30 }}>
      <FlatList
        refreshControl={<RefreshControl refreshing={isLoading} onRefresh={fetchPosts} />}
        data={items}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate('FullPost', { id: item.id, title: item.title })}>
            <Post title={item.title} imageUrl={item.imageUrl} createdAt={item.createdAt} />
          </TouchableOpacity>
        )}
      />
    </View>
  );
};
