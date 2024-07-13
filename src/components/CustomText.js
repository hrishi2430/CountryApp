import React from 'react';
import { Text, StyleSheet } from 'react-native';

const CustomText = ({ style, type, ...props }) => {
  const textStyle = React.useMemo(() => [styles.defaultText, styles[type], style], []);
  return <Text style={textStyle} {...props} />;
};

const styles = StyleSheet.create({
  defaultText: {
    fontSize: 16,
    color: '#000000',
    fontFamily: 'PublicSans-Regular',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subHeading: {
    fontSize: 18,
    textAlign: 'center',
  },
  body: {
    fontSize: 16,
  },
  title: {
    fontSize: 16,
    fontFamily: 'PublicSans-Medium',
  },
  subTitle: {
    fontSize: 14,
    color: '#4A789C',
  },
  buttonText: {
    fontSize: 14, fontWeight: 'bold', color: '#FFF',
  }
});

export default CustomText;
