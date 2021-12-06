import {trans} from '../utils';

export const removeDiacritics = txt => {
  return txt
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
};

export const handleStatus = status => {
  switch (status) {
    case 'ORDER_APPROVED': // Đã duyệt
      return trans('approved');
    case 'ORDER_CANCELLED': // Đã huỷ
      return trans('canceled');
    case 'ORDER_COMPLETED': // Đã hoàn thành
      return trans('completed');
    case 'ORDER_CREATED': // Đã tạo
      return trans('created');
    case 'ORDER_HOLD': // Đã giữ
      return trans('hasKept');
    case 'ORDER_IN_TRANSIT': // Đang chuyển
      return trans('moving');
    case 'ORDER_PROCESSING': // Processing
      return trans('processing');
    case 'ORDER_REJECTED': // Đã bị từ chối
      return trans('wasRejected');
    case 'ORDER_SADAPPROVED': // Sales Admin approved
      return trans('salesAdminApproved');
    case 'ORDER_DELIVERED': // Đã giao hàng
      return trans('delivered');
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
