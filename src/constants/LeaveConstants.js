export const leaveStorageKeys = Object.freeze({
  leaveData: 'leave_data',
  leaveDataId: 'leave_data_id',
});

export const leaveTypeKeys = Object.freeze({
  casual: 'casual',
  ebl: 'ebl',
  others: 'others',
});

export const leaveTypeData = Object.freeze({
  [leaveTypeKeys.casual]: {
    key: leaveTypeKeys.casual,
    name: 'Casual Leaves',
    count: 10,
  },
  [leaveTypeKeys.ebl]: {
    key: leaveTypeKeys.ebl,
    name: 'EBL',
    count: 4,
  },
  [leaveTypeKeys.others]: {
    key: leaveTypeKeys.others,
    name: 'Others',
    count: 10,
  },
});

export const leaveTypes = Object.freeze([
  leaveTypeData[leaveTypeKeys.casual],
  leaveTypeData[leaveTypeKeys.ebl],
  leaveTypeData[leaveTypeKeys.others],
]);

export const leaveFieldKeys = Object.freeze({
  leaveType: 'leave_type',
  startDate: 'start_date',
  endDate: 'end_date',
  minimumEndDate: 'minimum_end_date',
  reason: 'reason',
});

export const leaveFields = Object.freeze([
  {
    key: leaveFieldKeys.leaveType,
    label: 'Leave Type',
    fieldType: 'radio',
  },
  {
    key: leaveFieldKeys.startDate,
    label: 'Start Date',
    fieldType: 'date',
  },
  {
    key: leaveFieldKeys.endDate,
    label: 'End Date',
    minimumDateKey: leaveFieldKeys.minimumEndDate,
    fieldType: 'date',
  },
  {
    key: leaveFieldKeys.reason,
    label: 'Reason',
    fieldType: 'input',
    fieldProps: {
      numberOfLines: 4,
      multiline: true,
      extraSpacedWidth: true,
    },
  },
]);
