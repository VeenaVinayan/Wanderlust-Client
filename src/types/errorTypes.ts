export type FieldError = string | undefined;

export type ItineraryItemError = {
  description?: FieldError;
  activities?: FieldError;
  meals?: FieldError;
  stay?: FieldError;
  transfer?: FieldError;
};

export interface PackageFormError {
  name?: FieldError;
  description?: FieldError;
  images?: FieldError;
  category?: FieldError;
  day?: FieldError;
  night?: FieldError;
  price?: FieldError;
  totalCapacity?: FieldError;
  itinerary?: ItineraryItemError[];
  [key: string]: string | ItineraryItemError[]|undefined;
}
