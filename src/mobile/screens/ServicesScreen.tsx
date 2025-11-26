import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from 'react-native';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import { Colors } from '../constants/Colors';
import { Service } from '../types';
import { ServicesScreenProps } from '../types/navigation';
import { getStatusBadge } from '../utils/serviceHelpers';

export function ServicesScreen({ navigation }: ServicesScreenProps) {
  const { user } = useAuth();
  const { services } = useData();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredServices = services.filter(service => {
    // Filter by role
    if (user?.role === 'solicitante') {
      if (service.solicitanteId !== user.id) return false;
    } else if (user?.role === 'proveedor_servicio' || user?.role === 'proveedor_insumos') {
      if (service.status === 'cancelado') return false;
    }

    // Filter by search
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        service.title.toLowerCase().includes(query) ||
        service.description.toLowerCase().includes(query) ||
        service.city.toLowerCase().includes(query)
      );
    }

    return true;
  });


  const getCategoryIcon = (category: string) => {
    const icons: Record<string, string> = {
      jardineria: '🌱',
      piscinas: '🏊',
      limpieza: '🧹',
      otros: '🔧',
    };
    return icons[category] || '📋';
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>
          {user?.role === 'solicitante' ? 'Mis Servicios' : 'Servicios Disponibles'}
        </Text>
        {user?.role === 'solicitante' && (
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => navigation.navigate('NewService')}
          >
            <Text style={styles.addButtonText}>+ Nuevo</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Search */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar servicios..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* Services List */}
      <ScrollView style={styles.list}>
        {filteredServices.length > 0 ? (
          filteredServices.map(service => (
            <TouchableOpacity
              key={service.id}
              style={styles.serviceCard}
              onPress={() => navigation.navigate('ServiceDetail', { serviceId: service.id })}
            >
              <View style={styles.serviceHeader}>
                <Text style={styles.serviceIcon}>{getCategoryIcon(service.category)}</Text>
                <View style={styles.serviceTitleContainer}>
                  <Text style={styles.serviceTitle} numberOfLines={1}>
                    {service.title}
                  </Text>
                  <Text style={styles.serviceCity}>{service.city}</Text>
                </View>
                {getStatusBadge(service.status)}
              </View>

              <Text style={styles.serviceDescription} numberOfLines={2}>
                {service.description}
              </Text>

              <View style={styles.serviceFooter}>
                <Text style={styles.serviceDate}>
                  📅 {new Date(service.preferredDate).toLocaleDateString('es-CL')}
                </Text>
                <Text style={styles.serviceArrow}>›</Text>
              </View>
            </TouchableOpacity>
          ))
        ) : (
          <View style={styles.emptyState}>
            <Text style={styles.emptyIcon}>📭</Text>
            <Text style={styles.emptyTitle}>No hay servicios</Text>
            <Text style={styles.emptyDescription}>
              {user?.role === 'solicitante'
                ? 'Comienza publicando tu primer servicio'
                : 'No hay servicios disponibles en este momento'}
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
  searchContainer: {
    padding: 16,
    backgroundColor: Colors.background,
  },
  searchInput: {
    backgroundColor: Colors.gray50,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  list: {
    flex: 1,
    padding: 16,
  },
  serviceCard: {
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
  serviceHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  serviceIcon: {
    fontSize: 32,
    marginRight: 12,
  },
  serviceTitleContainer: {
    flex: 1,
  },
  serviceTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  serviceCity: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '600',
  },
  serviceDescription: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: 12,
    lineHeight: 20,
  },
  serviceFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    paddingTop: 12,
  },
  serviceDate: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
  serviceArrow: {
    fontSize: 24,
    color: Colors.textSecondary,
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
