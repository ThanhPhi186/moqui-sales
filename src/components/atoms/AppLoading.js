import React from 'react';
import {ActivityIndicator} from 'react-native';
import Modal from 'react-native-modal';
import {Colors, Mixin} from '../../styles';
import {statusBar} from '../../styles/Mixin';

const AppLoading = props => {
  const {isVisible} = props;

  return (
    <Modal
      {...props}
      isVisible={isVisible}
      backdropOpacity={0.3}
      renderToHardwareTextureAndroid
      animationIn="zoomIn"
      animationOut="zoomOut"
      hideModalContentWhileAnimating>
      <ActivityIndicator
        style={styles.indicator}
        size="large"
        color={Colors.WHITE}
      />
    </Modal>
  );
};

const styles = {
  container: {
    flex: 1,
    height: Mixin.device_height + statusBar,
    width: Mixin.device_width,
    justifyContent: 'center',
  },
  indicator: {
    alignSelf: 'center',
  },
};

export default AppLoading;
