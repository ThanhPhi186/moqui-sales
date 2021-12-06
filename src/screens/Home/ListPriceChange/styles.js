import {StyleSheet} from 'react-native';
import {Colors, Mixin} from '../../../styles';
import {FONT_SIZE_20} from '../../../styles/Typography';

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
  },
  containerChooseDate: {
    flexDirection: 'row',
    padding: 12,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  line: {
    width: 20,
    backgroundColor: Colors.LIGHT_GREY,
    height: 1,
    alignSelf: 'center',
  },
  selectDate: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.WHITE,
    marginTop: 0,
    paddingBottom: Mixin.moderateSize(4),
  },
  viewSelect: {
    ...Mixin.padding(12),
    backgroundColor: Colors.WHITE,
  },
  containerItem: {
    backgroundColor: Colors.WHITE,
    ...Mixin.margin(12, 12, 0, 12),
    ...Mixin.padding(12),
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  nameProduct: {
    fontWeight: 'bold',
  },
  txtInfo: {
    fontStyle: 'italic',
    paddingTop: Mixin.moderateSize(8),
  },
  viewRow: {
    flexDirection: 'row',
  },
  txtInfoChange: {
    textDecorationLine: 'line-through',
  },
  txtEmpty: {
    color: Colors.GRAY,
    fontSize: FONT_SIZE_20,
    textAlign: 'center',
    marginTop: '50%',
  },
});

export default styles;
