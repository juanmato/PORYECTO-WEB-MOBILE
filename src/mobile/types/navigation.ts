import { NativeStackScreenProps } from '@react-navigation/stack';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps } from '@react-navigation/native';

// Root Stack Navigator param list
export type RootStackParamList = {
  Login: undefined;
  Main: undefined;
  ServiceDetail: { serviceId: string };
  NewService: undefined;
  NewQuote: { serviceId: string; quoteId?: string };
  NewInsumo: { insumoId?: string };
};

// Tab Navigator param list
export type MainTabParamList = {
  Dashboard: undefined;
  Services: undefined;
  MyQuotes: undefined;
  Insumos: undefined;
};

// Screen prop types for Stack screens
export type LoginScreenProps = NativeStackScreenProps<RootStackParamList, 'Login'>;
export type ServiceDetailScreenProps = NativeStackScreenProps<RootStackParamList, 'ServiceDetail'>;
export type NewServiceScreenProps = NativeStackScreenProps<RootStackParamList, 'NewService'>;
export type NewQuoteScreenProps = NativeStackScreenProps<RootStackParamList, 'NewQuote'>;
export type NewInsumoScreenProps = NativeStackScreenProps<RootStackParamList, 'NewInsumo'>;

// Screen prop types for Tab screens (composite to allow stack navigation from tabs)
export type DashboardScreenProps = CompositeScreenProps<
  BottomTabScreenProps<MainTabParamList, 'Dashboard'>,
  NativeStackScreenProps<RootStackParamList>
>;

export type ServicesScreenProps = CompositeScreenProps<
  BottomTabScreenProps<MainTabParamList, 'Services'>,
  NativeStackScreenProps<RootStackParamList>
>;

export type MyQuotesScreenProps = CompositeScreenProps<
  BottomTabScreenProps<MainTabParamList, 'MyQuotes'>,
  NativeStackScreenProps<RootStackParamList>
>;

export type InsumosScreenProps = CompositeScreenProps<
  BottomTabScreenProps<MainTabParamList, 'Insumos'>,
  NativeStackScreenProps<RootStackParamList>
>;

// Declare global navigation types for TypeScript autocomplete
declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
