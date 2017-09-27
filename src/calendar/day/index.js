import React, {Component} from 'react';
import {
  TouchableOpacity,
  Text,
  View,
  Image,
} from 'react-native';

import styleConstructor from './style';

class Day extends Component {
  constructor(props) {
    super(props);
    this.style = styleConstructor(props.theme);
  }

  static propTypes = {
    state: React.PropTypes.arrayOf(React.PropTypes.oneOf(['selected', 'disabled', 'today', '']))
  };

  shouldComponentUpdate(nextProps) {
    return ['state', 'children', 'marked', 'onPress', 'markingExists'].reduce((prev, next) => {
      if (prev || nextProps[next] !== this.props[next]) {
        return true;
      }
      return prev;
    }, false);
  }

  render() {
    const containerStyle = [this.style.base];
    const textStyle = [this.style.text];
    const confirmedDotStyle = [this.style.imageDot];
    const subContainerStyle = [this.style.subContainer];
    let confirmedDot;
    if (this.props.confirmedMarked) {
      confirmedDotStyle.push(this.style.confirmedDot);
      subContainerStyle.push({ justifyContent: 'space-between' });
      confirmedDot = (<Image source={require('../img/checked.png')} style={confirmedDotStyle}/>);
    }
    if (!this.props.markingExists) {
      textStyle.push(this.style.alignedText);
    }

    if (this.props.state.includes('selected')) {
      containerStyle.push(this.style.selected);
      textStyle.push(this.style.selectedText);
    } else if (this.props.state.includes('disabled')) {
      textStyle.push(this.style.disabledText);
    }
    if (this.props.state.includes('today')) {
      textStyle.push(this.style.todayText);
    }
    if (this.props.state.includes('selected') &&
      this.props.state.includes('today')
    ) {
      textStyle.push(this.style.todaySelectedText);
    }
    return (
      <TouchableOpacity style={containerStyle} onPress={this.props.onPress}>
        <View style={subContainerStyle}>
          <Text style={textStyle}>{this.props.children}</Text>
          {confirmedDot}
        </View>
        <View style={{flexDirection: 'row', paddingLeft: 4}}>
          <Text style={{ fontSize: 12, backgroundColor: 'transparent' }}>
            {this.props.firstEmoji}
            {this.props.secondEmoji}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
}

export default Day;
