import React, {useState} from 'react';
import FastImage from 'react-native-fast-image';
import {View, ActivityIndicator} from 'react-native';

const AppImage = props => {
  const [loading, setLoading] = useState(true);

  const {
    style,
    resizeMode = FastImage.resizeMode.contain,
    local = false,
    imageStyle = {},
  } = props;

  if (local) {
    return (
      <FastImage
        style={style}
        resizeMode={resizeMode}
        onLoad={() => setLoading(false)}
        {...props}
      />
    );
  }

  return (
    <View style={[{justifyContent: 'center', alignItems: 'center'}, style]}>
      <FastImage
        style={imageStyle}
        resizeMode={resizeMode}
        onLoad={() => setLoading(false)}
        onLoadStart={() => setLoading(false)}
        {...props}
      />
      {loading && (
        <View
          style={[
            {
              position: 'absolute',
              zIndex: 3,
              backgroundColor: 'rgba(0,0,0,0.3)',
              minHeight: 30,
              minWidth: 30,
              justifyContent: 'center',
              alignItems: 'center',
            },
            style,
          ]}>
          <ActivityIndicator
            color="#fff"
            style={{zIndex: 5}}
            animating={true}
          />
        </View>
      )}
    </View>
  );
};

export default AppImage;
