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

export function MyQuotesScreen({ navigation }: any) {
  const { user } = useAuth();
  const { quotes, services, deleteQuote } = useData();

  const myQuotes = quotes.filter(q => q.providerId === user?.id);

  const getService = (serviceId: string) => {
    return services.find(s => s.id === serviceId);
  };

  const handleDelete = (quoteId: string, serviceStatus: string) => {
    if (serviceStatus !== 'publicado' && serviceStatus !== 'en_evaluacion') {
      Alert.alert(
        'Error',
        'No se puede eliminar esta cotización porque el servicio ya fue asignado o completado'
      );
      return;
    }

    Alert.alert('Eliminar Cotización', '¿Estás seguro?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Eliminar',
        style: 'destructive',
        onPress: () => {
          deleteQuote(quoteId);
          Alert.alert('Éxito', 'Cotización eliminada');
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Mis Cotizaciones</Text>
      </View>

      {/* Quotes List */}
      <ScrollView style={styles.list}>
        {myQuotes.length > 0 ? (
          myQuotes.map(quote => {
            const service = getService(quote.serviceId);
            if (!service) return null;

            const isSelected = service.assignedQuoteId === quote.id;

            return (
              <View
                key={quote.id}
                style={[styles.quoteCard, isSelected && styles.selectedQuote]}
              >
                <View style={styles.quoteHeader}>
                  <Text style={styles.serviceTitle} numberOfLines={1}>
                    {service.title}
                  </Text>
                  {isSelected && (
                    <View style={styles.selectedBadge}>
                      <Text style={styles.selectedBadgeText}>✓ Seleccionada</Text>
                    </View>
                  )}
                </View>

                <Text style={styles.serviceCity}>{service.city}</Text>

                <View style={styles.quoteInfo}>
                  <View style={styles.quoteInfoItem}>
                    <Text style={styles.quoteLabel}>Precio</Text>
                    <Text style={styles.quotePrice}>
                      ${quote.price.toLocaleString('es-CL')}
                    </Text>
                  </View>
                  <View style={styles.quoteInfoItem}>
                    <Text style={styles.quoteLabel}>Plazo</Text>
                    <Text style={styles.quoteDeadline}>
                      {quote.deadline} {quote.deadline === 1 ? 'día' : 'días'}
                    </Text>
                  </View>
                </View>

                <Text style={styles.quoteDetails} numberOfLines={2}>
                  {quote.details}
                </Text>

                <View style={styles.actions}>
                  <TouchableOpacity
                    style={styles.viewButton}
                    onPress={() =>
                      navigation.navigate('ServiceDetail', { serviceId: service.id })
                    }
                  >
                    <Text style={styles.viewButtonText}>Ver Servicio</Text>
                  </TouchableOpacity>

                  {(service.status === 'publicado' || service.status === 'en_evaluacion') && (
                    <TouchableOpacity
                      style={styles.deleteButton}
                      onPress={() => handleDelete(quote.id, service.status)}
                    >
                      <Text style={styles.deleteButtonText}>🗑️</Text>
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            );
          })
        ) : (
          <View style={styles.emptyState}>
            <Text style={styles.emptyIcon}>📝</Text>
            <Text style={styles.emptyTitle}>No hay cotizaciones</Text>
            <Text style={styles.emptyDescription}>
              Comienza enviando cotizaciones a los servicios disponibles
            </Text>
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
  list: {
    flex: 1,
    padding: 16,
  },
  quoteCard: {
    backgroundColor: Colors.background,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: Colors.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  selectedQuote: {
    borderColor: Colors.success,
    borderWidth: 2,
  },
  quoteHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  serviceTitle: {
    flex: 1,
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.textPrimary,
  },
  selectedBadge: {
    backgroundColor: Colors.success,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  selectedBadgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '600',
  },
  serviceCity: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginBottom: 12,
  },
  quoteInfo: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 12,
  },
  quoteInfoItem: {
    flex: 1,
  },
  quoteLabel: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginBottom: 4,
  },
  quotePrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.secondary,
  },
  quoteDeadline: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.textPrimary,
  },
  quoteDetails: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: 12,
  },
  actions: {
    flexDirection: 'row',
    gap: 8,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    paddingTop: 12,
  },
  viewButton: {
    flex: 1,
    backgroundColor: Colors.primary,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  viewButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  deleteButton: {
    backgroundColor: Colors.danger,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
  },
  deleteButtonText: {
    fontSize: 18,
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
  },
});
