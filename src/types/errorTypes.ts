export type FieldError = string | undefined;

export type ItineraryItemError = {
  description?: FieldError;
  activities?: FieldError;
  meals?: FieldError;
  stay?: FieldError;
  transfer?: FieldError;
};
export type CoordinatesError ={
   latitude?: FieldError;
   longitude?:FieldError;
}

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
  corrdinates?:CoordinatesError;
  [key: string]: string | ItineraryItemError[]| undefined | Coord;
 
}
