import { View, Text } from 'react-native'
import React, { ReactNode } from 'react'
import ActionSheet, { SheetProps } from 'react-native-actions-sheet'

interface Props extends SheetProps {
    pickerComponent: ReactNode
}

const PickerSheet = ({pickerComponent, sheetId}: Props) => {
  return (
    <ActionSheet containerStyle={{height: 200}} id={sheetId}>
        {pickerComponent}
    </ActionSheet>
  );
}

export default PickerSheet;