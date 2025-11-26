import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import { Colors } from '../constants/Colors';
import { DashboardScreenProps } from '../types/navigation';

export function DashboardScreen({ navigation }: DashboardScreenProps) {
  const { user, logout } = useAuth();
  const { services, quotes, insumos } = useData();

  const getMetrics = () => {
    if (user?.role === 'solicitante') {
      const myServices = services.filter(s => s.solicitanteId === user.id);
      const activeServices = myServices.filter(
        s => s.status !== 'completado' && s.status !== 'cancelado'
      );
      const completedServices = myServices.filter(s => s.status === 'completado');
      const quotesReceived = quotes.filter(q =>
        myServices.some(s => s.id === q.serviceId)
      );

      return [
        { label: 'Servicios Activos', value: activeServices.length, color: Colors.primary },
        { label: 'Cotizaciones Recibidas', value: quotesReceived.length, color: Colors.secondary },
        { label: 'Completados', value: completedServices.length, color: Colors.accent },
        { label: 'Total Servicios', value: myServices.length, color: Colors.info },
      ];
    }

    if (user?.role === 'proveedor_servicio') {
      const myQuotes = quotes.filter(q => q.providerId === user.id);
      const pendingQuotes = myQuotes.filter(q => {
        const service = services.find(s => s.id === q.serviceId);
        return service && (service.status === 'publicado' || service.status === 'en_evaluacion');
      });
      const acceptedQuotes = myQuotes.filter(q => {
        const service = services.find(s => s.id === q.serviceId);
        return service && service.assignedQuoteId === q.id;
      });
      const totalRevenue = acceptedQuotes.reduce((sum, q) => sum + q.price, 0);

      return [
        { label: 'Cotizaciones Enviadas', value: myQuotes.length, color: Colors.primary },
        { label: 'Pendientes', value: pendingQuotes.length, color: Colors.warning },
        { label: 'Aceptadas', value: acceptedQuotes.length, color: Colors.success },
        { label: 'Ingresos', value: `$${(totalRevenue / 1000).toFixed(0)}K`, color: Colors.accent },
      ];
    }

    if (user?.role === 'proveedor_insumos') {
      const myInsumos = insumos.filter(i => i.providerId === user.id);
      const totalStock = myInsumos.reduce((sum, i) => sum + i.stock, 0);
      const lowStock = myInsumos.filter(i => i.stock < 50).length;
      const categories = new Set(myInsumos.map(i => i.category)).size;

      return [
        { label: 'Insumos Registrados', value: myInsumos.length, color: Colors.primary },
        { label: 'Stock Total', value: totalStock, color: Colors.secondary },
        { label: 'Stock Bajo', value: lowStock, color: Colors.warning },
        { label: 'Categorías', value: categories, color: Colors.accent },
      ];
    }

    return [];
  };

  const getQuickActions = () => {
    if (user?.role === 'solicitante') {
      return [
        { label: 'Publicar Servicio', screen: 'NewService', icon: '➕' },
        { label: 'Mis Servicios', screen: 'Services', icon: '📋' },
      ];
    }

    if (user?.role === 'proveedor_servicio') {
      return [
        { label: 'Ver Servicios', screen: 'Services', icon: '🔍' },
        { label: 'Mis Cotizaciones', screen: 'MyQuotes', icon: '📝' },
      ];
    }

    if (user?.role === 'proveedor_insumos') {
      return [
        { label: 'Agregar Insumo', screen: 'NewInsumo', icon: '➕' },
        { label: 'Ver Catálogo', screen: 'Insumos', icon: '📦' },
      ];
    }

    return [];
  };

  const getRoleTitle = () => {
    if (user?.role === 'solicitante') return 'Panel del Solicitante';
    if (user?.role === 'proveedor_servicio') return 'Panel del Proveedor';
    if (user?.role === 'proveedor_insumos') return 'Panel de Insumos';
    return 'Panel';
  };

  const metrics = getMetrics();
  const quickActions = getQuickActions();

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Hola, {user?.name}</Text>
          <Text style={styles.roleTitle}>{getRoleTitle()}</Text>
        </View>
        <TouchableOpacity style={styles.logoutButton} onPress={logout}>
          <Text style={styles.logoutText}>Salir</Text>
        </TouchableOpacity>
      </View>

      {/* Metrics */}
      <View style={styles.metricsContainer}>
        {metrics.map((metric, index) => (
          <View key={index} style={[styles.metricCard, { borderLeftColor: metric.color }]}>
            <Text style={styles.metricValue}>{metric.value}</Text>
            <Text style={styles.metricLabel}>{metric.label}</Text>
          </View>
        ))}
      </View>

      {/* Quick Actions */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Acciones Rápidas</Text>
        {quickActions.map((action, index) => (
          <TouchableOpacity
            key={index}
            style={styles.actionCard}
            onPress={() => navigation.navigate(action.screen)}
          >
            <Text style={styles.actionIcon}>{action.icon}</Text>
            <Text style={styles.actionLabel}>{action.label}</Text>
            <Text style={styles.actionArrow}>›</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
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
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.textPrimary,
  },
  roleTitle: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginTop: 4,
  },
  logoutButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: Colors.danger,
    borderRadius: 8,
  },
  logoutText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  metricsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 16,
    gap: 12,
  },
  metricCard: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: Colors.background,
    padding: 16,
    borderRadius: 12,
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  metricValue: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  metricLabel: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
  section: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.textPrimary,
    marginBottom: 12,
  },
  actionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.background,
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  actionIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  actionLabel: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    color: Colors.textPrimary,
  },
  actionArrow: {
    fontSize: 24,
    color: Colors.textSecondary,
  },
});
