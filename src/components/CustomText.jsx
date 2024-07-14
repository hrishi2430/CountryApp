import React from 'react';
import { Text, StyleSheet } from 'react-native';

const CustomText = ({ style, type, ...props }) => {
  const textStyle = React.useMemo(() => [styles.defaultText, styles[type], style], []);
  return <Text style={textStyle} {...props} />;
};

const styles = StyleSheet.create({
  defaultText: {
    fontSize: 16,
    lineHeight: 20,
    color: '#000000',
    fontFamily: 'PublicSans-Regular',
  },
  heading: {
    fontSize: 24,
    lineHeight: 30,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subHeading: {
    fontSize: 18,
    lineHeight: 26,
    textAlign: 'center',
  },
  body: {
    fontSize: 16,
  },
  title: {
    fontSize: 16,
    lineHeight: 22,
    fontFamily: 'PublicSans-Medium',
  },
  boldTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  subTitle: {
    fontSize: 14,
    lineHeight: 20,
    color: '#4A789C',
  },
  buttonText: {
    fontSize: 14, fontWeight: 'bold', color: '#FFF',
  }
});

export default React.memo(CustomText);
