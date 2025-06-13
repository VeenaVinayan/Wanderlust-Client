export const PackageInitialState = {
    name:"",
    description: '',
    price:0,
    day:1,
    night:0,
    agent:'',
    images:[],
    category:'',
    totalCapacity:0,
    discount:0,
    itinerary:[{
        day:1,
        description:'',
        meals:[],
        activities:'',
        stay:'',
        transfer:'',
    }]
}
export const FormErrorInitialState = {
        name: "",
        description: "",
        price: '',
        day: '',
        night: '',
        images: '',
        category: "",
        totalCapacity:"",
        discount:'',
        itinerary: [ 
          {
            day: '',
            description: "",
            meals: [] as string[],
            activities: "",
            stay: "",
            transfer: "",
          }]
}