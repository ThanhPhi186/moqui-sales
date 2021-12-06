import {Colors, Mixin} from '../../../styles';
import {FONT_SIZE_16, LINE_HEIGHT} from '../../../styles/Typography';

const styles = {
  container: {
    flex: 1,
  },
  btn: {
    backgroundColor: Colors.WHITE,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    height: Mixin.moderateSize(60),
    justifyContent: 'center',
    paddingHorizontal: Mixin.moderateSize(12),
    marginTop: Mixin.moderateSize(16),
    borderRadius: Mixin.moderateSize(12),
  },
  storeName: {
    fontWeight: 'bold',
    lineHeight: LINE_HEIGHT,
  },
  storeCode: {
    fontStyle: 'italic',
    lineHeight: LINE_HEIGHT,
  },
  btnActive: {
    height: Mixin.moderateSize(50),
    backgroundColor: Colors.PRIMARY,
    justifyContent: 'center',
    paddingHorizontal: Mixin.moderateSize(12),
    marginTop: Mixin.moderateSize(8),
  },
  txtEmpty: {
    color: Colors.GRAY,
    fontSize: FONT_SIZE_16,
    textAlign: 'center',
    marginTop: Mixin.moderateSize(80),
  },
};

export default styles;
