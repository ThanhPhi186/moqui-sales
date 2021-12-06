import {Colors, Mixin} from '../../../styles';
import {FONT_SIZE_14, FONT_SIZE_16} from '../../../styles/Typography';

const styles = {
  containerItem: {
    flexDirection: 'row',
    marginTop: 12,
    // backgroundColor: 'white',
    // shadowColor: '#000',
    // shadowOffset: {
    //   width: 0,
    //   height: 3,
    // },
    // shadowOpacity: 0.27,
    // shadowRadius: 4.65,
    // elevation: 6,
  },
  icon: {width: 64, height: 64},
  boxIcon: {
    width: 64,
    height: 64,
    borderWidth: 0.5,
    borderColor: '#EEEEEE',
    marginRight: 20,
    borderRadius: 64 / 2,
  },

  boxName: {width: 230},
  textName: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: 'bold',
  },
  textPrice: {
    color: 'gray',
    marginTop: 8,
  },
  textQuatity: {
    color: '#555555',
    fontSize: 14,
    fontWeight: 'bold',
  },
  boxPrice: {justifyContent: 'center', alignItems: 'center'},
  boxAgent: {
    backgroundColor: '#0187E0',
    borderRadius: 20,
    width: 72,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 2,
    position: 'absolute',
    bottom: 0,
  },
  textAgent: {fontSize: 10, color: Colors.WHITE},
  left: {
    flex: 5,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.WHITE,
    borderBottomRightRadius: Mixin.moderateSize(8),
    borderTopRightRadius: Mixin.moderateSize(8),
    paddingHorizontal: 12,
  },
  right: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: Colors.WHITE,
    aspectRatio: 1,
    padding: Mixin.moderateSize(16),
    borderRadius: Mixin.moderateSize(8),
    justifyContent: 'center',
  },
  value: {
    flex: 1,
    width: '100%',
    backgroundColor: '#0187E0',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    padding: 10,
    borderRadius: 5,
  },
  textType: {
    fontSize: 14,
    fontWeight: 'normal',
    color: Colors.WHITE,
  },
  textValue: {
    fontSize: FONT_SIZE_14,
    fontWeight: 'bold',
    color: Colors.GREEN_1,
  },
  textTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    marginVertical: 2,
  },
  txtEmpty: {
    color: Colors.GRAY,
    fontSize: FONT_SIZE_16,
    textAlign: 'center',
    marginTop: Mixin.moderateSize(80),
  },
};

export default styles;
