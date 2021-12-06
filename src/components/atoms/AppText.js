import React from 'react';
import {View, Text} from 'react-native';
import {Colors, Mixin, Typography} from '../../styles';

const AppText = props => {
  const {containerStyle, style, children, title} = props;
  return (
    <View style={containerStyle}>
      <Text
        {...props}
        allowFontScaling={false}
        textBreakStrategy={'simple'}
        style={[
          {fontSize: title ? Typography.FONT_SIZE_18 : Typography.FONT_SIZE_12},
          styles.text,
          style,
        ]}>
        {children}
      </Text>
    </View>
  );
};

const styles = {
  container: {
    ...Mixin.padding(2),
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: Colors.BLACK,
  },
};
export default AppText;
