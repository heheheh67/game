function getStoredUser() {
  const raw = localStorage.getItem('demoUser');
  if (raw) return JSON.parse(raw);
  const user = { full_name: 'Demo User', email: 'demo@locallove.test' };
  localStorage.setItem('demoUser', JSON.stringify(user));
  return user;
}

export const base44 = {
  auth: {
    me() {
      return Promise.resolve(getStoredUser());
    },
    redirectToLogin() {
      localStorage.setItem('demoUser', JSON.stringify({ full_name: 'Demo User', email: 'demo@locallove.test' }));
      window.location.reload();
    },
    logout() {
      localStorage.removeItem('demoUser');
      window.location.reload();
    },
  },
};
