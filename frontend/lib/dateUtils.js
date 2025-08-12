export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

export const formatTime = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleTimeString("fr-FR", {
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const formatDateTime = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleString("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const isToday = (dateString) => {
  const date = new Date(dateString);
  const today = new Date();
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
};

export const isFuture = (dateString) => {
  const date = new Date(dateString);
  return date > new Date();
};

export const isPast = (dateString) => {
  const date = new Date(dateString);
  return date < new Date();
};

export const addMinutes = (dateString, minutes) => {
  const date = new Date(dateString);
  date.setMinutes(date.getMinutes() + minutes);
  return date.toISOString();
};

export const addDays = (dateString, days) => {
  const date = new Date(dateString);
  date.setDate(date.getDate() + days);
  return date.toISOString();
};

export const now = () => {
  return new Date().toISOString();
};

export const fromDate = (date) => {
  return date.toISOString();
};

export const parseDate = (dateString) => {
  return new Date(dateString);
};
