import { leaveFieldKeys } from 'src/constants/LeaveConstants';

export default (state, action) => {
  const { type, fieldValue } = action;

  switch (type) {
    case leaveFieldKeys.leaveType:
      return {
        ...state,
        [leaveFieldKeys.leaveType]: fieldValue,
      };
    case leaveFieldKeys.startDate:
      return {
        ...state,
        [leaveFieldKeys.startDate]: fieldValue,
        [leaveFieldKeys.minimumEndDate]: fieldValue,
      };
    case leaveFieldKeys.endDate:
      return {
        ...state,
        [leaveFieldKeys.endDate]: fieldValue,
      };
    case leaveFieldKeys.reason:
      return {
        ...state,
        [leaveFieldKeys.reason]: fieldValue,
      };
    case 'EDIT_ITEM': {
      const { editItem } = action;
      return {
        [leaveFieldKeys.leaveType]: editItem[leaveFieldKeys.leaveType],
        [leaveFieldKeys.startDate]: editItem[leaveFieldKeys.startDate],
        [leaveFieldKeys.endDate]: editItem[leaveFieldKeys.endDate],
        [leaveFieldKeys.reason]: editItem[leaveFieldKeys.reason],
      };
    }
    default:
      return action.initialState || state;
  }
};
