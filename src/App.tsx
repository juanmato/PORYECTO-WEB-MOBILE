import React from 'react';

export default function App() {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #2563EB 0%, #10B981 100%)',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      padding: '20px'
    }}>
      <div style={{
        background: 'white',
        borderRadius: '16px',
        padding: '48px',
        maxWidth: '800px',
        width: '100%',
        boxShadow: '0 20px 60px rgba(0,0,0,0.3)'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <h1 style={{
            fontSize: '48px',
            fontWeight: 'bold',
            background: 'linear-gradient(135deg, #2563EB, #10B981)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: '16px'
          }}>
            📱 ServiCombo Mobile
          </h1>
          <p style={{
            fontSize: '20px',
            color: '#64748b',
            marginBottom: '8px'
          }}>
            Aplicación React Native
          </p>
          <p style={{
            fontSize: '16px',
            color: '#94a3b8'
          }}>
            Marketplace que conecta Solicitantes, Proveedores de Servicio y Proveedores de Insumos
          </p>
        </div>

        <div style={{
          background: '#f8fafc',
          borderRadius: '12px',
          padding: '24px',
          marginBottom: '24px',
          border: '2px solid #e2e8f0'
        }}>
          <h2 style={{
            fontSize: '20px',
            fontWeight: '600',
            color: '#1e293b',
            marginBottom: '16px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            🚀 Cómo ejecutar la aplicación móvil
          </h2>
          
          <div style={{ color: '#475569', lineHeight: '1.8' }}>
            <p style={{ marginBottom: '16px', fontWeight: '600' }}>
              1. Navegar a la carpeta mobile:
            </p>
            <pre style={{
              background: '#1e293b',
              color: '#10B981',
              padding: '12px 16px',
              borderRadius: '8px',
              fontSize: '14px',
              marginBottom: '16px',
              overflow: 'auto'
            }}>
              cd mobile
            </pre>

            <p style={{ marginBottom: '16px', fontWeight: '600' }}>
              2. Instalar dependencias:
            </p>
            <pre style={{
              background: '#1e293b',
              color: '#10B981',
              padding: '12px 16px',
              borderRadius: '8px',
              fontSize: '14px',
              marginBottom: '16px',
              overflow: 'auto'
            }}>
              npm install
            </pre>

            <p style={{ marginBottom: '16px', fontWeight: '600' }}>
              3. Iniciar el servidor de desarrollo:
            </p>
            <pre style={{
              background: '#1e293b',
              color: '#10B981',
              padding: '12px 16px',
              borderRadius: '8px',
              fontSize: '14px',
              marginBottom: '16px',
              overflow: 'auto'
            }}>
              npm start
            </pre>

            <p style={{ marginBottom: '16px', fontWeight: '600' }}>
              4. Ejecutar en dispositivo o emulador:
            </p>
            <pre style={{
              background: '#1e293b',
              color: '#10B981',
              padding: '12px 16px',
              borderRadius: '8px',
              fontSize: '14px',
              overflow: 'auto'
            }}>
              npm run android  # Para Android{'\n'}npm run ios      # Para iOS (solo Mac)
            </pre>
          </div>
        </div>

        <div style={{
          background: '#f0f9ff',
          borderRadius: '12px',
          padding: '24px',
          marginBottom: '24px',
          border: '2px solid #bae6fd'
        }}>
          <h3 style={{
            fontSize: '18px',
            fontWeight: '600',
            color: '#0c4a6e',
            marginBottom: '12px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            👤 Usuarios de Prueba
          </h3>
          
          <div style={{ color: '#0369a1', fontSize: '14px', lineHeight: '1.6' }}>
            <div style={{ marginBottom: '12px' }}>
              <strong>Solicitante:</strong> juan@solicitante.com / 123
            </div>
            <div style={{ marginBottom: '12px' }}>
              <strong>Proveedor Servicio:</strong> maria@proveedor.com / 123
            </div>
            <div>
              <strong>Proveedor Insumos:</strong> carlos@insumos.com / 123
            </div>
          </div>
        </div>

        <div style={{
          background: '#f0fdf4',
          borderRadius: '12px',
          padding: '24px',
          border: '2px solid #bbf7d0'
        }}>
          <h3 style={{
            fontSize: '18px',
            fontWeight: '600',
            color: '#14532d',
            marginBottom: '12px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            ✅ Funcionalidades Implementadas
          </h3>
          
          <div style={{
            color: '#166534',
            fontSize: '14px',
            lineHeight: '1.8',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '8px'
          }}>
            <div>✓ Autenticación hardcodeada (3 roles)</div>
            <div>✓ Context API + useReducer</div>
            <div>✓ Dashboard personalizado</div>
            <div>✓ Sistema de cotizaciones</div>
            <div>✓ CRUD de servicios</div>
            <div>✓ CRUD de insumos</div>
            <div>✓ Persistencia AsyncStorage</div>
            <div>✓ Control de permisos</div>
          </div>
        </div>

        <div style={{
          marginTop: '32px',
          padding: '20px',
          background: '#fef3c7',
          borderRadius: '12px',
          border: '2px solid #fcd34d',
          textAlign: 'center'
        }}>
          <p style={{
            color: '#78350f',
            fontSize: '16px',
            margin: 0,
            fontWeight: '600'
          }}>
            📂 La aplicación móvil completa está en la carpeta <code style={{
              background: '#fff7ed',
              padding: '2px 8px',
              borderRadius: '4px',
              color: '#9a3412'
            }}>/mobile</code>
          </p>
        </div>

        <div style={{
          marginTop: '24px',
          textAlign: 'center',
          fontSize: '14px',
          color: '#94a3b8'
        }}>
          <p>
            🎨 Paleta de colores: <span style={{ color: '#2563EB', fontWeight: 'bold' }}>Azul #2563EB</span> · <span style={{ color: '#10B981', fontWeight: 'bold' }}>Verde #10B981</span> · <span style={{ color: '#F4A261', fontWeight: 'bold' }}>Naranja #F4A261</span>
          </p>
        </div>
      </div>
    </div>
  );
}
