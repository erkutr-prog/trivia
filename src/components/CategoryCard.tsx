import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {ICategory} from '../models/Category';
import { useTheme } from '@react-navigation/native';

type Props = {
  cardData: ICategory;
  onPress: Function;
};

const {width, height} = Dimensions.get('window');

const CategoryCard = (props: Props) => {
  const { colors } = useTheme() 
  return (
    <TouchableOpacity onPress={() => props.onPress()} activeOpacity={1} style={[styles.container, { backgroundColor: colors.card, borderColor: colors.border, borderWidth: 2 }]}>
      <>
        <View style={styles.iconContainer}>
          <Ionicons
            style={{alignSelf: 'center'}}
            name={props.cardData.icon}
            size={25}
            color={colors.text}
          />
        </View>
        <View style={styles.textContainer}>
          <Text style={[styles.titleText, { color: colors.text }]}>{props.cardData.title}</Text>
          <Text style={[styles.descriptionText, { color: colors.text }]}>
            {props.cardData.description}
          </Text>
        </View>
      </>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    width: width - 15,
    marginBottom: 16,
    borderRadius: 16,
  },
  iconContainer: {
    flex: 1 / 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    flex: 3 / 4,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flexDirection: 'column',
    marginVertical: 10
  },
  titleText: {
    flex: 1 / 3,
    fontSize: 18,
    fontWeight: '600',
  },
  descriptionText: {
    flex: 2 / 3,
    fontSize: 15,
    fontWeight: '400',
  },
});

export default CategoryCard;
