const ARTICLE_HEADLINE = 'article-headline';
const EMAIL_SUBJECT = 'email-subject';
const PRODUCT_NAME = 'product-name';
const BUZZWORD = 'buzzword';
const BOOK_TITLE = 'book-title';
const WEBSITE_HERO_TITLE = 'website-hero-title';
const GENERAL_HEADLINE = 'general-headline';


export const HEADLINE_TYPES = {
  ARTICLE_HEADLINE,
  GENERAL_HEADLINE,
  EMAIL_SUBJECT,
  PRODUCT_NAME,
  BOOK_TITLE,
  BUZZWORD, 
  WEBSITE_HERO_TITLE,

};

export const HEADLINE_TYPE_LABELS = {
  [ARTICLE_HEADLINE]: 'Article Headline',
  [BOOK_TITLE]: 'Book Title',
  [BUZZWORD]: 'Buzzword',
  [EMAIL_SUBJECT]: 'Email Subject',
  [GENERAL_HEADLINE]: 'General Headline',
  [PRODUCT_NAME]: 'Product Name',
  [WEBSITE_HERO_TITLE]: 'Website Hero Text',
};

export const HEADLINE_TYPE_PLACEHOLDERS = {
[ARTICLE_HEADLINE]: 'e.g.  Give me a headline for an article about the importance of laughter....',
[BOOK_TITLE]: 'e.g.  Give me a title for a book about finding joy...',
[BUZZWORD]: 'e.g.  Give me a buzzword that describes a new baby boom...',
[EMAIL_SUBJECT]: 'e.g.  Give me a title for an email welcoming a new employee',
[GENERAL_HEADLINE]: 'e.g.  Give me a headline for an ad about the eating healthy...',
[PRODUCT_NAME]: 'e.g.  Give me a name for a new product that helps people fall in love ...',
[WEBSITE_HERO_TITLE]: 'e.g.  Give me a hero title for a website for a brand of dog food',

}; 