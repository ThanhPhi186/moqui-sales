import {moderateScale} from 'react-native-size-matters';
import {Dimensions} from 'react-native';
import {getStatusBarHeight} from '../helpers/iphoneXHelper';

export function moderateSize(size) {
  return moderateScale(size);
}
export const device_height = Dimensions.get('window').height;
export const device_width = Dimensions.get('window').width;
export const statusBar = getStatusBarHeight(true);

function dimensions(top, right = top, bottom = top, left = right, property) {
  let styles = {};

  styles[`${property}Top`] = moderateSize(top);
  styles[`${property}Right`] = moderateSize(right);
  styles[`${property}Bottom`] = moderateSize(bottom);
  styles[`${property}Left`] = moderateSize(left);

  return styles;
}

export function margin(top, right, bottom, left) {
  return dimensions(top, right, bottom, left, 'margin');
}

export function padding(top, right, bottom, left) {
  return dimensions(top, right, bottom, left, 'padding');
}

export function shadow(
  color,
  offset = {height: moderateSize(2), width: moderateSize(2)},
  radius = 8,
  opacity = 0.2,
) {
  return {
    shadowColor: color,
    shadowOffset: offset,
    shadowOpacity: opacity,
    shadowRadius: radius,
    elevation: radius,
  };
}
