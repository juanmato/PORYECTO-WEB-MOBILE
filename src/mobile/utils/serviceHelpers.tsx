import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ServiceStatus } from '../types';
import { Colors } from '../constants/Colors';

/**
 * Configuration for service status badges
 */
const STATUS_CONFIG: Record<ServiceStatus, { label: string; color: string }> = {
  publicado: { label: 'Publicado', color: Colors.info },
  en_evaluacion: { label: 'En Evaluación', color: Colors.warning },
  asignado: { label: 'Asignado', color: Colors.secondary },
  completado: { label: 'Completado', color: Colors.success },
  cancelado: { label: 'Cancelado', color: Colors.danger },
};

/**
 * Returns a status badge component for the given service status
 * @param status - The service status
 * @returns A React component displaying the status badge
 */
export function getStatusBadge(status: ServiceStatus) {
  const config = STATUS_CONFIG[status] || { label: status, color: Colors.gray400 };

  return (
    <View style={[styles.badge, { backgroundColor: config.color }]}>
      <Text style={styles.badgeText}>{config.label}</Text>
    </View>
  );
}

/**
 * Returns the status label for the given service status
 * @param status - The service status
 * @returns The localized status label
 */
export function getStatusLabel(status: ServiceStatus): string {
  return STATUS_CONFIG[status]?.label || status;
}

/**
 * Returns the color for the given service status
 * @param status - The service status
 * @returns The color hex code
 */
export function getStatusColor(status: ServiceStatus): string {
  return STATUS_CONFIG[status]?.color || Colors.gray400;
}

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
});
