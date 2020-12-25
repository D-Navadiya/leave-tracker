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
    default:
      return action.initialState || state;
  }
};
