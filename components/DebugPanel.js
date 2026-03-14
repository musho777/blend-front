"use client";

import { useState, useEffect } from 'react';
import { checkNetworkStatus, isMobileDevice } from '@/utils/errorHandler';

/**
 * Debug Panel for Development - Shows detailed error and network information
 * Only visible in development mode
 */
export default function DebugPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const [errors, setErrors] = useState([]);
  const [networkInfo, setNetworkInfo] = useState(null);
  const [deviceInfo, setDeviceInfo] = useState(null);

  useEffect(() => {
    // Only render in development mode
    if (process.env.NODE_ENV !== 'development') {
      return;
    }

    // Collect device information
    if (typeof window !== 'undefined') {
      setDeviceInfo({
        isMobile: isMobileDevice(),
        userAgent: navigator.userAgent,
        viewport: {
          width: window.innerWidth,
          height: window.innerHeight,
        },
        screen: {
          width: window.screen.width,
          height: window.screen.height,
        },
      });
    }

    // Update network status periodically
    const updateNetwork = () => {
      setNetworkInfo(checkNetworkStatus());
    };

    updateNetwork();
    const interval = setInterval(updateNetwork, 3000);

    // Capture console errors
    const originalError = console.error;
    console.error = function (...args) {
      setErrors(prev => [
        ...prev.slice(-9), // Keep last 10 errors
        {
          timestamp: new Date().toLocaleTimeString(),
          message: args.join(' '),
        },
      ]);
      originalError.apply(console, args);
    };

    // Listen for network changes
    const handleOnline = () => updateNetwork();
    const handleOffline = () => updateNetwork();

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      clearInterval(interval);
      console.error = originalError;
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Don't render in production
  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          zIndex: 9999,
          backgroundColor: '#6c757d',
          color: 'white',
          border: 'none',
          borderRadius: '50%',
          width: '50px',
          height: '50px',
          fontSize: '20px',
          cursor: 'pointer',
          boxShadow: '0 4px 8px rgba(0,0,0,0.3)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        title="Toggle Debug Panel"
      >
        🐛
      </button>

      {/* Debug Panel */}
      {isOpen && (
        <div
          style={{
            position: 'fixed',
            bottom: '80px',
            right: '20px',
            width: '350px',
            maxHeight: '500px',
            backgroundColor: 'white',
            border: '2px solid #6c757d',
            borderRadius: '8px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
            zIndex: 9999,
            overflow: 'hidden',
            fontFamily: 'monospace',
            fontSize: '12px',
          }}
        >
          {/* Header */}
          <div
            style={{
              backgroundColor: '#6c757d',
              color: 'white',
              padding: '10px',
              fontWeight: 'bold',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <span>🐛 Debug Panel</span>
            <button
              onClick={() => setErrors([])}
              style={{
                backgroundColor: 'transparent',
                border: '1px solid white',
                color: 'white',
                borderRadius: '4px',
                padding: '2px 8px',
                cursor: 'pointer',
                fontSize: '10px',
              }}
            >
              Clear Errors
            </button>
          </div>

          {/* Content */}
          <div style={{ padding: '10px', maxHeight: '440px', overflowY: 'auto' }}>
            {/* Network Status */}
            <div style={{ marginBottom: '15px' }}>
              <div style={{ fontWeight: 'bold', marginBottom: '5px', color: '#6c757d' }}>
                📡 Network Status
              </div>
              {networkInfo && (
                <div style={{ padding: '8px', backgroundColor: '#f8f9fa', borderRadius: '4px' }}>
                  <div>
                    Status: <span style={{ color: networkInfo.online ? 'green' : 'red', fontWeight: 'bold' }}>
                      {networkInfo.online ? '✅ Online' : '❌ Offline'}
                    </span>
                  </div>
                  <div>Type: {networkInfo.type || 'unknown'}</div>
                  {networkInfo.downlink && networkInfo.downlink !== 'unknown' && (
                    <div>Speed: {networkInfo.downlink} Mbps</div>
                  )}
                </div>
              )}
            </div>

            {/* Device Information */}
            <div style={{ marginBottom: '15px' }}>
              <div style={{ fontWeight: 'bold', marginBottom: '5px', color: '#6c757d' }}>
                📱 Device Info
              </div>
              {deviceInfo && (
                <div style={{ padding: '8px', backgroundColor: '#f8f9fa', borderRadius: '4px' }}>
                  <div>Mobile: {deviceInfo.isMobile ? 'Yes' : 'No'}</div>
                  <div>Viewport: {deviceInfo.viewport.width} x {deviceInfo.viewport.height}</div>
                  <div>Screen: {deviceInfo.screen.width} x {deviceInfo.screen.height}</div>
                </div>
              )}
            </div>

            {/* Recent Errors */}
            <div>
              <div style={{ fontWeight: 'bold', marginBottom: '5px', color: '#6c757d' }}>
                ❌ Recent Errors ({errors.length})
              </div>
              {errors.length === 0 ? (
                <div style={{ padding: '8px', backgroundColor: '#f8f9fa', borderRadius: '4px', color: '#6c757d' }}>
                  No errors logged
                </div>
              ) : (
                <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
                  {errors.slice().reverse().map((error, index) => (
                    <div
                      key={index}
                      style={{
                        padding: '8px',
                        marginBottom: '5px',
                        backgroundColor: '#fff3cd',
                        border: '1px solid #ffc107',
                        borderRadius: '4px',
                        fontSize: '11px',
                      }}
                    >
                      <div style={{ color: '#856404', fontWeight: 'bold' }}>
                        {error.timestamp}
                      </div>
                      <div style={{ color: '#333', marginTop: '3px', wordBreak: 'break-word' }}>
                        {error.message}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
