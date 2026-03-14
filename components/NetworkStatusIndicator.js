"use client";

import { useState, useEffect } from 'react';
import { checkNetworkStatus, isMobileDevice } from '@/utils/errorHandler';

/**
 * Network Status Indicator - Shows connection status especially on mobile
 * Useful for debugging data loading issues
 */
export default function NetworkStatusIndicator({ showOnDesktop = false }) {
  const [isOnline, setIsOnline] = useState(true);
  const [networkInfo, setNetworkInfo] = useState(null);
  const [showIndicator, setShowIndicator] = useState(false);
  const isMobile = typeof window !== 'undefined' && isMobileDevice();

  useEffect(() => {
    // Only show on mobile unless specified otherwise
    if (!isMobile && !showOnDesktop) {
      return;
    }

    const updateNetworkStatus = () => {
      const status = checkNetworkStatus();
      setIsOnline(status.online);
      setNetworkInfo(status);
      setShowIndicator(true);
    };

    const handleOnline = () => {
      updateNetworkStatus();
    };

    const handleOffline = () => {
      setIsOnline(false);
      setShowIndicator(true);
    };

    // Initial check
    updateNetworkStatus();

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [isMobile, showOnDesktop]);

  // Don't render if not mobile and not forced to show
  if (!isMobile && !showOnDesktop) {
    return null;
  }

  // Only show in development mode or when offline
  const isDevelopment = process.env.NODE_ENV === 'development';
  if (!isDevelopment && isOnline) {
    return null;
  }

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 9998,
        backgroundColor: isOnline ? '#28a745' : '#dc3545',
        color: 'white',
        padding: '8px 16px',
        textAlign: 'center',
        fontSize: '12px',
        fontWeight: 'bold',
        boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
        display: showIndicator ? 'block' : 'none',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
        <span>{isOnline ? '✅' : '❌'}</span>
        <span>
          {isOnline ? 'Online' : 'Offline - No Internet Connection'}
        </span>
        {isDevelopment && networkInfo && (
          <span style={{ opacity: 0.8, fontSize: '11px' }}>
            ({networkInfo.type}
            {networkInfo.downlink && networkInfo.downlink !== 'unknown' ? ` - ${networkInfo.downlink} Mbps` : ''})
          </span>
        )}
      </div>
    </div>
  );
}
