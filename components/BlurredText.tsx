import React from 'react';
import { Text, StyleSheet } from 'react-native';

const BlurredText = ({ text }) => {
  return (
    <Text style={[styles.blurredText]}>
      {text}
    </Text>
  );
};

const styles = StyleSheet.create({
  blurredText: {
    color: 'transparent',
    textShadow: '0 0 5px rgba(0,0,0,0.5)',
    opacity: 0.9,
  },
});

export default BlurredText;