import {Colors} from '../styles';
import {trans} from '../utils';

export const removeDiacritics = txt => {
  return txt
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
};

export const handleStatus = status => {
  switch (status) {
    case 'OrderOpen': // Mở đơn
      return 'Mới tạo';
    case 'OrderCompleted': // Đã hoàn thành
      return 'Đã hoàn thành';
    case 'OrderHold': // Giữ đơn
      return 'Đã giữ';
    case 'OrderBeingChanged': // Giữ đơn
      return 'Đang thay đổi';
    case 'OrderCancelled': // Huỷ đơn
      return 'Đã huỷ';
    case 'OrderApproved': // Huỷ đơn
      return 'Đã duyệt';
    case 'OrderPlaced': // Huỷ đơn
      return 'Do khách hàng đặt';
    case 'OrderProcessing': // Huỷ đơn
      return 'Đang xử lý';
  }
};

export const renderColorStatus = status => {
  switch (status) {
    case 'OrderBeingChanged':
      return Colors.BLUE_CODE.blue600;
    case 'OrderCancelled':
      return Colors.RED_CODE.red500;
    case 'OrderCompleted':
      return Colors.GREEN_1;
    case 'OrderOpen':
      return Colors.ORANGE_CODE.orange600;
    case 'OrderApproved':
      return Colors.GREEN_2; // Processing
    case 'OrderPlaced':
      return trans('wasRejected'); // Đã bị từ chối
    case 'OrderProcessing':
      return trans('salesAdminApproved'); // Sales Admin approved
    case 'OrderHold':
      return Colors.CYAN_CODE.cyan600;
  }
};

// function compareObj(objA, objB) {
//   if (Object.keys(objA).length != Object.keys(objb).length) {
//     return false;
//   }

//   for (const key in objA) {
//     if (objA[key] != objB[key]) {
//       return false;
//     }
//   }

//   return true;
// }

// const a = array.filter((item, index) => {
//   for (let i = 0; i < array.length; i++) {
//     const itemToCompare = array[i];
//     if (compareObj(item, itemToCompare) && index != i) {
//       return false;
//     }
//     return true;
//   }
// });
