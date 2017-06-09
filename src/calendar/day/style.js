import {StyleSheet, Platform} from 'react-native';
import * as defaultStyle from '../../style';

export default function styleConstructor(theme={}) {
  const appStyle = {...defaultStyle, ...theme};
  return StyleSheet.create({
    base: {
      flex: 1,
      height: 40,
      alignItems: 'flex-start',
      borderWidth: 0.5,
      borderColor: 'lightgrey',
      backgroundColor: appStyle.weekBackground,
    },
    text: {
      marginTop: 4,
      marginLeft: 4,
      fontSize: 12,
      fontWeight: '300',
      color: appStyle.dayTextColor,
      backgroundColor: 'rgba(255, 255, 255, 0)'
    },
    alignedText: {
      marginTop: Platform.OS === 'android' ? 4 : 6
    },
    selected: {
      backgroundColor: appStyle.selectedDayBackgroundColor,
      borderRadius: 16
    },
    todayText: {
      color: appStyle.todayTextColor,
    },
    selectedText: {
      color: appStyle.selectedDayTextColor
    },
    disabledText: {
      color: appStyle.textDisabledColor
    },
    dot: {
      width: 8,
      height: 8,
      marginTop: 1,
      borderRadius: 4,
      opacity: 0,
      marginLeft: 4,
    },
    imageDot: {
      width: 12,
      height: 12,
      marginLeft: 4,
    },
    confirmedDot: {
      ...Platform.select({
        ios: {
          tintColor: appStyle.confirmedDotColor,
        },
        android: {
          tintColor: appStyle.confirmedDotColor,
        },
      }),
    },
    selectedDot: {
      backgroundColor: appStyle.selectedDotColor
    }
  });
}
