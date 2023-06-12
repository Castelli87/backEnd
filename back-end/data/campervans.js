const campervans = [
  {
    vanName: "The Voyager",
    description: "The Volkswagen California is a versatile and comfortable campervan that offers a perfect blend of functionality and style. It is an ideal choice for your next adventure. ",
    make: 'Volkswagen',
    model: 'California',
    year: 2022,
    pricePerNight: 50,
    amenities:["kitchen", "sun roof", "dining area"],
    availabilityDates:{
      startDate:"2023-07-01",
      endDate:"2023-10-01"
    },
    images:["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8wKy1lKY3Wx2cPvKVs1lUWVnltoy4V2YOsw&usqp=CAU", "https://media.gq-magazine.co.uk/photos/5e74910306bab00008958011/16:9/pass/20200320-VW-Electric-03.jpg", "https://vanlifeadventure.com/wp-content/uploads/2019/06/vanlife-adventure-kepler-sixty-vw-camper-california-05.jpg", ],
    sleeps:2
  },
  {
    vanName: "Wanderlust",
    description:"Experience luxury and comfort on your next adventure with the Mercedes-Benz Sprinter campervan. This premium campervan offers a sleek design, top-notch amenities, and exceptional performance",
    make: 'Mercedes-Benz',
    model: 'Sprinter',
    year: 2021,
    pricePerNight: 60,
    amenities:["kitchen", "sun roof", "dining area", "double bed"],
    availabilityDates:{
      startDate:"2023-08-01",
      endDate:"2024-01-01"
    },
    images:["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8wKy1lKY3Wx2cPvKVs1lUWVnltoy4V2YOsw&usqp=CAU", "https://w8j3k6f9.stackpathcdn.com/news/wp-content/uploads/2017/08/Mercedes-Marco-Polo-Exterior-1.jpg"],
    sleeps:4
  },
  { description:"The Ford Transit campervan is a versatile and reliable choice for your next outdoor adventure. With its spacious interior, modern amenities, and impressive performance, it offers a comfortable and convenient travel experience",
    vanName: "Sea Change",
    make: 'Ford',
    model: 'Transit',
    year: 2023,
    pricePerNight: 40,
    amenities:["kitchen", "sun roof", "dining area", "air conditioning", "camping chairs"],
    availabilityDates:{
      startDate:"2023-09-01",
      endDate:"2024-10-01"
    },
    images:["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8wKy1lKY3Wx2cPvKVs1lUWVnltoy4V2YOsw&usqp=CAU", "https://www.woodstockcampers.co.uk/wp-content/uploads/2022/10/thumbnail_IMG_4963-scaled.jpg", "https://www.knaus.com/fileadmin/media/global/open-graphs/camper-van/ktg-knaus-camper-van-uebersicht-opengraph.jpg"],
    sleeps:3
  }
];

module.exports ={campervans}