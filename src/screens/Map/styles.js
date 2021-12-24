import {Colors, Mixin} from '../../styles';

const styles = {
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  autocomplete: {
    textInputContainer: {
      width: '100%',
      marginBottom: Mixin.moderateSize(10),
    },
    description: {
      fontWeight: 'bold',
      color: Colors.BLACK,
    },
    predefinedPlacesDescription: {
      color: Colors.PRIMARY,
    },
    textInput: {
      color: Colors.BLACK,
    },
  },
  marker: {
    flexDirection: 'row',
    backgroundColor: Colors.WHITE,
    alignItems: 'center',
    height: 32,
    width: '95%',
    position: 'absolute',
    top: 8,
    zIndex: 2,
    alignSelf: 'center',
    borderRadius: 8,
  },
};

export default styles;
