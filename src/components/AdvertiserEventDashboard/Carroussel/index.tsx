import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { COLORS } from '../../../constants/Colors';

import { useNavigation } from '@react-navigation/native';
import { IMAGES } from '../../../constants/Images';

const EventCategoryList = () => {
  const navigation = useNavigation();

  const categories = [
    {
      label: 'Aniversários',
      icon: <IMAGES.ICONS.IconBirthday style={{ marginRight: 10 }} />,
      route: 'Aniversario',
    },
    {
        label: (
            <Text>
            <Text >Bares e</Text>
            {'\n'}
            <Text>Restaurantes</Text>
          </Text>

          ),
      icon: <IMAGES.ICONS.IconPubRestaurant style={{ marginRight: 10 }} />,
      route: 'BaresERestaurantes', 
    },
    {
        label: 'Casamento',
        icon: <IMAGES.ICONS.IconMarriagie style={{ marginRight: 10 }} />,
        route: 'Casamento', 
      },
      {
        label: 'Corporativos',
        icon: <IMAGES.ICONS.IconCorporation style={{ marginRight: 10, marginLeft: 10 }} />,
        route: 'Corporativos', 
      },
      {
        label: 'Esportivo',
        icon: <IMAGES.ICONS.IconSport style={{ marginRight: 10,marginLeft: 10 }} />,
        route: 'Esportivo',
      },
      {
        label: (
            <Text>
            <Text >Feiras e</Text>
            {'\n'}
            <Text>Convenções</Text>
          </Text>

          ),
        icon: <IMAGES.ICONS.IconFairsConvention style={{ marginRight: 10 }} />,
        route: 'Feiras e Convenções',
      },
      {
        label: 'Formaturas',
        icon: <IMAGES.ICONS.IconGraduation style={{ marginRight: 10 }} />,
        route: 'Formaturas',
      },
      {
        label: 'Religiosos',
        icon: <IMAGES.ICONS.IconReligion style={{ marginRight: 10,marginLeft: 10 }} />,
        route: 'Religiosos',
      },
      {
        label: 'Shows',
        icon: <IMAGES.ICONS.IconShow style={{ marginRight: 10 }} />,
        route: 'Religiosos',
      },
      
  ];

  const handleCategoryPress = (route) => {
    navigation.navigate(route);
  };

  return (
    <View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {categories.map((category, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => handleCategoryPress(category.route)}>
            <View style={styles.categoryItem}>
              {category.icon}
              <Text style={styles.categoryLabel}>{category.label}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  categoryItem: {
    marginVertical: 20,
    flexDirection: 'column',
  },
  categoryLabel: {
    alignSelf: 'center',
    color: COLORS.grayColor,
    marginTop: 5,
    textAlign:'center'
  },
});

export default EventCategoryList;
