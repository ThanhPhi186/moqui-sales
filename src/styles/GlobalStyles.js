import {Colors, Mixin} from '.';
import {getBottomSpace} from '../helpers/iphoneXHelper';
import {FONT_SIZE_16, FONT_SIZE_20} from './Typography';

export const NAVIGATION_BOTTOM_TABS_HEIGHT = 84;
export const HEIGHT_MIDDLE_HOME_BTN = 60;

export const container = {
  flex: 1,
  backgroundColor: Colors.BACKGROUND_COLOR,
};

export const containerCenter = {
  flex: 1,
  backgroundColor: Colors.WHITE,
  alignItems: 'center',
  justifyContent: 'center',
};

export const viewRow = {
  flexDirection: 'row',
  alignItems: 'center',
};

export const rowSpaceBetween = {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
};

export const titleBold = {
  fontSize: FONT_SIZE_16,
  fontWeight: 'bold',
};

export const fontWeight600 = {
  fontWeight: '600',
};

export const fontWeightBold = {
  fontWeight: 'bold',
};
