const { Configuration, OpenAIApi } = require('openai');
const Config = new Configuration({ apikey:"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"});
const openai = new OpenAIApi(Config);

export async function sendMsgToOpenAI(message) {
    const res = await openai.createCompletion ({
        model: 'text-davinci-003',
        prompt: message,
        temperature: 0.7,
        max_tokens: 256,
        top_p: 1,
        frequency_penalty:0,
        presense_penalty:0

    });
    return res.data.choices[0].text;
}