import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import { Colors } from '../constants/Colors';
import { Insumo } from '../types';
import { NewInsumoScreenProps } from '../types/navigation';
import { validateNumber } from '../utils/validation';
import { generateInsumoId } from '../utils/idGenerator';

export function NewInsumoScreen({ navigation }: NewInsumoScreenProps) {
  const { user } = useAuth();
  const { addInsumo } = useData();

  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [unit, setUnit] = useState('');
  const [unitPrice, setUnitPrice] = useState('');
  const [stock, setStock] = useState('');

  const handleSubmit = () => {
    if (!name || name.trim() === '' || !category || category.trim() === '' || !unit || unit.trim() === '') {
      Alert.alert('Error', 'Por favor completa todos los campos');
      return;
    }

    // Validate unit price
    const priceValidation = validateNumber(unitPrice, 'El precio unitario', 1);
    if (!priceValidation.isValid) {
      Alert.alert('Error de Validación', priceValidation.error);
      return;
    }

    // Validate stock
    const stockValidation = validateNumber(stock, 'El stock', 0);
    if (!stockValidation.isValid) {
      Alert.alert('Error de Validación', stockValidation.error);
      return;
    }

    const newInsumo: Insumo = {
      id: generateInsumoId(),
      name,
      category,
      unit,
      unitPrice: priceValidation.value!,
      stock: stockValidation.value!,
      providerId: user!.id,
    };

    addInsumo(newInsumo);
    Alert.alert('Éxito', 'Insumo agregado correctamente');
    navigation.goBack();
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.form}>
        <Text style={styles.label}>Nombre del Insumo *</Text>
        <TextInput
          style={styles.input}
          placeholder="Ej: Bolsas para residuos 100L"
          value={name}
          onChangeText={setName}
        />

        <Text style={styles.label}>Categoría *</Text>
        <TextInput
          style={styles.input}
          placeholder="Ej: jardineria, piscinas, limpieza"
          value={category}
          onChangeText={setCategory}
        />

        <Text style={styles.label}>Unidad de Medida *</Text>
        <TextInput
          style={styles.input}
          placeholder="Ej: kg, litro, unidad"
          value={unit}
          onChangeText={setUnit}
        />

        <Text style={styles.label}>Precio Unitario (CLP) *</Text>
        <TextInput
          style={styles.input}
          placeholder="500"
          value={unitPrice}
          onChangeText={setUnitPrice}
          keyboardType="numeric"
        />

        <Text style={styles.label}>Stock Inicial *</Text>
        <TextInput
          style={styles.input}
          placeholder="200"
          value={stock}
          onChangeText={setStock}
          keyboardType="numeric"
        />

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Agregar Insumo</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  form: {
    padding: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginBottom: 8,
    marginTop: 16,
  },
  input: {
    backgroundColor: Colors.gray50,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  submitButton: {
    backgroundColor: Colors.primary,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 24,
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
