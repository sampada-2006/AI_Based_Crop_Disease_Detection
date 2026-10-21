export const SCENARIOS = {
  sampleHigh: {
    cropId: "tomato",
    diseaseId: "earlyBlight",
    confidence: 94,
    affectedAreaPercent: 11,
  },
  sampleMedium: {
    cropId: "tomato",
    diseaseId: "earlyBlight",
    confidence: 72,
    affectedAreaPercent: 18,
  },
  sampleLow: {
    cropId: "tomato",
    diseaseId: null,
    confidence: 52,
    affectedAreaPercent: 25,
    alternates: [
      { diseaseId: "earlyBlight", confidence: 52 },
      {
        name: {
          mr: "सेप्टोरिया लीफ स्पॉट",
          en: "Septoria Leaf Spot",
        },
        confidence: 41,
      },
    ],
  },
  sampleHealthy: {
    cropId: "tomato",
    diseaseId: "healthy",
    confidence: 96,
    affectedAreaPercent: 0,
  },
};

export default SCENARIOS;
