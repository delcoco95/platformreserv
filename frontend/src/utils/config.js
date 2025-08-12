const config = {
  api: {
    baseUrl: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
    timeout: 10000,
  },
  app: {
    name: "RendezVousPro",
    version: "1.0.0",
  },
  features: {
    demoMode: false,
    realTimeUpdates: true,
    polling: {
      interval: 30000,
    },
  },
  ui: {
    pageSize: 20,
    maxServicesVisible: 3,
  },
};

export default config;
