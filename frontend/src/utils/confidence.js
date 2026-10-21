// Classifies a confidence number into a UI tier
export const getConfidenceTier = (confidence) => {
  if (confidence >= 85) return "high";
  if (confidence >= 60) return "medium";
  return "low";
};

