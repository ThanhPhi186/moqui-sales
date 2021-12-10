import {Colors, Mixin} from '../../../../styles';

const styles = {
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 12,
    ...Mixin.margin(12, 12, 0, 12),
  },
  txtTitle: {
    fontWeight: 'bold',
    marginBottom: 8,
  },
  containerItem: {
    flexDirection: 'row',
    paddingBottom: 12,
  },
  boxAmount: {
    borderWidth: 1,
    height: 50,
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: Colors.PRIMARY,
  },
  viewImg: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  img: {
    width: Mixin.moderateSize(52),
    height: Mixin.moderateSize(52),
    borderRadius: 8,
  },
  leftContent: {
    flex: 3,
  },
  nameProduct: {
    fontWeight: 'bold',
  },
  info: {
    fontStyle: 'italic',
  },
};
export default styles;
