import { useContext, useLayoutEffect } from 'react';
import { Text, View, Image, StyleSheet, ScrollView } from 'react-native';

import MealDetails from '../components/MealDetails';
import Subtitle from '../components/MealDetails/Subtitle';
import List from '../components/MealDetails/List';
import IconButton from '../components/IconButton';
import { MEALS } from '../data/dummy-data';
import { FavouritesContext } from '../store/context/favourites-context';

export default function MealDetailsScreen({route, navigation}) {
  const mealId = route.params.mealId;
  const meal = MEALS.find((meal) => meal.id === mealId);
  const mealDetailsProps = {
    duration: meal.duration,
    complexity: meal.complexity,
    affordability: meal.affordability
  };

  const favouriteMealsCtx = useContext(FavouritesContext);

  const mealIsFavourite = favouriteMealsCtx.ids.includes(mealId);

  function iconButtonPressHandler() {
    if (mealIsFavourite) {
      favouriteMealsCtx.removeFavourite(mealId);
    } else {
      favouriteMealsCtx.addFavourite(mealId);
    }
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      title: meal.title,
      headerRight: () => {
        return (
          <IconButton
            onPress={iconButtonPressHandler}
            icon={mealIsFavourite ? 'heart' : 'heart-outline'}
            colour='white'
          />
        )
      }
    })
  }, [navigation, iconButtonPressHandler]);

  return (
    <View>
      <Image source={{uri: meal.imageUrl}} style={styles.mealImage}/>
      <ScrollView>
        <Text style={styles.title}>{meal.title}</Text>
        <View>
          <MealDetails {...mealDetailsProps}/>
        </View>
        <View>
          <View style={styles.listContainer}>
            <Subtitle>Ingredients</Subtitle>
            <List listable={meal.ingredients}/>
            <Subtitle>Steps</Subtitle>
            <List listable={meal.steps}/>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  mealImage: {
    width: '100%',
    height: 350
  },
  title: {
    fontWeight: 'bold',
    fontSize: 24,
    margin: 4,
    marginTop: 8,
    textAlign: 'center'
  },
  listContainer: {
    width: '80%'
  },
  listContainer: {
    alignItems: 'center'
  }
});
