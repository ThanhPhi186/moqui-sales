import {Colors, Mixin} from '../../../../styles';

const styles = {
  container: {
    flex: 1,
  },
  content: {
    marginHorizontal: Mixin.moderateSize(12),
  },
  containerItem: {
    backgroundColor: Colors.WHITE,
    paddingHorizontal: Mixin.moderateSize(12),
  },
  title: {
    fontWeight: 'bold',
    marginVertical: Mixin.moderateSize(12),
  },
};

export default styles;
