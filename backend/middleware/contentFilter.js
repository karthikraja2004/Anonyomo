const axios = require('axios');
const API_KEY = process.env.PERSPECTIVE_API_KEY;

const analyzeText = async (text) => {
    const DISCOVERY_URL = `https://commentanalyzer.googleapis.com/v1alpha1/comments:analyze?key=${API_KEY}`;
    const params = {
        comment: { text: text },
        requestedAttributes: {
            TOXICITY: {},
            THREAT: {},
            PROFANITY: {},
        },
    };

    try {
        const response = await axios.post(DISCOVERY_URL, params);
        const attributeScores = response.data.attributeScores;

        const result = {
            text: text,
            toxicity_percentage: (attributeScores.TOXICITY.summaryScore.value * 100).toFixed(2),
            profanity_percentage: (attributeScores.PROFANITY.summaryScore.value * 100).toFixed(2),
            threat_percentage: (attributeScores.THREAT.summaryScore.value * 100).toFixed(2),
            tags: Object.keys(attributeScores)
                .filter(key => attributeScores[key].summaryScore.value * 100 > 60)
                .map(key => key.toLowerCase()),
        };

        return result;
    } catch (error) {
        console.error('Error analyzing text:', error.message);
        // this is to allow posts when api calls are exceeded or some n/w issues
        return { tags: [] };
    }
};

module.exports = analyzeText;
