import React from 'react';
import Modal from 'react-native-modal';
import {View} from 'react-native';
import IconMaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Colors, Mixin} from '../../styles';
import Button from './Button';
import {AppText} from '../atoms';
import {FONT_SIZE_18} from '../../styles/Typography';
import {trans} from '../../utils';

// interface AppModal extends ModalProps {
//   title: string;
//   buttonTitle: string;
//   onPressClose: () => {};
//   onPressButton: () => {};
// }
const AppDialog = props => {
  const {content, titleClose, titleConfirm, onPressConfirm, onPressClose} =
    props;

  return (
    <Modal onBackdropPress={onPressClose} {...props}>
      <View style={styles.modal}>
        <AppText style={styles.title}>{trans('noti')}</AppText>
        <AppText>{content}</AppText>
        <View style={styles.viewBtn}>
          <Button
            onPress={onPressClose}
            containerStyle={styles.btnCustom}
            titleColor={Colors.PRIMARY}
            title={(titleClose || trans('close')).toUpperCase()}
          />
          {onPressConfirm && (
            <Button
              onPress={onPressConfirm}
              containerStyle={styles.btnCustom}
              title={titleConfirm || trans('continue').toUpperCase()}
              titleColor={Colors.PRIMARY}
            />
          )}
        </View>
      </View>
    </Modal>
  );
};
export default AppDialog;

const styles = {
  title: {
    fontSize: FONT_SIZE_18,
    fontWeight: '600',
  },
  modal: {
    height: Mixin.device_height * 0.18,
    width: Mixin.device_width * 0.9,
    backgroundColor: Colors.WHITE,
    borderRadius: Mixin.moderateSize(8),
    justifyContent: 'space-between',
    ...Mixin.padding(16, 16, 8, 16),
  },
  viewBtn: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  btnCustom: {
    backgroundColor: Colors.WHITE,
    width: 'auto',
    height: 'auto',
    marginLeft: Mixin.moderateSize(12),
    alignSelf: 'center',
  },
};
