import {Colors, Mixin, Typography} from '../../../styles';

const styles = {
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
  content: {
    paddingHorizontal: Mixin.moderateSize(16),
    flex: 1,
    marginVertical: Mixin.moderateSize(20),
  },
  btnUpLoad: {
    width: '100%',
    height: 50,
    borderRadius: 12,
    marginTop: 8,
    justifyContent: 'center',
  },
  txtInput: {
    borderWidth: 1,
    borderColor: 'gray',
    marginTop: 8,
    height: Mixin.moderateSize(40),
    borderRadius: Mixin.moderateSize(4),
    paddingHorizontal: 8,
    fontSize: Typography.FONT_SIZE_14,
  },
};

export default styles;
