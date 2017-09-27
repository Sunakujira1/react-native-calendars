import {StyleSheet, Platform} from 'react-native';
import * as defaultStyle from '../../style';

export default function styleConstructor(theme={}) {
  const appStyle = {...defaultStyle, ...theme};
  return StyleSheet.create({
    base: {
      flex: 1,
      height: 40,
      alignItems: 'flex-start',
      borderWidth: StyleSheet.hairlineWidth,
      borderColor: 'lightgrey',
      backgroundColor: appStyle.weekBackground,
    },
    text: {
      fontSize: 12,
      fontWeight: '300',
      color: appStyle.dayTextColor,
      backgroundColor: 'rgba(255, 255, 255, 0)',
      textAlign: 'center',
      paddingTop: Platform.OS === 'android' ? 1 : 3,
      height: 20,
      width: 20,
      marginTop: 3 - ( (Platform.OS === 'android' ? 0 : 2)),
      marginLeft: 1,
      marginBottom: -3,
    },
    alignedText: {
      marginTop: Platform.OS === 'android' ? 4 : 6
    },
    selected: {
      backgroundColor: appStyle.selectedDayBackgroundColor,
    },
    todayText: {
      fontWeight: 'bold',
      color: appStyle.todayTextColor,
    },
    selectedText: {
      color: appStyle.selectedDayTextColor,
      paddingTop: Platform.OS === 'android' ? 1 : 3,
      height: 20,
      width: 20,
      borderWidth: 1,
      borderRadius: 10,
      borderColor: appStyle.selectedDayShadeColor,
      backgroundColor: appStyle.selectedDayShadeColor,
      overflow: 'hidden',
      marginTop: 3 - ( (Platform.OS === 'android' ? 0 : 2)),
      marginLeft: 1,
      marginBottom: -3,
    },
    todaySelectedText: {
      fontWeight: 'bold',
      color: appStyle.todaySelectedTextColor,
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
      margin: 4,
      width: 12,
      height: 12,
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
    },
    subContainer: {
      flexDirection: 'row',
      alignSelf: 'stretch',
      justifyContent: 'flex-start',
      zIndex: 10,
    }
  });
}
