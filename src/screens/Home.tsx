import {View, Text, FlatList} from 'react-native';
import React, { useEffect } from 'react';
import {cards} from '../utils/CategoryData';
import {ICategory} from '../models/Category';
import CategoryCard from '../components/CategoryCard';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AppStackParamList, RootStackParamList } from '../models/TabParamsList';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>

const Home = ({navigation}: Props) => {
  const HeaderComponent = () => {
    const today = new Date();
    const currentHour = today.getHours();
    var greetingText: string = '';
    if (currentHour < 12) {
      greetingText = 'Good Morning! 🌞';
    } else if (currentHour < 18) {
      greetingText = 'Good Afternoon! 🌥️';
    } else {
      greetingText = 'Good Evening! 🌙';
    }
    return (
      <View style={{flexDirection: 'column', flex: 1, marginVertical: 16}}>
        <View style={{flexDirection: 'row', justifyContent: 'flex-start'}}>
          <Text
            style={{
              fontWeight: '800',
              color: '#000',
              fontSize: 18,
              alignSelf: 'flex-start',
              fontFamily: 'Rubik',
            }}>
            {greetingText}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <FlatList
        contentContainerStyle={{paddingTop: 10}}
        data={cards}
        renderItem={({item}) => <CategoryCard onPress={() => navigation.navigate('GameOptions', {category: {category_id: item.category_id, category: item.title}})} cardData={item} />}
        keyExtractor={(item: ICategory) => item.id}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={HeaderComponent}
      />
    </View>
  );
};

export default Home;
