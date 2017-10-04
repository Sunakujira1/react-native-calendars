import React, {Component} from 'react';
import {
  View
} from 'react-native';

import XDate from 'xdate';
import dateutils from '../dateutils';
import {xdateToData, parseDate} from '../interface';
import styleConstructor from './style';
import Day from './day';
import UnitDay from './unit-day';
import CalendarHeader from './header';
import shouldComponentUpdate from './updater';

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

class Calendar extends Component {
  constructor(props) {
    super(props);
    this.style = styleConstructor(this.props.theme);
    let currentMonth;
    if (props.current) {
      currentMonth = parseDate(props.current);
    } else {
      currentMonth = props.selected && props.selected[0] ? parseDate(props.selected[0]) : XDate();
    }
    this.state = {
      currentMonth
    };

    this.updateMonth = this.updateMonth.bind(this);
    this.addMonth = this.addMonth.bind(this);
    this.isSelected = this.isSelected.bind(this);
    this.shouldComponentUpdate = shouldComponentUpdate;
  }

  componentWillReceiveProps(nextProps) {
    const current= parseDate(nextProps.current);
    if (current && current.toString('yyyy MM') !== this.state.currentMonth.toString('yyyy MM')) {
      this.setState({
        currentMonth: current.clone()
      });
    }
  }

  updateMonth(day, doNotTriggerListeners) {
    if (day.toString('yyyy MM') === this.state.currentMonth.toString('yyyy MM')) {
      return;
    }
    this.setState({
      currentMonth: day.clone()
    }, () => {
      if (!doNotTriggerListeners) {
        const currMont = this.state.currentMonth.clone();
        if (this.props.onMonthChange) {
          this.props.onMonthChange(xdateToData(currMont));
        }
        if (this.props.onVisibleMonthsChange) {
          this.props.onVisibleMonthsChange([xdateToData(currMont)]);
        }
      }
    });
  }

  pressDay(day) {
    const minDate = parseDate(this.props.minDate);
    const maxDate = parseDate(this.props.maxDate);
    if (!(minDate && !dateutils.isGTE(day, minDate)) && !(maxDate && !dateutils.isLTE(day, maxDate))) {
      this.updateMonth(day);
      if (this.props.onDayPress) {
        this.props.onDayPress(xdateToData(day));
      }
    }
  }

  addMonth(count) {
    this.updateMonth(this.state.currentMonth.clone().addMonths(count, true));
  }

  isSelected(day) {
    let selectedDays = [];
    if (this.props.selected) {
      selectedDays = this.props.selected;
    }
    for (let i = 0; i < selectedDays.length; i++) {
      if (dateutils.sameDate(day, parseDate(selectedDays[i]))) {
        return true;
      }
    }
    return false;
  }

  renderDay(day, id) {
    const minDate = parseDate(this.props.minDate);
    const maxDate = parseDate(this.props.maxDate);
    let state = [];
    if (this.isSelected(day)) {
      state.push('selected');
    } else if ((minDate && !dateutils.isGTE(day, minDate)) || (maxDate && !dateutils.isLTE(day, maxDate))) {
      state.push('disabled');
    } else if (!dateutils.sameMonth(day, this.state.currentMonth)) {
      state.push('disabled');
    }
    if (dateutils.sameDate(day, XDate())) {
      state.push('today');
    }
    let dayComp;
    if (!dateutils.sameMonth(day, this.state.currentMonth) && this.props.hideExtraDays) {
      if (this.props.markingType === 'interactive') {
        dayComp = (<View key={id} style={{flex: 1}}/>);
      } else {
        dayComp = (<View key={id} style={{width: 32}}/>);
      }
    } else {
      const DayComp = this.props.markingType === 'interactive' ? UnitDay : Day;
      const markingExists = this.props.confirmedDates ? true : false;
      let dayEmojis = this.getDateEmojis(day);
      let firstEmoji = undefined;
      let secondEmoji = undefined;
      if (dayEmojis) {
        const shuffledEmojis = shuffle(dayEmojis);
        firstEmoji = dayEmojis[0];
        if (dayEmojis.length > 1) secondEmoji = dayEmojis[1];
      }
      dayComp = (
        <DayComp
            key={id}
            state={state}
            theme={this.props.theme}
            onPress={this.pressDay.bind(this, day)}
            confirmedMarked={this.getDateConfirmedMarking(day)}
            markingExists={markingExists}
            firstEmoji={firstEmoji}
            secondEmoji={secondEmoji}
          >
            {day.getDate()}
          </DayComp>
        );
    }
    return dayComp;
  }

  getDateConfirmedMarking(day) {
    if (!this.props.confirmedDates) {
      return false;
    }
    const dates = this.props.confirmedDates[day.toString('yyyy-MM-dd')] || [];
    if (dates.length) {
      return dates;
    } else {
      return false;
    }
  }

  getDateEmojis(day) {
    if (!this.props.dates) {
      return false;
    }
    const dates = this.props.dates[day.toString('yyyy-MM-dd')] || [];
    if (dates.length) {
      return dates;
    } else {
      return false;
    }
  }

  renderWeek(days, id) {
    const week = [];
    days.forEach((day, id2) => {
      week.push(this.renderDay(day, id2));
    }, this);
    return (<View style={this.style.week} key={id}>{week}</View>);
  }

  render() {
    const days = dateutils.page(this.state.currentMonth, this.props.firstDay);
    const weeks = [];
    while (days.length) {
      weeks.push(this.renderWeek(days.splice(0, 7), weeks.length));
    }
    let indicator;
    const current = parseDate(this.props.current);
    if (current) {
      const lastMonthOfDay = current.clone().addMonths(1, true).setDate(1).addDays(-1).toString('yyyy-MM-dd');
      if (this.props.displayLoadingIndicator &&
          !(this.props.proposedDates && this.props.proposedDates[lastMonthOfDay])) {
        indicator = true;
      }
    }
    return (
      <View style={[this.style.container, this.props.style]}>
        <CalendarHeader
          theme={this.props.theme}
          hideArrows={this.props.hideArrows}
          month={this.state.currentMonth}
          addMonth={this.addMonth}
          showIndicator={indicator}
          firstDay={this.props.firstDay}
        />
        {weeks}
      </View>);
  }
}

export default Calendar;
