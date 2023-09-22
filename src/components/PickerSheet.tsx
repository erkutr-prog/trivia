import { View, Text } from 'react-native'
import React, { ReactNode } from 'react'
import ActionSheet, { SheetProps } from 'react-native-actions-sheet'
import { useTheme } from '@react-navigation/native'

interface Props extends SheetProps {
    pickerComponent: ReactNode
}

const PickerSheet = ({pickerComponent, sheetId}: Props) => {
  const {colors} = useTheme()

  return (
    <ActionSheet containerStyle={{height: 200, backgroundColor: colors.card}} id={sheetId}>
        {pickerComponent}
    </ActionSheet>
  );
}

export default PickerSheet;