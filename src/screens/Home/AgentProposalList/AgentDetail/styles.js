import {Colors, Mixin} from '../../../../styles';

const styles = {
  container: {
    flex: 1,
  },
  content: {
    backgroundColor: 'white',
    alignItems: 'center',
    ...Mixin.margin(12),
    ...Mixin.padding(12, 12, 0, 12),
  },
  img: {
    width: Mixin.moderateSize(52),
    height: Mixin.moderateSize(52),
    borderRadius: Mixin.moderateSize(8),
    marginBottom: Mixin.moderateSize(12),
  },
  status: {
    fontWeight: 'bold',
    color: Colors.PRIMARY,
  },
};

export default styles;
