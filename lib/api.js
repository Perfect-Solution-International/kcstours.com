// ====================================================================
// KCSTours - Go Backend (Golang + MySQL) API Client
// Connects to Go REST Server at http://localhost:8080/api
// Features graceful local fallback if backend is offline.
// ====================================================================

const GO_API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api';

/**
 * Generic Fetcher for Go Backend
 */
export async function apiRequest(endpoint, options = {}) {
  try {
    const res = await fetch(`${GO_API_URL}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(options.headers || {})
      }
    });

    if (!res.ok) {
      throw new Error(`Go API returned status: ${res.status}`);
    }

    return await res.json();
  } catch (error) {
    console.warn(`[Go Backend Connection] ${endpoint} unreachable (${error.message}). Running with local client state.`);
    return null;
  }
}

// 1. Health Check
export async function checkGoBackendHealth() {
  return await apiRequest('/health');
}

// 2. Auth API
export async function loginAdminGo(username, password) {
  return await apiRequest('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ username, password })
  });
}

// 3. Tours API
export async function getToursFromDB() {
  return await apiRequest('/tours');
}

// 4. Bookings API
export async function getBookingsFromDB() {
  return await apiRequest('/bookings');
}

export async function createBookingInDB(bookingData) {
  return await apiRequest('/bookings', {
    method: 'POST',
    body: JSON.stringify(bookingData)
  });
}

export async function updateBookingStatusInDB(id, status) {
  return await apiRequest(`/bookings/${id}/status`, {
    method: 'PUT',
    body: JSON.stringify({ status })
  });
}

// 5. Fleet Telemetry API
export async function getFleetFromDB() {
  return await apiRequest('/fleet');
}

// 6. Inquiries API
export async function getInquiriesFromDB() {
  return await apiRequest('/inquiries');
}

export async function submitInquiryToDB(inquiryData) {
  return await apiRequest('/inquiries', {
    method: 'POST',
    body: JSON.stringify(inquiryData)
  });
}

// 7. Dashboard Metrics
export async function getDashboardMetricsFromDB() {
  return await apiRequest('/metrics');
}
