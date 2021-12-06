import {Colors, Mixin} from '../../../styles';
import {FONT_SIZE_20} from '../../../styles/Typography';

const styles = {
  contentContainer: {
    flex: 1,
  },
  content: {
    borderRadius: 12,
    ...Mixin.padding(12, 20, 12, 20),
    ...Mixin.margin(12),
    backgroundColor: Colors.WHITE,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  viewProductName: {
    borderBottomWidth: 1,
    paddingVertical: Mixin.moderateSize(8),
    borderColor: Colors.WHITE_SMOKE,
  },
  productName: {
    fontWeight: 'bold',
  },
  info: {
    fontSize: FONT_SIZE_20,
    color: Colors.GRAY,
  },
  viewInfo: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
};

export default styles;
