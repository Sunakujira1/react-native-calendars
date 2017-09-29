import {parseDate} from '../interface';

export default function shouldComponentUpdate(nextProps, nextState) {
  let shouldUpdate = (nextProps.selected || []).reduce((prev, next, i) => {
    const currentSelected = (this.props.selected || [])[i];
    if (!currentSelected || !next || parseDate(currentSelected).getTime() !== parseDate(next).getTime()) {
      return {
        update: true,
        field: 'selected'
      };
    }
    return prev;
  }, {update: false});

  shouldUpdate = (Object.keys(nextProps.dates) || []).reduce((prev, next, i) => {
    const currentConfirmedDate = (Object.keys(this.props.dates) || [])[i];

    if (!currentConfirmedDate
      || !next
      || parseDate(currentConfirmedDate).getTime() !== parseDate(next).getTime()
      || this.props.dates[currentConfirmedDate].length !== nextProps.dates[next].length
      || this.props.dates[currentConfirmedDate].some((emoji, index) => {
        this.props.dates[currentConfirmedDate][index] !== nextProps.dates[next][index];
      })
    ) {
      return {
        update: true,
        field: 'selected'
      };
    }
    return prev;
  }, shouldUpdate);

  shouldUpdate = ['markedDates', 'hideExtraDays'].reduce((prev, next) => {
    if (!prev.update && nextProps[next] !== this.props[next]) {
      return {
        update: true,
        field: next
      };
    }
    return prev;
  }, shouldUpdate);

  shouldUpdate = ['minDate', 'maxDate', 'current'].reduce((prev, next) => {
    const prevDate = parseDate(this.props[next]);
    const nextDate = parseDate(nextProps[next]);
    if (prev.update) {
      return prev;
    } else if (prevDate !== nextDate) {
      if (prevDate && nextDate && prevDate.getTime() === nextDate.getTime()) {
        return prev;
      } else {
        return {
          update: true,
          field: next
        };
      }
    }
    return prev;
  }, shouldUpdate);

  if (nextState.currentMonth !== this.state.currentMonth) {
    shouldUpdate = {
      update: true,
      field: 'current'
    };
  }

  return shouldUpdate.update;
}
