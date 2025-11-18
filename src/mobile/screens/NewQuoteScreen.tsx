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
import { Quote } from '../types';

export function NewQuoteScreen({ route, navigation }: any) {
  const { serviceId, quoteId } = route.params;
  const { user } = useAuth();
  const { quotes, addQuote, updateQuote } = useData();

  const existingQuote = quoteId ? quotes.find(q => q.id === quoteId) : null;

  const [price, setPrice] = useState(existingQuote?.price.toString() || '');
  const [deadline, setDeadline] = useState(existingQuote?.deadline.toString() || '');
  const [details, setDetails] = useState(existingQuote?.details || '');

  const handleSubmit = () => {
    if (!price || !deadline || !details) {
      Alert.alert('Error', 'Por favor completa todos los campos');
      return;
    }

    if (existingQuote) {
      // Update
      const updatedQuote: Quote = {
        ...existingQuote,
        price: parseInt(price),
        deadline: parseInt(deadline),
        details,
      };
      updateQuote(updatedQuote);
      Alert.alert('Éxito', 'Cotización actualizada correctamente');
    } else {
      // Create
      const newQuote: Quote = {
        id: `q-${Date.now()}`,
        serviceId,
        providerId: user!.id,
        providerName: user!.name,
        price: parseInt(price),
        deadline: parseInt(deadline),
        details,
        createdAt: new Date().toISOString(),
      };
      addQuote(newQuote);
      Alert.alert('Éxito', 'Cotización enviada correctamente');
    }

    navigation.goBack();
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.form}>
        <Text style={styles.label}>Precio (CLP) *</Text>
        <TextInput
          style={styles.input}
          placeholder="85000"
          value={price}
          onChangeText={setPrice}
          keyboardType="numeric"
        />

        <Text style={styles.label}>Plazo (días) *</Text>
        <TextInput
          style={styles.input}
          placeholder="2"
          value={deadline}
          onChangeText={setDeadline}
          keyboardType="numeric"
        />

        <Text style={styles.label}>Detalles de la Cotización *</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Describe los detalles de tu oferta..."
          value={details}
          onChangeText={setDetails}
          multiline
          numberOfLines={6}
        />

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>
            {existingQuote ? 'Actualizar Cotización' : 'Enviar Cotización'}
          </Text>
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
    height: 120,
    textAlignVertical: 'top',
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
