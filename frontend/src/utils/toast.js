// Toast Notification System
let toastCounter = 0;
const toastCallbacks = new Set();

export const subscribe = (callback) => {
  toastCallbacks.add(callback);
  return () => toastCallbacks.delete(callback);
};

export const notify = {
  success: (message, duration = 3000) => {
    const id = toastCounter++;
    const toast = { id, message, type: 'success', duration };
    toastCallbacks.forEach((cb) => cb(toast));
    if (duration > 0) setTimeout(() => removeToast(id), duration);
    return id;
  },

  error: (message, duration = 3000) => {
    const id = toastCounter++;
    const toast = { id, message, type: 'error', duration };
    toastCallbacks.forEach((cb) => cb(toast));
    if (duration > 0) setTimeout(() => removeToast(id), duration);
    return id;
  },

  warning: (message, duration = 3000) => {
    const id = toastCounter++;
    const toast = { id, message, type: 'warning', duration };
    toastCallbacks.forEach((cb) => cb(toast));
    if (duration > 0) setTimeout(() => removeToast(id), duration);
    return id;
  },

  info: (message, duration = 3000) => {
    const id = toastCounter++;
    const toast = { id, message, type: 'info', duration };
    toastCallbacks.forEach((cb) => cb(toast));
    if (duration > 0) setTimeout(() => removeToast(id), duration);
    return id;
  },
};

export const removeToast = (id) => {
  toastCallbacks.forEach((cb) => cb({ id, removed: true }));
};
