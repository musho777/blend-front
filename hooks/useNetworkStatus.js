"use client";

import { useState, useEffect } from 'react';

/**
 * Hook to detect network status changes
 * Particularly useful for detecting unstable connections on Safari/5G
 * @returns {Object} { isOnline, connectionType }
 */
export function useNetworkStatus() {
  const [isOnline, setIsOnline] = useState(true);
  const [connectionType, setConnectionType] = useState('unknown');

  useEffect(() => {
    // Initial check
    setIsOnline(navigator.onLine);

    // Get connection type if available (Safari may not support this)
    if ('connection' in navigator) {
      const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
      if (connection) {
        setConnectionType(connection.effectiveType || 'unknown');
      }
    }

    // Listen for online/offline events
    const handleOnline = () => {
      console.log('Network: Back online');
      setIsOnline(true);
    };

    const handleOffline = () => {
      console.log('Network: Gone offline');
      setIsOnline(false);
    };

    // Listen for connection changes (if supported)
    const handleConnectionChange = () => {
      if ('connection' in navigator) {
        const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
        if (connection) {
          const newType = connection.effectiveType || 'unknown';
          console.log(`Network: Connection changed to ${newType}`);
          setConnectionType(newType);
        }
      }
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    if ('connection' in navigator) {
      const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
      if (connection) {
        connection.addEventListener('change', handleConnectionChange);
      }
    }

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);

      if ('connection' in navigator) {
        const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
        if (connection) {
          connection.removeEventListener('change', handleConnectionChange);
        }
      }
    };
  }, []);

  return { isOnline, connectionType };
}
