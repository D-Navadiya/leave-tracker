import { leaveTypeKeys, leaveFieldKeys } from 'src/constants/LeaveConstants';

export default Object.freeze({
  initialState: {
    [leaveFieldKeys.leaveType]: leaveTypeKeys.casual,
    [leaveFieldKeys.startDate]: new Date(),
    [leaveFieldKeys.endDate]: new Date(),
    [leaveFieldKeys.minimumEndDate]: new Date(),
    [leaveFieldKeys.reason]: '',
  },
});
