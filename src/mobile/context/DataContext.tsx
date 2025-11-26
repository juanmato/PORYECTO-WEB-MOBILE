import React, { createContext, useContext, useReducer, ReactNode, useEffect, useState } from 'react';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Service, Quote, Insumo, InsumoPack } from '../types';
import { mockServices, mockQuotes, mockInsumos, mockInsumoPacks } from '../data/mockData';

interface DataState {
  services: Service[];
  quotes: Quote[];
  insumos: Insumo[];
  insumoPacks: InsumoPack[];
}

type DataAction =
  | { type: 'SET_SERVICES'; payload: Service[] }
  | { type: 'ADD_SERVICE'; payload: Service }
  | { type: 'UPDATE_SERVICE'; payload: Service }
  | { type: 'DELETE_SERVICE'; payload: string }
  | { type: 'SET_QUOTES'; payload: Quote[] }
  | { type: 'ADD_QUOTE'; payload: Quote }
  | { type: 'UPDATE_QUOTE'; payload: Quote }
  | { type: 'DELETE_QUOTE'; payload: string }
  | { type: 'SET_INSUMOS'; payload: Insumo[] }
  | { type: 'ADD_INSUMO'; payload: Insumo }
  | { type: 'UPDATE_INSUMO'; payload: Insumo }
  | { type: 'DELETE_INSUMO'; payload: string }
  | { type: 'SET_INSUMO_PACKS'; payload: InsumoPack[] }
  | { type: 'ADD_INSUMO_PACK'; payload: InsumoPack }
  | { type: 'DELETE_INSUMO_PACK'; payload: string };

interface DataContextType extends DataState {
  addService: (service: Service) => void;
  updateService: (service: Service) => void;
  deleteService: (id: string) => void;
  addQuote: (quote: Quote) => void;
  updateQuote: (quote: Quote) => void;
  deleteQuote: (id: string) => void;
  selectQuote: (serviceId: string, quoteId: string) => void;
  completeService: (serviceId: string, rating: number, comment: string) => void;
  cancelService: (serviceId: string) => void;
  addInsumo: (insumo: Insumo) => void;
  updateInsumo: (insumo: Insumo) => void;
  deleteInsumo: (id: string) => void;
  addInsumoPack: (pack: InsumoPack) => void;
  deleteInsumoPack: (id: string) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

const dataReducer = (state: DataState, action: DataAction): DataState => {
  switch (action.type) {
    case 'SET_SERVICES':
      return { ...state, services: action.payload };
    case 'ADD_SERVICE':
      return { ...state, services: [...state.services, action.payload] };
    case 'UPDATE_SERVICE':
      return {
        ...state,
        services: state.services.map(s => s.id === action.payload.id ? action.payload : s)
      };
    case 'DELETE_SERVICE':
      return {
        ...state,
        services: state.services.filter(s => s.id !== action.payload)
      };
    case 'SET_QUOTES':
      return { ...state, quotes: action.payload };
    case 'ADD_QUOTE':
      return { ...state, quotes: [...state.quotes, action.payload] };
    case 'UPDATE_QUOTE':
      return {
        ...state,
        quotes: state.quotes.map(q => q.id === action.payload.id ? action.payload : q)
      };
    case 'DELETE_QUOTE':
      return {
        ...state,
        quotes: state.quotes.filter(q => q.id !== action.payload)
      };
    case 'SET_INSUMOS':
      return { ...state, insumos: action.payload };
    case 'ADD_INSUMO':
      return { ...state, insumos: [...state.insumos, action.payload] };
    case 'UPDATE_INSUMO':
      return {
        ...state,
        insumos: state.insumos.map(i => i.id === action.payload.id ? action.payload : i)
      };
    case 'DELETE_INSUMO':
      return {
        ...state,
        insumos: state.insumos.filter(i => i.id !== action.payload)
      };
    case 'SET_INSUMO_PACKS':
      return { ...state, insumoPacks: action.payload };
    case 'ADD_INSUMO_PACK':
      return { ...state, insumoPacks: [...state.insumoPacks, action.payload] };
    case 'DELETE_INSUMO_PACK':
      return {
        ...state,
        insumoPacks: state.insumoPacks.filter(p => p.id !== action.payload)
      };
    default:
      if (__DEV__) {
        console.warn('Unknown action type in dataReducer:', action);
      }
      return state;
  }
};

export function DataProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(dataReducer, {
    services: mockServices,
    quotes: mockQuotes,
    insumos: mockInsumos,
    insumoPacks: mockInsumoPacks,
  });

  // Flag to prevent saving during initial load
  const [isInitialized, setIsInitialized] = useState(false);

  // Load data from AsyncStorage on mount
  useEffect(() => {
    loadData();
  }, []);

  // Save data to AsyncStorage whenever state changes (but NOT during initial load)
  useEffect(() => {
    if (isInitialized) {
      saveData();
    }
  }, [state.services, state.quotes, state.insumos, state.insumoPacks, isInitialized]);

  const loadData = async () => {
    try {
      const servicesJson = await AsyncStorage.getItem('services');
      const quotesJson = await AsyncStorage.getItem('quotes');
      const insumosJson = await AsyncStorage.getItem('insumos');
      const packsJson = await AsyncStorage.getItem('insumoPacks');

      // Validate and parse data
      try {
        if (servicesJson) dispatch({ type: 'SET_SERVICES', payload: JSON.parse(servicesJson) });
        if (quotesJson) dispatch({ type: 'SET_QUOTES', payload: JSON.parse(quotesJson) });
        if (insumosJson) dispatch({ type: 'SET_INSUMOS', payload: JSON.parse(insumosJson) });
        if (packsJson) dispatch({ type: 'SET_INSUMO_PACKS', payload: JSON.parse(packsJson) });
      } catch (parseError) {
        console.error('Error parsing stored data:', parseError);
        Alert.alert(
          'Error al cargar datos',
          'Los datos guardados están corruptos. Se cargarán los datos predeterminados.',
          [{ text: 'OK' }]
        );
        // Data will remain as mock data from initial state
      }
    } catch (error) {
      console.error('Error loading data from storage:', error);
      Alert.alert(
        'Error de Almacenamiento',
        'No se pudieron cargar los datos guardados. Se usarán datos predeterminados.',
        [{ text: 'OK' }]
      );
    } finally {
      // Mark as initialized after loading, allowing saves to happen
      setIsInitialized(true);
    }
  };

  const saveData = async () => {
    try {
      // Save all data items in parallel for better performance
      await Promise.all([
        AsyncStorage.setItem('services', JSON.stringify(state.services)),
        AsyncStorage.setItem('quotes', JSON.stringify(state.quotes)),
        AsyncStorage.setItem('insumos', JSON.stringify(state.insumos)),
        AsyncStorage.setItem('insumoPacks', JSON.stringify(state.insumoPacks)),
      ]);
    } catch (error) {
      console.error('Error saving data:', error);

      // Show user-friendly error message
      Alert.alert(
        'Error al Guardar',
        'No se pudieron guardar los cambios. Por favor, verifica el almacenamiento de tu dispositivo e intenta nuevamente.',
        [
          { text: 'Cancelar', style: 'cancel' },
          {
            text: 'Reintentar',
            onPress: () => saveData(), // Retry saving
          },
        ]
      );
    }
  };

  const addService = (service: Service) => {
    dispatch({ type: 'ADD_SERVICE', payload: service });
  };

  const updateService = (service: Service) => {
    dispatch({ type: 'UPDATE_SERVICE', payload: service });
  };

  const deleteService = (id: string) => {
    dispatch({ type: 'DELETE_SERVICE', payload: id });
  };

  const addQuote = (quote: Quote) => {
    dispatch({ type: 'ADD_QUOTE', payload: quote });
  };

  const updateQuote = (quote: Quote) => {
    dispatch({ type: 'UPDATE_QUOTE', payload: quote });
  };

  const deleteQuote = (id: string) => {
    dispatch({ type: 'DELETE_QUOTE', payload: id });
  };

  const selectQuote = (serviceId: string, quoteId: string) => {
    const service = state.services.find(s => s.id === serviceId);
    if (service) {
      updateService({ ...service, status: 'asignado', assignedQuoteId: quoteId });
    }
  };

  const completeService = (serviceId: string, rating: number, comment: string) => {
    const service = state.services.find(s => s.id === serviceId);
    if (service) {
      updateService({ ...service, status: 'completado', rating, ratingComment: comment });
    }
  };

  const cancelService = (serviceId: string) => {
    const service = state.services.find(s => s.id === serviceId);
    if (service) {
      updateService({ ...service, status: 'cancelado' });
    }
  };

  const addInsumo = (insumo: Insumo) => {
    dispatch({ type: 'ADD_INSUMO', payload: insumo });
  };

  const updateInsumo = (insumo: Insumo) => {
    dispatch({ type: 'UPDATE_INSUMO', payload: insumo });
  };

  const deleteInsumo = (id: string) => {
    dispatch({ type: 'DELETE_INSUMO', payload: id });
  };

  const addInsumoPack = (pack: InsumoPack) => {
    dispatch({ type: 'ADD_INSUMO_PACK', payload: pack });
  };

  const deleteInsumoPack = (id: string) => {
    dispatch({ type: 'DELETE_INSUMO_PACK', payload: id });
  };

  return (
    <DataContext.Provider
      value={{
        ...state,
        addService,
        updateService,
        deleteService,
        addQuote,
        updateQuote,
        deleteQuote,
        selectQuote,
        completeService,
        cancelService,
        addInsumo,
        updateInsumo,
        deleteInsumo,
        addInsumoPack,
        deleteInsumoPack,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
}
