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
import { Service } from '../types';
import { NewServiceScreenProps } from '../types/navigation';
import { validateDate } from '../utils/validation';
import { generateServiceId } from '../utils/idGenerator';

export function NewServiceScreen({ navigation }: NewServiceScreenProps) {
  const { user } = useAuth();
  const { addService } = useData();
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<'jardineria' | 'piscinas' | 'limpieza' | 'otros'>('jardineria');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [preferredDate, setPreferredDate] = useState('');

  const handleSubmit = () => {
    if (!title || title.trim() === '' || !description || description.trim() === '' || !address || address.trim() === '' || !city || city.trim() === '') {
      Alert.alert('Error', 'Por favor completa todos los campos');
      return;
    }

    // Validate preferred date
    const dateValidation = validateDate(preferredDate);
    if (!dateValidation.isValid) {
      Alert.alert('Error de Validación', dateValidation.error);
      return;
    }

    const newService: Service = {
      id: generateServiceId(),
      title,
      description,
      category,
      address,
      city,
      preferredDate,
      status: 'publicado',
      solicitanteId: user!.id,
      solicitanteName: user!.name,
      insumos: [],
      createdAt: new Date().toISOString(),
    };

    addService(newService);
    Alert.alert('Éxito', 'Servicio publicado correctamente');
    navigation.goBack();
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.form}>
        <Text style={styles.label}>Título del Servicio *</Text>
        <TextInput
          style={styles.input}
          placeholder="Ej: Limpieza de jardín"
          value={title}
          onChangeText={setTitle}
        />

        <Text style={styles.label}>Descripción *</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Describe el servicio que necesitas..."
          value={description}
          onChangeText={setDescription}
          multiline
          numberOfLines={4}
        />

        <Text style={styles.label}>Categoría *</Text>
        <View style={styles.categoryContainer}>
          {['jardineria', 'piscinas', 'limpieza', 'otros'].map((cat) => (
            <TouchableOpacity
              key={cat}
              style={[
                styles.categoryButton,
                category === cat && styles.categoryButtonActive,
              ]}
              onPress={() => setCategory(cat as any)}
            >
              <Text
                style={[
                  styles.categoryText,
                  category === cat && styles.categoryTextActive,
                ]}
              >
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.label}>Dirección *</Text>
        <TextInput
          style={styles.input}
          placeholder="Ej: Av. Providencia 1234"
          value={address}
          onChangeText={setAddress}
        />

        <Text style={styles.label}>Ciudad *</Text>
        <TextInput
          style={styles.input}
          placeholder="Ej: Santiago"
          value={city}
          onChangeText={setCity}
        />

        <Text style={styles.label}>Fecha Preferida *</Text>
        <TextInput
          style={styles.input}
          placeholder="YYYY-MM-DD"
          value={preferredDate}
          onChangeText={setPreferredDate}
        />

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Publicar Servicio</Text>
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
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  categoryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.border,
    backgroundColor: Colors.gray50,
  },
  categoryButtonActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  categoryText: {
    fontSize: 14,
    color: Colors.textPrimary,
  },
  categoryTextActive: {
    color: '#FFFFFF',
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
