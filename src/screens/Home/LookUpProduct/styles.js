import {Colors, Mixin} from '../../../styles';
import {FONT_SIZE_20} from '../../../styles/Typography';

const styles = {
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
  content: {
    ...Mixin.padding(12, 20, 0, 20),
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
