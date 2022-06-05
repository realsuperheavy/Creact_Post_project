const QUOTE = 'Quote';

const quoteDavinciEnginParams = {
[QUOTE]: {
prompt: `When given a description, write quotes in a given tone.
###
Tone: Aggressive
Description: Deny allegations of corporate espionage
Quote: "These allegations are completely false and only serve to distract from the greater good of this corporation. I've been working for this company since day one, and I will continue to work for this company until the day I die. The accusations made are baseless and hurtful to both me and my family."
###
Tone: Friendly
Description: Respond to questions about the future of the company
Quote: "We are always looking to innovate and make this company better for both our shareholders and consumers. We are currently exploring new opportunities in the healthcare industry, but can not comment on any specifics at this time."
###
Tone: Sombre
Description: The death of mineworkers in one of the company's mines
Quote: "We are deeply saddened by the loss of life in our mine. We are working closely with the authorities to understand what went wrong and to ensure that it never happens again."
###
Tone: Confident
Description: Questions about the company's latest product launch
Quote: "I am happy to announce that our latest product launch, the XB-1, was an outstanding success. The product has exceeded our expectations in terms of sales, and we are confident that it will continue to do so."
###
Tone: Cautionary
Description: A warning about a rival company's business practices
Quote: "We are concerned about the business practices of the rival company. We have been informed that the rival company is engaging in a number of activities that are contrary to our values and our principles. We are concerned about the company's future and we will continue to work with the company to ensure that it does not continue to engage in these activities."
###
Tone: Joyful
Description: A review of the film Arrival
Quote: "Arrival is brilliantly thought-provoking and suspenseful, and I recommend it for anyone looking to be challenged."
###
Tone:`,

    lastToken: "\nQuote: ",
    temperature: 0.95,
    max_tokens: 60,
    top_p: 1,
    n: 10,
    frequency_penalty: 1.5,
    presence_penalty: 1.5,
    stop: ['###'],
},
};
module.exports = {
  quoteDavinciEnginParams,
};
