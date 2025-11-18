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

export function ServiceDetailScreen({ route, navigation }: any) {
  const { serviceId } = route.params;
  const { user } = useAuth();
  const { services, quotes, selectQuote, deleteQuote, completeService, cancelService } = useData();

  const service = services.find(s => s.id === serviceId);
  const serviceQuotes = quotes.filter(q => q.serviceId === serviceId);

  if (!service) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Servicio no encontrado</Text>
      </View>
    );
  }

  const handleSelectQuote = (quoteId: string) => {
    Alert.alert(
      'Seleccionar Cotización',
      '¿Deseas seleccionar esta cotización?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Seleccionar',
          onPress: () => {
            selectQuote(serviceId, quoteId);
            Alert.alert('Éxito', 'Cotización seleccionada correctamente');
          },
        },
      ]
    );
  };

  const handleCompleteService = () => {
    Alert.prompt(
      'Calificar Servicio',
      'Ingresa tu calificación (1-5) y comentario:',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Completar',
          onPress: (text) => {
            completeService(serviceId, 5, text || 'Excelente servicio');
            Alert.alert('Éxito', 'Servicio completado y calificado');
            navigation.goBack();
          },
        },
      ],
      'plain-text',
      'Excelente servicio'
    );
  };

  const handleCancelService = () => {
    Alert.alert(
      'Cancelar Servicio',
      '¿Estás seguro de que deseas cancelar este servicio?',
      [
        { text: 'No', style: 'cancel' },
        {
          text: 'Sí, cancelar',
          style: 'destructive',
          onPress: () => {
            cancelService(serviceId);
            Alert.alert('Éxito', 'Servicio cancelado');
            navigation.goBack();
          },
        },
      ]
    );
  };

  const getStatusBadge = (status: string) => {
    const statusConfig: Record<string, { label: string; color: string }> = {
      publicado: { label: 'Publicado', color: Colors.info },
      en_evaluacion: { label: 'En Evaluación', color: Colors.warning },
      asignado: { label: 'Asignado', color: Colors.secondary },
      completado: { label: 'Completado', color: Colors.success },
      cancelado: { label: 'Cancelado', color: Colors.danger },
    };

    const config = statusConfig[status] || { label: status, color: Colors.gray400 };

    return (
      <View style={[styles.badge, { backgroundColor: config.color }]}>
        <Text style={styles.badgeText}>{config.label}</Text>
      </View>
    );
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>{service.title}</Text>
        {getStatusBadge(service.status)}
      </View>

      {/* Info */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Información</Text>
        <Text style={styles.description}>{service.description}</Text>
        
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>📍 Ubicación:</Text>
          <Text style={styles.infoValue}>{service.address}, {service.city}</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>📅 Fecha Preferida:</Text>
          <Text style={styles.infoValue}>
            {new Date(service.preferredDate).toLocaleDateString('es-CL')}
          </Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>👤 Solicitante:</Text>
          <Text style={styles.infoValue}>{service.solicitanteName}</Text>
        </View>
      </View>

      {/* Insumos */}
      {service.insumos.length > 0 && (
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Insumos Requeridos</Text>
          {service.insumos.map((insumo, index) => (
            <View key={index} style={styles.insumoRow}>
              <Text style={styles.insumoName}>{insumo.name}</Text>
              <Text style={styles.insumoQuantity}>
                {insumo.quantity} {insumo.unit}
              </Text>
            </View>
          ))}
        </View>
      )}

      {/* Cotizaciones */}
      {serviceQuotes.length > 0 && (
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>
            Cotizaciones ({serviceQuotes.length})
          </Text>
          {serviceQuotes.map(quote => (
            <View
              key={quote.id}
              style={[
                styles.quoteCard,
                service.assignedQuoteId === quote.id && styles.selectedQuote,
              ]}
            >
              <View style={styles.quoteHeader}>
                <Text style={styles.quoteName}>{quote.providerName}</Text>
                {service.assignedQuoteId === quote.id && (
                  <View style={styles.selectedBadge}>
                    <Text style={styles.selectedBadgeText}>✓ Seleccionada</Text>
                  </View>
                )}
              </View>

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

              <Text style={styles.quoteDetails}>{quote.details}</Text>

              {/* Actions */}
              {user?.id === service.solicitanteId &&
                service.status === 'en_evaluacion' &&
                !service.assignedQuoteId && (
                  <TouchableOpacity
                    style={styles.selectButton}
                    onPress={() => handleSelectQuote(quote.id)}
                  >
                    <Text style={styles.selectButtonText}>Seleccionar</Text>
                  </TouchableOpacity>
                )}

              {quote.providerId === user?.id &&
                (service.status === 'publicado' || service.status === 'en_evaluacion') && (
                  <View style={styles.quoteActions}>
                    <TouchableOpacity
                      style={styles.editButton}
                      onPress={() => navigation.navigate('NewQuote', { serviceId, quoteId: quote.id })}
                    >
                      <Text style={styles.editButtonText}>Editar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.deleteButton}
                      onPress={() => {
                        Alert.alert(
                          'Eliminar Cotización',
                          '¿Estás seguro?',
                          [
                            { text: 'Cancelar', style: 'cancel' },
                            {
                              text: 'Eliminar',
                              style: 'destructive',
                              onPress: () => deleteQuote(quote.id),
                            },
                          ]
                        );
                      }}
                    >
                      <Text style={styles.deleteButtonText}>Eliminar</Text>
                    </TouchableOpacity>
                  </View>
                )}
            </View>
          ))}
        </View>
      )}

      {/* Action Buttons */}
      {user?.role === 'proveedor_servicio' &&
        (service.status === 'publicado' || service.status === 'en_evaluacion') &&
        !serviceQuotes.some(q => q.providerId === user.id) && (
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => navigation.navigate('NewQuote', { serviceId })}
          >
            <Text style={styles.actionButtonText}>Enviar Cotización</Text>
          </TouchableOpacity>
        )}

      {user?.id === service.solicitanteId && service.status === 'asignado' && (
        <View style={styles.actionButtons}>
          <TouchableOpacity
            style={[styles.actionButton, { backgroundColor: Colors.success }]}
            onPress={handleCompleteService}
          >
            <Text style={styles.actionButtonText}>Completar y Calificar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.actionButton, { backgroundColor: Colors.danger }]}
            onPress={handleCancelService}
          >
            <Text style={styles.actionButtonText}>Cancelar Servicio</Text>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
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
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.textPrimary,
    marginBottom: 12,
  },
  badge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  card: {
    backgroundColor: Colors.background,
    padding: 16,
    marginTop: 12,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: Colors.border,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.textPrimary,
    marginBottom: 12,
  },
  description: {
    fontSize: 14,
    color: Colors.textSecondary,
    lineHeight: 20,
    marginBottom: 16,
  },
  infoRow: {
    marginBottom: 12,
  },
  infoLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  insumoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray100,
  },
  insumoName: {
    fontSize: 14,
    color: Colors.textPrimary,
  },
  insumoQuantity: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  quoteCard: {
    backgroundColor: Colors.gray50,
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  selectedQuote: {
    borderColor: Colors.success,
    borderWidth: 2,
  },
  quoteHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  quoteName: {
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
  selectButton: {
    backgroundColor: Colors.primary,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  selectButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  quoteActions: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 8,
  },
  editButton: {
    flex: 1,
    backgroundColor: Colors.gray200,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  editButtonText: {
    color: Colors.textPrimary,
    fontWeight: '600',
  },
  deleteButton: {
    flex: 1,
    backgroundColor: Colors.danger,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  deleteButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  actionButton: {
    backgroundColor: Colors.primary,
    padding: 16,
    margin: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  actionButtons: {
    padding: 16,
    gap: 12,
  },
  actionButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  errorText: {
    fontSize: 16,
    color: Colors.danger,
    textAlign: 'center',
    marginTop: 40,
  },
});
