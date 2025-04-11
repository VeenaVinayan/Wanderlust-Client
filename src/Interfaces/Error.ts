export interface ItineraryError {
    day?: string;
    description?: string;
    meals?: string[];
    activities?: string;
    stay?: string;
    transfer?: string;
  }
  
  export interface PackageFormErrors {
    name?: string;
    description?: string;
    price?: string;
    day?: string;
    night?: string;
    images?: string;
    category?: string;
    totalCapacity:string;
    itinerary?: ItineraryError[];
  }

