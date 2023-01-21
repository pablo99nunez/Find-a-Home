import React, { useCallback, useMemo, useRef } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import BottomSheet, { BottomSheetTextInput } from '@gorhom/bottom-sheet';
import { ButtonYellow } from '../Buttons/Buttons';

const BottomView = () => {
  // ref
  const bottomSheetRef = useRef(null);

  // variables
  const snapPoints = useMemo(() => ['50%', '100%'], []);

  // callbacks
  const handleSheetChanges = useCallback((index) => {
    console.log('handleSheetChanges', index);
  }, []);

  // renders
  return (
      <View>
        <BottomSheetTextInput style={styles.input} multiline/>
        <ButtonYellow text='Enviar Solicitud' onPress={()=> alert('solicitud enviada')}/>
      </View>
      
    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
  contentContainer: {
    flex: 1,
    backgroundColor: '#d9d9d9'
  },
  input: {
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 10,
    fontSize: 20,
    padding: 8,
    backgroundColor: '#1e1e1e',
    width: 300,
    height:250,
    alignSelf: 'center',
    color: '#D9D9D9'
  },
});

export default BottomView;