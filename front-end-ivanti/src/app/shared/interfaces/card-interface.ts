/**
 * CardComponent is a reusable component that displays a card with a title and content.
 * * @interface CardInterface
 * * @property {string} [title] - The title of the card, which is displayed prominently at the top.
 * * @property {string} [body] - The main content of the card, which can include text, images, or other elements.
 * * @property {number} id - A unique identifier for the card, which can be used for tracking or referencing the card in a list.
 * * * @property {number} [userId] - An optional property that can be used to associate the card with a specific user, if applicable.
 */
export interface CardInterface {
  title?: string;
  body?: string;
  id: number;
  userId?: number;
}
