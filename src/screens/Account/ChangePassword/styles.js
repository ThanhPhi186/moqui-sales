import {Colors, Mixin} from '../../../styles';

const styles = {
  container: {
    flex: 1,
  },
  content: {
    ...Mixin.margin(24, 12, 0, 12),
  },
  containerInput: {
    backgroundColor: Colors.WHITE_SMOKE,
    marginBottom: 12,
  },
  btn: {
    backgroundColor: Colors.PRIMARY,
    marginTop: Mixin.moderateSize(24),
    width: '100%',
  },
};

export default styles;
