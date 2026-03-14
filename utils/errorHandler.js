/**
 * Global error handler for debugging data loading issues
 * Shows alerts in development mode, logs in production
 */

export const handleDataError = (error, context = '') => {
  const isDevelopment = process.env.NODE_ENV === 'development';

  const errorInfo = {
    message: error?.message || 'Unknown error',
    context,
    timestamp: new Date().toISOString(),
    userAgent: typeof window !== 'undefined' ? window.navigator.userAgent : 'N/A',
    online: typeof window !== 'undefined' ? window.navigator.onLine : true,
    url: typeof window !== 'undefined' ? window.location.href : 'N/A',
  };

  // Log to console always
  console.error('❌ Data Loading Error:', errorInfo);

  // Show alert in development mode for immediate debugging
  if (isDevelopment && typeof window !== 'undefined') {
    const alertMessage = `
🚨 Data Loading Error 🚨
Context: ${context}
Message: ${errorInfo.message}
Online: ${errorInfo.online ? 'Yes' : 'No ⚠️'}
Time: ${new Date().toLocaleTimeString()}
    `.trim();

    alert(alertMessage);
  }

  return errorInfo;
};

/**
 * Check if device is mobile
 */
export const isMobileDevice = () => {
  if (typeof window === 'undefined') return false;

  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
};

/**
 * Check network status
 */
export const checkNetworkStatus = () => {
  if (typeof window === 'undefined') return { online: true, type: 'unknown' };

  return {
    online: navigator.onLine,
    type: navigator.connection?.effectiveType || 'unknown',
    downlink: navigator.connection?.downlink || 'unknown',
  };
};

/**
 * Log detailed error for mobile debugging
 */
export const logMobileError = (error, additionalInfo = {}) => {
  const isMobile = isMobileDevice();
  const network = checkNetworkStatus();

  const errorLog = {
    error: error?.message || error,
    isMobile,
    network,
    viewport: typeof window !== 'undefined' ? {
      width: window.innerWidth,
      height: window.innerHeight,
    } : null,
    ...additionalInfo,
  };

  console.error('📱 Mobile Error Log:', JSON.stringify(errorLog, null, 2));

  return errorLog;
};
