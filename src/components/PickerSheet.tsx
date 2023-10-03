import { View, Text, StyleSheet, ViewStyle } from 'react-native'
import React, { ReactNode } from 'react'
import ActionSheet, { SheetProps } from 'react-native-actions-sheet'
import { useTheme } from '@react-navigation/native'

interface Props extends SheetProps {
    pickerComponent: ReactNode
    style?: ViewStyle
}

const PickerSheet = ({pickerComponent, sheetId, style}: Props) => {
  const {colors} = useTheme()

  return (
    <ActionSheet containerStyle={{...styles.baseStyle, ...style,backgroundColor: colors.card}} id={sheetId}>
        {pickerComponent}
    </ActionSheet>
  );
}

const styles = StyleSheet.create({
  baseStyle: {
    height: 200,
  }
})

export default PickerSheet;