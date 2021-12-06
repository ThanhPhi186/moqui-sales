import React, {Component} from 'react';
import {StyleSheet, View, ImageBackground} from 'react-native';
import FastImage from 'react-native-fast-image';
import {Colors, Mixin} from '../../../styles';
import {device_width} from '../../../styles/Mixin';

export default class BannerBehind extends Component {
  render() {
    const {backGround, avatar} = this.props;
    return (
      <View style={styles.container}>
        <ImageBackground source={backGround} style={styles.backGround} />
        <FastImage source={avatar} style={styles.image} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: Mixin.moderateSize(200),
  },
  backGround: {
    width: '100%',
    height: '85%',
  },
  image: {
    width: device_width / 3.2,
    aspectRatio: 1 / 1,
    borderRadius: 100,
    alignSelf: 'center',
    position: 'absolute',
    backgroundColor: Colors.WHITE,
    bottom: 0,
  },
});
