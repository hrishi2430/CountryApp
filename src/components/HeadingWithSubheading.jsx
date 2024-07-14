import React from 'react';
import { View, StyleSheet } from 'react-native';
import CustomText from './CustomText';

const HeadingWithSubheading = ({ heading, subHeading }) => {
  return (
    <View style={styles.container}>
      <CustomText type={'title'}>{heading}</CustomText>
      <CustomText type={'subTitle'}>{subHeading}</CustomText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 8
  },
});

export default React.memo(HeadingWithSubheading);
