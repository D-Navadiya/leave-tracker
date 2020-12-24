export const leaveStorageKeys = Object.freeze({
  leaveData: 'leave_data',
});

export const leaveTypeKeys = Object.freeze({
  casual: 'casual',
  ebl: 'ebl',
  others: 'others',
});

export const leaveTypes = Object.freeze([
  {
    key: leaveTypeKeys.casual,
    name: 'Casual Leaves',
    count: 10,
  },
  {
    key: leaveTypeKeys.ebl,
    name: 'EBL',
    count: 4,
  },
  { key: leaveTypeKeys.others, name: 'Others', count: 10 },
]);

export const leaveFieldKeys = Object.freeze({
  leaveType: 'leave_type',
  startDate: 'start_date',
  endDate: 'end_date',
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