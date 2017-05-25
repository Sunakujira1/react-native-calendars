import {StyleSheet} from 'react-native';
import * as defaultStyle from '../style';

export default function getStyle(theme={}) {
  const appStyle = {...defaultStyle, ...theme};
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: appStyle.calendarBackground
    },
    week: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    dayHeader: {
      marginTop: 3,
      marginBottom: 8,
      width: 32,
      textAlign: 'center',
      paddingTop: 0,
      paddingBottom: 10,
      fontSize: 12,
      color: appStyle.textSectionTitleColor
    }
  });
}
