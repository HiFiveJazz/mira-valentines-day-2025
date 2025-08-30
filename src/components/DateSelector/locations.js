const CHARACTER_LIMIT = 140;

const rawLocations = [
  {
    imageUrl:
      'https://assets0.dostuffmedia.com/uploads/aws_asset/aws_asset/7280259/62b75663-78d4-428c-8d4f-f77c5c464f33.jpg',
    title: 'Birch Aquarium',
    description:
      'This aquarium serves as the public outreach center for Scripps at the UCSD, with over half a million people visiting the aquarium each year.',
    clipboard:
      '2300 Expedition Way, La Jolla, CA 92037',
    tags: ['San Diego','Hangout'],
  },
  {
    imageUrl:
      'https://6amcity.brightspotcdn.com/dims4/default/811b6b1/2147483647/strip/true/crop/3888x2189+0+202/resize/1000x563!/format/webp/quality/90/?url=https%3A%2F%2Fk1-prod-sixam-city.s3.us-east-2.amazonaws.com%2Fbrightspot%2Fda%2F6c%2F8533a0794d82844eabbb41604a92%2Ftheflowerfields-by-marciegonzalez-14.jpg',
    title: "Flower Fields",
    description:
      "An attraction every spring, Flower Fields is a rainbow of beautiful ranunculus flowers set on a hillside that overlooks the coastline. ",
    clipboard:
      '5704 Paseo Del Norte, Carlsbad, CA 92008',
    tags: ['San Diego','Hangout','Nature'],
  },
  {
    imageUrl:
      'https://bloximages.newyork1.vip.townnews.com/kitv.com/content/tncms/assets/v3/editorial/4/1c/41cf7460-1600-11ee-9b9d-4752e3d4f39b/649caf60b37d4.image.jpg?resize=400%2C400',
    title: 'Safari Park',
    description:
      "Potato Corner is a Filipino-founded global food chain that sells flavored french fries, which are a popular snack in the Philippines and internationally. Founded in 1992, the company serves various seasoned fries.",
    clipboard:
      'Potato Corner, 3030 Plaza Bonita Rd, National City, CA 91950',
    tags: ['San Diego','Food'],
  },
  {
    imageUrl:
      'https://bloximages.newyork1.vip.townnews.com/kitv.com/content/tncms/assets/v3/editorial/4/1c/41cf7460-1600-11ee-9b9d-4752e3d4f39b/649caf60b37d4.image.jpg?resize=400%2C400',
    title: 'Potato Corner',
    description:
      "Potato Corner is a Filipino-founded global food chain that sells flavored french fries, which are a popular snack in the Philippines and internationally. Founded in 1992, the company serves various seasoned fries.",
    clipboard:
      'Potato Corner, 3030 Plaza Bonita Rd, National City, CA 91950',
    tags: ['San Diego','Food'],
  },
  {
    imageUrl:
      'https://www.top100golfcourses.com/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2F03mhssoh%2Fproduction%2F0497979982b5bec3f77447355b0120ba50153091-1600x899.jpg&w=3840&q=75',
    title: 'Torrey Pines',
    description:
      "Several scenic hiking trails in La Jolla, California, renowned for its breathtaking coastal views, unique geology, and rare Torrey trees.",
    clipboard:
      '12600 N Torrey Pines Rd, La Jolla, CA 92037',
    tags: ['San Diego','Hiking'],
  },
  {
    imageUrl:
      'https://tableagent.s3.amazonaws.com/media/originals/2421_5595.jpg',
    title: "Ikuru Sushi",
    description:
      "Located in San Diego, known for its Japanese sushi variety!",
    clipboard:
      '2850 Womble Rd Ste 105 San Diego, CA 92106',
    tags: ['San Diego','Food'],
  },
  {
    imageUrl:
      'https://mallmaverick.imgix.net/web/property_managers/25/properties/271/galleries/20221206002904/Insidebanner-aboutus.png',
    title: "Canyon Crest",
    description:
      "Neighborhood shopping center with a variety of retailers & cafes in scenic surrounds with fountains in Riverside.",
    clipboard:
      '5225 Canyon Crest Dr, Riverside, CA 92507',
    tags: ['Riverside','Hangout','Shopping'],
  },
  {
    imageUrl:
      'https://hiddenca.com/wp-content/uploads/2020/11/Prospect-Park-3-1024x683.jpg',
    title: "Prospect Park",
    description:
      "Picturesque park with an amphitheater & orange grove, plus walking trails & picnic facilities located in Redlands.",
    clipboard:
      '1352 Prospect Dr, Redlands, CA 92373',
    tags: ['Riverside','Hangout','Nature'],
  },
  {
    imageUrl:
      'https://www.sbsun.com/wp-content/uploads/2020/02/SBS-L-CALSKATE-0201-16x9-1-1.jpg?w=978',
    title: "Cal Skate GT",
    description:
      "Roller-skating rink in Riverside that has theme nights, pizza cafe & skate classes & is bookable for private parties.",
    clipboard:
      '22080 Commerce Wy, Grand Terrace, CA 92313',
    tags: ['Riverside','Hangout'],
  },
  {
    imageUrl:
      'https://image-tc.galaxy.tf/wijpeg-efwu5khipe9ne56kh7ufaw6sn/mi-authorsrow-newopt-result.jpg',
    title: "Mission Inn",
    description:
      "A Grand Spanish Mission-style hotel with a 5-story rotunda close to the Riverside Convention Center and the Riverside Art Museum",
    clipboard:
      '3649 Mission Inn Avenue, Riverside, CA 92501',
    tags: ['Riverside','Hangout'],
  },
  {
    imageUrl:
      'https://plantly.io/wp-content/uploads/2022/12/UCR.jpg',
    title: "UCR Gardens",
    description:
      "40 acres of botanical gardens containing more than 3,500 plant species from around the world.",
    clipboard:
      '1 Botanic Gardens Dr, Riverside, CA 92507',
    tags: ['Riverside','Hangout','Nature'],
  },
  {
    imageUrl:
      'https://cdn-assets.alltrails.com/static-map/production/area/10163835/parks-us-california-sycamore-canyon-wilderness-park-10163835-20210126080303000000000-1200x630-3-41611658848.jpg',
    title: "Sycamore Park",
    description:
      "Sycamore Canyon Park is a beautiful area for hiking, biking, and picnics! Trail is open year round.",
    clipboard:
      'Sycamore Canyon Park',
    tags: ['Riverside','Hiking'],
  },
  {
    imageUrl:
      'https://cloudfront-us-east-1.images.arcpublishing.com/brookfieldproperties/AWMP67MTN5FNZDGLBWCYDV5BNA.jpg',
    title: "Galleria at Tyler",
    description:
      "Formerly known as Tyler Mall, is a shopping mall located in Riverside, features JCPenney, and Macy's, in addition to an AMC Theatres.",
    clipboard:
      '1299 Galleria at Tyler, Riverside, CA 92503',
    tags: ['Riverside','Shopping'],
  },
  //San Diego
  {
    imageUrl:
      'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/28/5e/1c/c2/overview-at-jfg.jpg?w=1200&h=-1&s=1',
    title: "JF Garden",
    description:
      "The Japanese Friendship Garden is an expression of friendship between San Diego and its sister city Yokohama in Balboa Park.",
    clipboard:
      '2215 Pan American E Rd, San Diego, CA 92101',
    tags: ['San Diego','Hangout', 'Nature'],
  },
  {
    imageUrl:
      'https://rentalwithaview.com/wp-content/uploads/2017/11/seaport-village.jpg',
    title: "Seaport Village",
    description:
      "A waterfront shopping and dining complex adjacent to San Diego Bay. The complex houses more than 70 shops, galleries, and eateries",
    clipboard:
      '849 W Harbor Dr, San Diego, CA 92101',
    tags: ['San Diego','Hangout','Shopping'],
  },
  {
    imageUrl:
      'https://drupal-prod.visitcalifornia.com/sites/default/files/styles/fluid_1920/public/vc_spotlightlongbeach_module2_aquariumofthepacific_st_ed_534551024_1280x640.jpg.webp?itok=ueIjoMiN',
    title: "Aqm. of Pacific",
    description:
      "Aquarium of the Pacific is a public aquarium on a 5-acre site on Rainbow Harbor in Long Beach, California.",
    clipboard:
      '100 Aquarium Way, Long Beach, CA 90802',
    tags: ['San Diego','Hangout'],
  },
  {
    imageUrl:
      'https://www.vvdailypress.com/gcdn/authoring/2019/12/01/NVIC/ghows-VV-98819b39-5390-44a1-e053-0100007f455e-c71cdac9.jpeg?crop=785,443,x72,y0&width=785&height=443&format=pjpg&auto=webp',
    title: "Gaslamp",
    description:
      "Plethora of restaurants to pick from, from quick bites to fine dining. Comedy shows, music performances, and even rooftop escapes.",
    clipboard:
      'Gaslamp',
    tags: ['San Diego','Hangout','Food'],
  },
  {
    imageUrl:
      'https://drupal-prod.visitcalifornia.com/sites/default/files/styles/fluid_680/public/2023-01/VC_SEO-Liberty-Station_Stone-Brewing_SUPPLIED_1280x640.jpg.webp?itok=7PWQdNrz',
    title: "Liberty Station",
    description:
      "A waterfront location, on a boat channel off San Diego Bay, just west of San Diego International Airport, with many places to eat.",
    clipboard:
      'Liberty Station',
    tags: ['San Diego','Hangout'],
  },
  {
    imageUrl:
      'https://exploringrworld.com/wp-content/uploads/2020/06/DSC_0733-2.jpg',
    title: "Coronado Walk",
    description:
      "Take a short ferry trip or drive across the bridge to Coronado Island, visit sandy beaches, art galleries, or shopping.",
    clipboard:
      '838 Ocean Blvd, Coronado, CA 92118',
    tags: ['San Diego','Hangout'],
  },
  {
    imageUrl:
      'https://media-cdn.tripadvisor.com/media/photo-s/0d/50/c2/e1/photo0jpg.jpg',
    title: "Shiku Sushi",
    description:
      "An upscale, open-air shopping mall in the University City community of San Diego, California.",
    clipboard:
      '1277 Prospect St, La Jolla, CA 92037',
    place:
      'San Diego',
    tags: ['San Diego','Food'],
  },
  {
    imageUrl:
      'https://img1.10bestmedia.com/Images/Photos/353131/la-jolla-shopping-westfield-UTC_55_660x440.jpg',
    title: "Westfield UTC",
    description:
      "An upscale, open-air shopping mall in the University City community of San Diego, California.",
    clipboard:
      '4545 La Jolla Village Dr Ste E-25, San Diego, CA 92122',
    tags: ['San Diego','Hangout','Shopping'],
  },
  {
    imageUrl:
      'https://mcasd.org/client-uploads/images/_mcasd_image_1_62x1_2000px_w/LJ_2022-03-05-044955_zpsl.jpg',
    title: "MCASD",
    description:
      "The Museum of Contemporary Art San Diego (MCASD) is an art museum focused on the art from 1950 to the present.",
    clipboard:
      '700 Prospect St, La Jolla, CA 92037',
    tags: ['San Diego','Hangout'],
  },
  {
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/4/45/La_Jolla_Shores_photo_D_Ramey_Logan.jpg',
    title: "La Jolla Shores",
    description:
      "Located in the northern part Scripps Beach, is a beach and vacation community in the heart of La Jolla in San Diego.",
    clipboard:
      '2000 Spindrift Dr, La Jolla, CA 92037',
    tags: ['San Diego','Hangout'],
  },
  {
    imageUrl:
      'https://i0.wp.com/beyondthemoments.com/wp-content/uploads/2022/08/IMG_5745-1-scaled.jpg?fit=1280%2C1707&ssl=1',
    title: "Black's Beach",
    description:
      "Located in a secluded section of beach beneath the bluffs of Torrey Pines on the Pacific Ocean in La Jolla.",
    clipboard:
      'California 92037',
    tags: ['San Diego','Hangout'],
  },
  {
    imageUrl:
      'https://verbatimbooks.com/wp-content/uploads/slider/cache/2f701b3e537c3f497a5ca9ec55a3243b/IMG_0968-1-scaled.jpg',
    title: "Verbatim Books",
    description:
      "Primarily secondhand bookstore with a selection of over 50,000 gently-loved and antiquarian books in North Park. Also carry new zines",

    clipboard:
      '3793 30th St, San Diego, CA 92104',
    tags: ['San Diego','Hangout'],
  },
  {
    imageUrl:
      'https://ichibanyausa.com/cdn/shop/files/Q9A7988.jpg?v=1712943522&width=3840',
    title: "Coco Ichibanya",
    description:
      "Located in Riverside and SD, known for its Japanese curry and omurice, coming in a variety of spice levels!",
    clipboard:
      '4428 Convoy St, San Diego, CA 92111',
    tags: ['San Diego','Riverside','Food'],
  },
  {
    imageUrl:
      'https://s3-media0.fl.yelpcdn.com/bphoto/6-3zlo46xJF50tLrvRXBOw/348s.jpg',
    title: "Brandon's Diner",
    description:
      "American Breakfast, Lunch, and Dinner in Riverside. Serves burgers, sandwiches, main courses, sides, desserts.",
    clipboard:
      '10246 Indiana Ave, Riverside, CA 92503',
    tags: ['San Diego','Food'],
  },
  {
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/5/59/El_Prado_Balboa_Park_2.jpg',
    title: 'Balboa Park',
    description:
      "Urban cultural park in San Diego, California, hosting various museums, theaters, restaurants, and the San Diego Zoo.",
    clipboard:
      'San Diego, CA',
    tags: ['San Diego','Hangout'],
  },
  {
    imageUrl:
      'https://cdnsm5-hosted.civiclive.com/UserFiles/Servers/Server_15209001/Image/Work/Economic_Development/News/round1%20instagram.png',
    title: 'Round1',
    description:
      'A multi-entertainment facility offering Bowling, Arcade Games, Billiards and more!',
    clipboard:
      'Round1',
    tags: ['San Diego','Riverside','Hangout'],
  },
  {
    imageUrl:
      'https://castlepark.com/wp-content/uploads/2025/07/fireball-attraction-688313d7c2d1e.webp',
    title: 'Castle Park',
    description:
      "With over 25 rides and attractions, and a charming carousel, there's plenty to keep you entertained throughout the day.",
    clipboard:
      '3500 Polk St, Riverside, CA 92505',
    tags: ['San Diego','Hangout'],
  },
  {
    imageUrl:
      'https://lajollamom.com/wp-content/uploads/2018/05/la-jolla-cove-guide.jpg',
    title: 'La Jolla Cove',
    description:
      'A small cove with a beach, surrounded by cliffs! The area is protected as part of a marine reserve and is popular with scuba divers.',
    clipboard:
      'La Jolla Covek, San Diego, CA 92037',
    tags: ['San Diego','Hangout'],
  },
  {
    imageUrl:
      'https://zoo.sandiegozoo.org/sites/default/files/body_side_image/Frame%2016.png',
    title: 'San Diego Zoo',
    description:
      'Located in Balboa Park, it began as a collection of animals left over from the Panama–California Exposition.',
    clipboard:
      '2920 Zoo Dr, San Diego, CA 92101',
    tags: ['San Diego','Hangout'],
  },
];

// Truncate all descriptions dynamically
const locations = rawLocations.map((location) => ({
  ...location,
  description:
    location.description.length > CHARACTER_LIMIT
      ? `${location.description.slice(0, CHARACTER_LIMIT)}...`
      : location.description,
}));

export default locations;

