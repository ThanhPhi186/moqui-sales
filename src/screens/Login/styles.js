import {StyleSheet} from 'react-native';
import {Colors, Mixin} from '../../styles';
import {FONT_SIZE_40} from '../../styles/Typography';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
    alignItems: 'center',
    // justifyContent: 'center',
    paddingHorizontal: 20,
  },
  txtTile: {
    color: Colors.LOGO_BACKGROUND_COLOR,
    fontSize: FONT_SIZE_40,
    fontWeight: 'bold',
    marginBottom: Mixin.moderateSize(20),
    // position: 'absolute',
  },
  txtInput: {
    width: '100%',
    height: Mixin.moderateSize(40),
    marginBottom: Mixin.moderateSize(8),
    borderWidth: 0.5,
    borderColor: 'gray',
    paddingHorizontal: 8,
    borderRadius: 8,
    justifyContent: 'center',
  },
  btn: {
    width: '100%',
    height: Mixin.moderateSize(50),
    backgroundColor: Colors.PRIMARY,
    justifyContent: 'center',
    borderRadius: 8,
    marginBottom: Mixin.moderateSize(20),
    marginTop: Mixin.moderateSize(32),
  },
  txtCompanyChange: {
    color: Colors.BUTTON_HIGTH,
    fontStyle: 'italic',
    textDecorationLine: 'underline',
  },
  txtLogin: {
    color: Colors.BACKGROUND_COLOR,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  containerInput: {
    backgroundColor: Colors.WHITE,
    marginBottom: 16,
    height: Mixin.moderateSize(52),
  },
});

export default styles;
