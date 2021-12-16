import {Colors, Mixin} from '../../../styles';
import {FONT_SIZE_16} from '../../../styles/Typography';

const styles = {
  container: {
    flex: 1,
  },
  fab: {
    position: 'absolute',
    margin: 12,
    right: 8,
    bottom: 20,
    backgroundColor: Colors.PRIMARY,
  },
  containerSearch: {
    backgroundColor: Colors.PRIMARY,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
  },
  txtEmpty: {
    color: Colors.GRAY,
    fontSize: FONT_SIZE_16,
    textAlign: 'center',
    marginTop: Mixin.moderateSize(80),
  },
};

export default styles;
