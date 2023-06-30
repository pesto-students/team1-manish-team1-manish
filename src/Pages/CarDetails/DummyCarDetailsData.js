const CarDetailsData = [
  {
    Id: 1,
    Brand: "Honda",
    Year: 2023,
    Model: "City",
    FualType: "Petrol",
    FualCapacity: 1.5,
    RegistrationYear: 2023,
    Engine: "1497cc",
    Variant: "V",
    Ownership: "First Owner",
    KmDriven: 50000,
    Transmission: "Manual",
    TransmissionShort: "MT",
    Insaurance: "Third Party",
    PinCode: 201010,
    LandMark: "ABC Mall",
    City: "BCD City",
    RegistrationNumber: "HR 26 CF 1234",
    SellerId: 23,
    BuyerId: null,
    NearestRtoOffice: "ABC RTO Office",
    Price: 1245000,
    Type: "I-VTEC",
    Tags: ["Tag1", "Tag2"],
    Images: [
      "https://res.cloudinary.com/dlbeskesi/image/upload/v1687680163/honda-side-front.webp",
      "https://res.cloudinary.com/dlbeskesi/image/upload/v1687680074/honda-back.webp",
      "https://res.cloudinary.com/dlbeskesi/image/upload/v1687680022/honda-right-back.webp",
      "https://res.cloudinary.com/dlbeskesi/image/upload/v1687679932/honda-front.webp",
    ],
    FeatureId: 5,
    SpecificationId: 5,
  },
];

const CarFeatures = [{
  "id": 5,
  "Power Steering": true,
  "Heater": true,
  "Anti lock Braking System": true,
  "Power Window Front": true,
  "Adjustable Head Lights": true,
  "Central Locking": true,
  "Air Conditioning": true,
  "Fog Lights Front": true,
  "Radio": true,
  "Fog Lights - Rear": false,
  "Cruise Control": true,
  "Automatic Climate Control": false
}];

const CarSpecifications = {
  "id": 6,
  "Mileage": 20.05,
  "Max Power (bhp)": 88.77,
  "Engine": 1497,
  "Torque": 200,
  "Seats": 5,
  "Displacement (cc)": 1498,
  "Brake Type (rear)": "Drum",
  "Brake Type (front)": "Disc",
  "Cylinders": 4,
  "Max Power (rpm)": 6600,
  "Emission Standard": "BSVI",
  "Fuel Tank Capacity": 42.0,
  "Body Type": "Sedan",
  "Boot Space (Litres)": 506
};

export { CarDetailsData, CarFeatures, CarSpecifications };
