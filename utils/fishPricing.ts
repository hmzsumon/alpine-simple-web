/* Only explicitly recognized fish categories allow an order-only price. */
export const isFishCategory=(category:string)=>["fish","মাছ","fish & seafood"].includes(category.normalize("NFKC").trim().toLowerCase());
