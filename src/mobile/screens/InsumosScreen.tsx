import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import { Colors } from '../constants/Colors';
import { InsumosScreenProps } from '../types/navigation';

export function InsumosScreen({ navigation }: InsumosScreenProps) {
  const { user } = useAuth();
  const { insumos, deleteInsumo } = useData();

  const myInsumos = insumos.filter(i => i.providerId === user?.id);

  const handleDelete = (id: string) => {
    Alert.alert('Eliminar Insumo', '¿Estás seguro?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Eliminar',
        style: 'destructive',
        onPress: () => {
          deleteInsumo(id);
          Alert.alert('Éxito', 'Insumo eliminado');
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Mis Insumos</Text>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate('NewInsumo')}
        >
          <Text style={styles.addButtonText}>+ Nuevo</Text>
        </TouchableOpacity>
      </View>

      {/* Insumos List */}
      <ScrollView style={styles.list}>
        {myInsumos.length > 0 ? (
          myInsumos.map(insumo => (
            <View key={insumo.id} style={styles.insumoCard}>
              <View style={styles.insumoHeader}>
                <Text style={styles.insumoName}>{insumo.name}</Text>
                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() => handleDelete(insumo.id)}
                >
                  <Text style={styles.deleteButtonText}>🗑️</Text>
                </TouchableOpacity>
              </View>

              <Text style={styles.insumoCategory}>📦 {insumo.category}</Text>

              <View style={styles.insumoInfo}>
                <View style={styles.insumoInfoItem}>
                  <Text style={styles.insumoLabel}>Precio Unitario</Text>
                  <Text style={styles.insumoPrice}>
                    ${insumo.unitPrice.toLocaleString('es-CL')}
                  </Text>
                </View>
                <View style={styles.insumoInfoItem}>
                  <Text style={styles.insumoLabel}>Stock</Text>
                  <Text
                    style={[
                      styles.insumoStock,
                      insumo.stock < 50 && styles.lowStock,
                    ]}
                  >
                    {insumo.stock} {insumo.unit}
                  </Text>
                </View>
              </View>
            </View>
          ))
        ) : (
          <View style={styles.emptyState}>
            <Text style={styles.emptyIcon}>📦</Text>
            <Text style={styles.emptyTitle}>No hay insumos</Text>
            <Text style={styles.emptyDescription}>
              Comienza agregando insumos a tu catálogo
            </Text>
            <TouchableOpacity
              style={styles.emptyButton}
              onPress={() => navigation.navigate('NewInsumo')}
            >
              <Text style={styles.emptyButtonText}>Agregar Insumo</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundSecondary,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: Colors.background,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.textPrimary,
  },
  addButton: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  addButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  list: {
    flex: 1,
    padding: 16,
  },
  insumoCard: {
    backgroundColor: Colors.background,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  insumoHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  insumoName: {
    flex: 1,
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.textPrimary,
  },
  deleteButton: {
    padding: 8,
  },
  deleteButtonText: {
    fontSize: 18,
  },
  insumoCategory: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginBottom: 12,
  },
  insumoInfo: {
    flexDirection: 'row',
    gap: 16,
  },
  insumoInfoItem: {
    flex: 1,
  },
  insumoLabel: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginBottom: 4,
  },
  insumoPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.secondary,
  },
  insumoStock: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.textPrimary,
  },
  lowStock: {
    color: Colors.danger,
  },
  emptyState: {
    alignItems: 'center',
    paddingTop: 60,
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.textPrimary,
    marginBottom: 8,
  },
  emptyDescription: {
    fontSize: 14,
    color: Colors.textSecondary,
    textAlign: 'center',
    paddingHorizontal: 32,
    marginBottom: 24,
  },
  emptyButton: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  emptyButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
});
