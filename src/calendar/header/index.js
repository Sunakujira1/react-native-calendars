import React, {Component} from 'react';
import {ActivityIndicator} from 'react-native';
import {
  View,
  Text,
  TouchableOpacity,
  Image
} from 'react-native';
import styleConstructor from './style';
import {weekDayNames} from '../../dateutils';

class CalendarHeader extends Component {
  constructor(props) {
    super(props);
    this.style = styleConstructor(props.theme);
    this.addMonth = this.addMonth.bind(this);
    this.substractMonth = this.substractMonth.bind(this);
  }

  addMonth() {
    this.props.addMonth(1);
  }

  substractMonth() {
    this.props.addMonth(-1);
  }

  shouldComponentUpdate(nextProps) {
    if (nextProps.month.toString('yyyy MM') !== this.props.month.toString('yyyy MM')) {
      return true;
    }
    if (nextProps.showIndicator !== this.props.showIndicator) {
      return true;
    }
    return false;
  }

  render() {
    let leftArrow = (<View/>);
    let rightArrow = (<View/>);
    let weekDaysNames = weekDayNames(this.props.firstDay);
    if (!this.props.hideArrows) {
      leftArrow = (
        <TouchableOpacity onPress={this.substractMonth} style={this.style.arrow}>
          <Image source={require('../img/previous.png')} style={this.style.arrowImage}/></TouchableOpacity>
      );
      rightArrow = (
        <TouchableOpacity onPress={this.addMonth} style={this.style.arrow}>
          <Image source={require('../img/next.png')} style={this.style.arrowImage}/></TouchableOpacity>
      );
    }
    let indicator;
    if (this.props.showIndicator) {
      indicator = (<ActivityIndicator/>);
    }
    return (
      <View>
        <View style={this.style.header}>
            {leftArrow}
            <Text style={this.style.monthText}>{this.props.month.toString('MMMM yyyy')}</Text>
            {indicator}
            {rightArrow}
        </View>
        <View style={this.style.week}>
          {weekDaysNames.map((day) => (
            <Text key={day} style={this.style.dayHeader}>{day}</Text>
          ))}
        </View>
      </View>
    );
  }
}

export default CalendarHeader;
