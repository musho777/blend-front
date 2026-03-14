# 🐛 Mobile Data Loading - Debugging Guide

This guide explains how to detect and debug data loading issues, especially on mobile devices.

## 📋 Overview

The application now includes comprehensive error detection and debugging tools to help identify why data might not be loading on mobile devices.

## 🎯 New Features Added

### 1. **Global Error Handler** (`utils/errorHandler.js`)

Centralized error handling with mobile-specific logging.

#### Features:
- ✅ Automatic error alerts in development mode
- ✅ Mobile device detection
- ✅ Network status checking
- ✅ Detailed error logging with context

#### Usage Example:
```javascript
import { handleDataError, logMobileError, checkNetworkStatus } from '@/utils/errorHandler';

// In your component or service
try {
  const data = await fetchData();
} catch (error) {
  handleDataError(error, 'ProductList component');
}

// Check network status
const network = checkNetworkStatus();
console.log(network); // { online: true, type: '4g', downlink: 10 }
```

---

### 2. **Enhanced QueryProvider** (`providers/QueryProvider.js`)

React Query now includes global error handling and network monitoring.

#### New Features:
- ✅ Automatic error detection for all queries and mutations
- ✅ User-friendly toast notifications for errors
- ✅ Network offline/online detection
- ✅ Automatic refetch when connection is restored
- ✅ Development mode alerts

#### What You'll See:
- **When offline:** "You are offline. Some features may not work."
- **When back online:** "Connection restored!" + automatic data refresh
- **On query error:** Error message in console + user-friendly toast

---

### 3. **Enhanced API Client** (`services/api/client.js`)

The API client now includes advanced error detection and timeout handling.

#### New Features:
- ✅ **Request timeout:** 30 seconds (prevents hanging on slow connections)
- ✅ **Slow request detection:** Warns if request takes >5 seconds
- ✅ **Network status logging:** Logs connection type and speed
- ✅ **Better error messages:** User-friendly error messages for common issues
- ✅ **Mobile-specific error logging:** Detailed logs with device/network context

#### Error Messages:
| Scenario | Error Message |
|----------|---------------|
| No internet | "No internet connection. Please check your network and try again." |
| Timeout | "Request timed out. Please check your connection and try again." |
| Failed fetch | "Cannot connect to server. Please check your internet connection." |

---

### 4. **Network Status Indicator** (`components/NetworkStatusIndicator.js`)

Visual indicator showing network status (mobile-focused).

#### Features:
- ✅ Shows at top of page when offline
- ✅ Green bar when online (development mode only)
- ✅ Red bar when offline (always visible)
- ✅ Shows connection type and speed in development mode
- ✅ Only visible on mobile devices (unless forced)

#### Customization:
```jsx
// Show on desktop too
<NetworkStatusIndicator showOnDesktop={true} />

// Default: only mobile
<NetworkStatusIndicator />
```

---

### 5. **Debug Panel** (`components/DebugPanel.js`)

Floating debug panel for development (only visible in dev mode).

#### Features:
- ✅ **Network Status:** Real-time connection info (online/offline, type, speed)
- ✅ **Device Info:** Mobile detection, viewport size, screen size
- ✅ **Recent Errors:** Last 10 console errors with timestamps
- ✅ **Auto-refresh:** Updates network status every 3 seconds
- ✅ **Floating Button:** 🐛 button in bottom-right corner

#### How to Use:
1. Run app in development mode: `npm run dev`
2. Look for the 🐛 button in bottom-right corner
3. Click to open debug panel
4. View network status, device info, and recent errors
5. Click "Clear Errors" to reset error list

#### What You'll See:
```
📡 Network Status
  Status: ✅ Online
  Type: 4g
  Speed: 10 Mbps

📱 Device Info
  Mobile: Yes
  Viewport: 375 x 667
  Screen: 375 x 667

❌ Recent Errors (2)
  14:30:15
  API Client Error: Request timeout

  14:29:45
  Query: products/category Error loading data
```

---

## 🚀 How to Test Mobile Issues

### Method 1: Development Mode Alerts

1. **Enable dev mode:**
   ```bash
   npm run dev
   ```

2. **Trigger an error:**
   - Turn off WiFi/mobile data
   - Try loading products
   - You'll see an alert with error details

3. **Alert will show:**
   ```
   🚨 Data Loading Error 🚨
   Context: Query: products/category/123
   Message: No internet connection
   Online: No ⚠️
   Time: 14:30:15
   ```

### Method 2: Debug Panel

1. **Open debug panel:**
   - Click the 🐛 button (bottom-right)

2. **Monitor in real-time:**
   - Network status updates every 3 seconds
   - Errors appear as they happen
   - See device and network details

3. **Simulate issues:**
   - Disable network → See red "Offline" status
   - Slow connection → See slow request warnings
   - API errors → See in error list

### Method 3: Console Logging

All errors are logged to console with detailed info:

```javascript
📱 Mobile Error Log: {
  "error": "Request timeout",
  "isMobile": true,
  "network": {
    "online": true,
    "type": "3g",
    "downlink": 2
  },
  "viewport": {
    "width": 375,
    "height": 667
  },
  "endpoint": "/api/products",
  "duration": 30000
}
```

---

## 🔍 Common Mobile Issues & Solutions

### Issue 1: Data Not Loading
**Symptoms:** Spinner keeps spinning, no data appears

**Debug Steps:**
1. Open Debug Panel → Check network status
2. Check console for error messages
3. Look for timeout errors (>30s)

**Common Causes:**
- No internet connection
- Slow 2G/3G connection causing timeout
- API server down
- Wrong API URL in `.env.local`

**Solutions:**
- Check `NEXT_PUBLIC_API_URL` in `.env.local`
- Increase timeout in `services/api/client.js`
- Check backend server is running

### Issue 2: Slow Loading
**Symptoms:** Data loads but very slowly

**Debug Steps:**
1. Watch console for "⚠️ Slow API Request" warnings
2. Check network type in Debug Panel
3. Look at duration in error logs

**Solutions:**
- Reduce initial data load size
- Add pagination
- Implement infinite scroll
- Optimize images (use Next.js Image)
- Add skeleton loaders

### Issue 3: Intermittent Failures
**Symptoms:** Sometimes works, sometimes doesn't

**Debug Steps:**
1. Monitor network status changes
2. Check if failures correlate with network type changes
3. Look for "Failed to fetch" errors

**Solutions:**
- Improve retry logic in `QueryProvider.js`
- Add optimistic UI updates
- Implement request queuing
- Use service workers for offline support

---

## 📊 Error Monitoring in Production

### Option 1: Manual Logging
Errors are logged with `logMobileError()` - you can send these to your backend:

```javascript
// In utils/errorHandler.js
export const logMobileError = (error, additionalInfo = {}) => {
  const errorLog = { /* ... */ };

  // Send to your backend
  if (process.env.NODE_ENV === 'production') {
    fetch('/api/log-error', {
      method: 'POST',
      body: JSON.stringify(errorLog),
    }).catch(() => {/* ignore */});
  }

  return errorLog;
};
```

### Option 2: Use Error Tracking Service
Integrate services like:
- **Sentry** - https://sentry.io
- **LogRocket** - https://logrocket.com
- **Bugsnag** - https://bugsnag.com

---

## ⚙️ Configuration Options

### Adjust Request Timeout
In `services/api/client.js`:
```javascript
const REQUEST_TIMEOUT = 30000; // 30 seconds (default)
// Increase for very slow connections:
const REQUEST_TIMEOUT = 60000; // 60 seconds
```

### Adjust Slow Request Warning
```javascript
// Log slow requests (might indicate mobile/network issues)
if (duration > 5000) {  // 5 seconds (default)
  console.warn(`⚠️ Slow API Request...`);
}
// Change to:
if (duration > 3000) {  // 3 seconds for stricter warning
```

### Disable Production Toasts
In `providers/QueryProvider.js`:
```javascript
onError: (error, query) => {
  handleDataError(error, ...);

  // Only show toasts in development
  if (process.env.NODE_ENV === 'development') {
    toast.error(error?.message || 'Failed to load data');
  }
}
```

### Force Desktop Debug Panel
In `app/layout.js`:
```jsx
<DebugPanel forceShow={true} />
```

---

## 🎨 Customizing Error Messages

### User-Facing Messages
Edit in `providers/QueryProvider.js`:
```javascript
if (!navigator.onLine) {
  toast.error('No internet connection. Please check your network.');
} else {
  toast.error('Something went wrong. Please try again.');
}
```

### Development Alerts
Edit in `utils/errorHandler.js`:
```javascript
const alertMessage = `
Your custom alert message here
Context: ${context}
Message: ${errorInfo.message}
`.trim();
```

---

## 📱 Testing on Real Mobile Devices

### Via Network URL:
1. Run dev server: `npm run dev`
2. Find your local IP: `ipconfig` (Windows) or `ifconfig` (Mac/Linux)
3. Access from mobile: `http://192.168.1.XXX:3000`
4. Debug panel will show mobile device info

### Via Chrome DevTools:
1. Open Chrome DevTools (F12)
2. Toggle device toolbar (Ctrl+Shift+M)
3. Select mobile device
4. Throttle network (Fast 3G, Slow 3G, Offline)
5. Test loading behavior

### Via Remote Debugging:
1. Enable USB debugging on Android
2. Connect to computer
3. Open `chrome://inspect`
4. Inspect your device
5. See console logs and debug panel

---

## 🆘 Quick Troubleshooting Checklist

When data doesn't load on mobile:

- [ ] Check Debug Panel network status
- [ ] Look at console for errors
- [ ] Verify `NEXT_PUBLIC_API_URL` in `.env.local`
- [ ] Test backend API directly (Postman/browser)
- [ ] Check mobile device has internet
- [ ] Try disabling/enabling WiFi
- [ ] Clear browser cache
- [ ] Check if other pages load
- [ ] Look for CORS errors in console
- [ ] Verify auth token is valid
- [ ] Test on different network (WiFi vs mobile data)

---

## 📞 Need More Help?

If you're still experiencing issues:

1. **Check error logs:** Look in browser console for detailed errors
2. **Enable debug panel:** Get real-time network and device info
3. **Test network:** Use Chrome DevTools network throttling
4. **Review API logs:** Check backend server logs
5. **Compare environments:** Test on different devices/networks

---

## 🔄 Next Steps

Consider adding:
- [ ] Offline mode with service workers
- [ ] Request retry with exponential backoff
- [ ] Optimistic UI updates
- [ ] Error boundary components
- [ ] Integration with error tracking service (Sentry)
- [ ] Analytics for error rates
- [ ] User feedback mechanism for errors

---

**Happy Debugging! 🐛🔍**
