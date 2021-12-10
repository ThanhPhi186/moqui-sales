import {Colors} from '../../../../styles';

const styles = {
  container: {
    flex: 1,
  },
  containerSearch: {
    flex: 1,
    backgroundColor: Colors.PRIMARY,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backTextWhite: {
    color: '#FFF',
  },
  rowFront: {
    alignItems: 'center',
    backgroundColor: '#CCC',
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    justifyContent: 'center',
    height: 50,
  },
  rowBack: {
    alignItems: 'center',
    backgroundColor: Colors.LIGHT_GREY,
    flex: 1,
  },
  backRightBtn: {
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    width: 75,
  },
  backRightBtnRight: {
    backgroundColor: Colors.LIGHT_GREY,
    right: 0,
  },
  viewStore: {
    backgroundColor: Colors.WHITE_SMOKE,
    borderBottomWidth: 1,
    borderBottomColor: Colors.BLACK,
  },
};

export default styles;
