export interface QuotationResponse {
  title: string;
  airCraftsQuoation: Quotation[];
}

export interface Quotation {
  id: number
  createdAt: string
  updatedAt: string
  registration: string
  model: string
  manufacturer: string
  costPerKm: string
  numberOfSeats: number
  maxLoadWeight: number
  loadWeightType: string
  maxLoadVolume: number
  loadVolumeType: string
  cruisingSpeed: number
  description: string
  operationStatus: string
  date_cva: any
  status: string
  image: any
  imageKey: any
  lat: any
  lng: any
  company: {
    id: number
    createdAt: string
    updatedAt: string
    managerName: string
    managerDocument: string
    coa: string
    operatingSpecifications: string
    site: string
    document: string
    commercialPhone: string
    cellPhone: string
    phoneOnCall: string
    acceptWhatsappMessages: boolean
    owner: {
      id: number
      createdAt: string
      updatedAt: string
      name: string
      email: string
      phone: any
      type: string
      status: string
      image: string
      imageKey: string
      offerFlights: boolean
      searchFlights: boolean
    }
  }
  aircraftImgs: any[]
  arrivalAirport: {
    id: number
    createdAt: string
    updatedAt: string
    icao: string
    iata: string
    name: string
    city: string
    shortCountry: string
    lat: string
    lng: string
    continent: string
    type: string
    status: string
  }
  departureAirport: {
    id: number
    createdAt: string
    updatedAt: string
    icao: string
    iata: string
    name: string
    city: string
    shortCountry: string
    lat: string
    lng: string
    continent: string
    type: string
    status: string
  }
  distance: number
  quotation: number
  duration: string
  departureDate?: string | null;
  departureTime?: string | null;
}