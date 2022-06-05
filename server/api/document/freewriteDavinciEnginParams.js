const freeWriteDavinciEnginParams = {
prompt:`Let's think step by step how to write an article using [Story so far] and [Next Chunk]. [Story so far] is where you left off last time, and [Next Chunk] is the next piece of the article you should write. Each time you finish a section, use [Next Chunk] to generate paragraphs that are at least 10 sentences long without repeating the [Story so far] in the [Next Chunk].
######
[Story so far]:

It’s easier to sell to an existing customer than it is to acquire a new one. For this reason, you want to ensure that your customers are satisfied with your product or service so that you can retain them long enough to recoup the investment required to earn their business in the first place.

[Next Chunk]:

One of the best ways to keep your customers happy is to provide them with excellent customer service. When something goes wrong, they should be able to reach out to you and receive help quickly and easily. Of course, excellent customer service starts with having a great product. If you can’t provide that, then no amount of customer service will save you. But assuming you have a product or service that your customers need and want, here are some tips for providing them with the best possible experience:

Be responsive. When something goes wrong, your customers should be able to reach you easily and receive a response quickly.

Be proactive. If you know there is an issue with your product or service, reach out to your customers before they have a chance to contact you. This shows that you care about their experience and are willing to take steps to fix any problems.

Be available. Make sure your customer service team is easy to reach and available during reasonable hours. Nothing frustrates customers more than trying to get help only to find that no one is available.

Be human. Your customers are people, so treat them as such. Show them that you understand their frustration and are sympathetic to their situation.

By following these tips, you can provide your customers with the excellent service they deserve and keep them happy for years to come.

######
[Story so far]: Stories about American capitalism tend to have a recognizable villain: the robber baron, the business tycoon, the financial investor, your boss.
 
[Next Chunk]:

These stories usually have a recognizable hero, too: the union organizer, the muckraking journalist, the whistleblower. But the most fascinating characters in these stories are often the ones who don’t fit cleanly into either category. They’re people who, for better or worse, embody the contradictions of American capitalism.

Take Andrew Carnegie, for example. He was one of the most ruthless businessmen of his era, a steel magnate who crushed his competition and amassed a vast fortune. But he was also a philanthropist who gave away much of his money to good causes.

Or consider John D. Rockefeller, another legendary capitalist. He was a ruthless businessman who used any means necessary to build his oil empire. But he was also a devout Christian who believed in the power of philanthropy to improve society.

These men were not simply one-dimensional characters; they were complex and often contradictory figures. And their stories illustrate some of the most important aspects of American capitalism: its dynamism, its creativity, its capacity for both good and evil.

######
[Story so far]: `,
// Last_Token: '\nContinue: ',
temperature: 0.7,
max_tokens: 256,
top_p: 1,
n: 1,
frequency_penalty: 0.2,
presence_penalty: 0.1,
stop: ['######'],
};

module.exports = {
    freeWriteDavinciEnginParams,
};
