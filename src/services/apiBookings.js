import { parseJsonApiData } from "../utils/helpers"
import { fetchApi } from "./apiRequest";



// GET /api/v1/bookings
export async function getBookings({ filter, sortBy, page }) {
  const queryParams = new URLSearchParams();
  if (filter) {
    queryParams.append('filter_field', filter.field);
    queryParams.append('filter_value', filter.value);
    if (filter.method) queryParams.append('filter_method', filter.method);
  }
  if (sortBy) {
    queryParams.append('sort_field', sortBy.field);
    queryParams.append('sort_direction', sortBy.direction);
  }
  if (page) {
    queryParams.append('page', page);
    queryParams.append('per_page', 10);
  }

  const url = `/api/v1/bookings?${queryParams.toString()}`;
  const response = await fetchApi(url, {
    method: 'GET',
  });

  return {
    data: parseJsonApiData(response.data, response.included || []),
    count: response.meta?.total_count || response.data.length,
  };
}

// GET /api/v1/bookings/:id
export async function getBooking(id) {
  const url = `/api/v1/bookings/${id}`;
  const response = await fetchApi(url, {
    method: 'GET',
  });

  return parseJsonApiData(response.data, response.included || []);
}

// GET /api/v1/bookings/after/:date
export async function getBookingsAfterDate(date) {
  // Handle object input or invalid date
  let dateString = date;
  if (typeof date === 'object' && date !== null) {
    dateString = date.date || Object.values(date)[0];
  }
  if (!dateString || !/^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
    throw new Error('Invalid date format, expected YYYY-MM-DD');
  }

  const url = `/api/v1/bookings/after/${dateString}`;
  const response = await fetchApi(url, {
    method: 'GET',
  });

  return response.data.map(item => ({
    id: item.id,
    created_at: item.attributes.created_at,
    total_price: item.attributes.total_price,
    extras_price: item.attributes.extras_price,
  }));
}

// GET /api/v1/bookings/stays/after/:date
export async function getStaysAfterDate(date) {
  const url = `/api/v1/bookings/stays/after/${date}`;
  const response = await fetchApi(url, {
    method: 'GET',
  });

  return parseJsonApiData(response.data, response.included || []);
}

// GET /api/v1/bookings/today
export async function getStaysTodayActivity() {
  const url = `/api/v1/bookings/today`;
  const response = await fetchApi(url, {
    method: 'GET',
  });

  return parseJsonApiData(response.data, response.included || []);
}

// POST /api/v1/cabins/:cabinId/bookings
export async function createBooking(booking, cabinId) {
  const url = `/api/v1/cabins/${cabinId}/bookings`;
  const response = await fetchApi(url, {
    method: 'POST',
    body: { booking },
  });

  return parseJsonApiData(response.data, response.included || []);
}

// PUT /api/v1/bookings/:id
export async function updateBooking(id, obj) {
  const url = `/api/v1/bookings/${id}`;
  const response = await fetchApi(url, {
    method: 'PUT',
    body: { booking: obj },
  });

  return parseJsonApiData(response.data, response.included || []);
}

// DELETE /api/v1/bookings/:id
export async function deleteBooking(id) {
  const url = `/api/v1/bookings/${id}`;
  const response = await fetchApi(url, {
    method: 'DELETE',
  });

  return { message: response.meta?.message || 'Booking deleted' };
}

