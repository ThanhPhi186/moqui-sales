import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {AppText} from '../atoms';
import {Mixin, Colors} from '../../styles';
import {FONT_SIZE_14} from '../../styles/Typography';

const Button = props => {
  const {containerStyle, titleColor, title, titleStyle, disabled} = props;
  return (
    <TouchableOpacity
      {...props}
      disabled={disabled}
      style={[styles.container, containerStyle]}>
      <AppText
        style={[
          styles.title,
          {
            color: disabled
              ? Colors.GRAY
              : titleColor
              ? titleColor
              : Colors.WHITE,
          },
          titleStyle,
        ]}>
        {title}
      </AppText>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    height: Mixin.moderateSize(50),
    borderRadius: Mixin.moderateSize(12),
    backgroundColor: Colors.PRIMARY,
    justifyContent: 'center',
    paddingHorizontal: Mixin.moderateSize(12),
    marginBottom: Mixin.moderateSize(8),
    width: '90%',
  },
  title: {
    fontWeight: '600',
    textAlign: 'center',
    fontSize: FONT_SIZE_14,
  },
});
export default Button;
