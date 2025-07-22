exports.scanPlant = async (req, res) => {
  // In a real app, you would send the image to an AI API here
  // For demo, return a random health status and advice
  const statuses = [
    { status: 'Healthy', advice: 'Your plant looks great! Keep up the good work.' },
    { status: 'Needs Water', advice: 'The soil looks dry. Water your plant soon.' },
    { status: 'Overwatered', advice: 'Leaves look yellow. Let the soil dry out before watering again.' },
    { status: 'Low Light', advice: 'Move your plant to a brighter spot.' },
    { status: 'Pest Detected', advice: 'Check for bugs on the leaves and treat if necessary.' },
    { status: 'Nutrient Deficiency', advice: 'Consider fertilizing your plant.' }
  ];
  const result = statuses[Math.floor(Math.random() * statuses.length)];
  res.json({
    healthStatus: result.status,
    advice: result.advice,
    image: req.file ? req.file.filename : null
  });
}; 