require('dotenv').config();
const mongoose = require('mongoose');
const Resource = require('./models/Resource'); 

const MONGO_URI = process.env.MONGO_URI; 

const rawSeedData = [
  // --- CLASSROOMS ---
  {"name":"TP101","type":"classroom","capacity":60,"floor":1},
  {"name":"TP102","type":"classroom","capacity":60,"floor":1},
  {"name":"TP103","type":"classroom","capacity":60,"floor":1},
  {"name":"TP105","type":"classroom","capacity":60,"floor":1},
  {"name":"TP201","type":"classroom","capacity":60,"floor":2},
  {"name":"TP202","type":"classroom","capacity":60,"floor":2},
  {"name":"TP203","type":"classroom","capacity":60,"floor":2},
  {"name":"TP204","type":"classroom","capacity":60,"floor":2},
  {"name":"TP205","type":"classroom","capacity":60,"floor":2},
  {"name":"TP206","type":"classroom","capacity":60,"floor":2},
  {"name":"TP301","type":"classroom","capacity":60,"floor":3},
  {"name":"TP302","type":"classroom","capacity":60,"floor":3},
  {"name":"TP303","type":"classroom","capacity":60,"floor":3},
  {"name":"TP304","type":"classroom","capacity":60,"floor":3},
  {"name":"TP305","type":"classroom","capacity":60,"floor":3},
  {"name":"TP306","type":"classroom","capacity":60,"floor":3},
  {"name":"TP401","type":"classroom","capacity":60,"floor":4},
  {"name":"TP402 & TP403","type":"classroom","capacity":120,"floor":4},
  {"name":"TP404 &TP405","type":"classroom","capacity":120,"floor":4},
  {"name":"TP406","type":"classroom","capacity":60,"floor":5},
  {"name":"TP501","type":"classroom","capacity":60,"floor":5},
  {"name":"TP502","type":"classroom","capacity":60,"floor":5},
  {"name":"TP503","type":"classroom","capacity":60,"floor":5},
  {"name":"TP504","type":"classroom","capacity":60,"floor":5},
  {"name":"TP505","type":"classroom","capacity":60,"floor":5},
  {"name":"TP506","type":"classroom","capacity":60,"floor":5},
  {"name":"TP601","type":"classroom","capacity":60,"floor":6},
  {"name":"TP602","type":"classroom","capacity":60,"floor":6},
  {"name":"TP603","type":"classroom","capacity":60,"floor":6},
  {"name":"TP604","type":"classroom","capacity":60,"floor":6},
  {"name":"TP605","type":"classroom","capacity":60,"floor":6},
  {"name":"TP606","type":"classroom","capacity":60,"floor":6},
  {"name":"TP701","type":"classroom","capacity":60,"floor":7},
  {"name":"TP702","type":"classroom","capacity":60,"floor":7},
  {"name":"TP703","type":"classroom","capacity":60,"floor":7},
  {"name":"TP704","type":"classroom","capacity":60,"floor":7},
  {"name":"TP705","type":"classroom","capacity":60,"floor":7},
  {"name":"TP706","type":"classroom","capacity":60,"floor":7},
  {"name":"TP801","type":"classroom","capacity":60,"floor":8},
  {"name":"TP802","type":"classroom","capacity":60,"floor":8},
  {"name":"TP803","type":"classroom","capacity":60,"floor":8},
  {"name":"TP804","type":"classroom","capacity":60,"floor":8},
  {"name":"TP805","type":"classroom","capacity":60,"floor":8},
  {"name":"TP806","type":"classroom","capacity":60,"floor":8},
  {"name":"TP901","type":"classroom","capacity":60,"floor":9},
  {"name":"TP902","type":"classroom","capacity":60,"floor":9},
  {"name":"TP903","type":"classroom","capacity":60,"floor":9},
  {"name":"TP904","type":"classroom","capacity":60,"floor":9},
  {"name":"TP905","type":"classroom","capacity":60,"floor":9},
  {"name":"TP906","type":"classroom","capacity":60,"floor":9},
  {"name":"TP1001","type":"classroom","capacity":60,"floor":10},
  {"name":"TP1002","type":"classroom","capacity":60,"floor":10},
  {"name":"TP1003","type":"classroom","capacity":60,"floor":10},
  {"name":"TP1004","type":"classroom","capacity":60,"floor":10},
  {"name":"TP1005","type":"classroom","capacity":60,"floor":10},
  {"name":"TP1006","type":"classroom","capacity":60,"floor":10},
  {"name":"TP1101","type":"classroom","capacity":60,"floor":11},
  {"name":"TP1102","type":"classroom","capacity":60,"floor":11},
  {"name":"TP1103","type":"classroom","capacity":60,"floor":11},
  {"name":"TP1104","type":"classroom","capacity":60,"floor":11},
  {"name":"TP1105","type":"classroom","capacity":60,"floor":11},
  {"name":"TP1106","type":"classroom","capacity":60,"floor":11},
  {"name":"TP1201","type":"classroom","capacity":60,"floor":12},
  {"name":"TP1202","type":"classroom","capacity":60,"floor":12},
  {"name":"TP1203","type":"classroom","capacity":60,"floor":12},
  {"name":"TP1204","type":"classroom","capacity":60,"floor":12},
  {"name":"TP1205","type":"classroom","capacity":60,"floor":12},
  {"name":"TP1206","type":"classroom","capacity":60,"floor":12},
  {"name":"TP1301","type":"classroom","capacity":60,"floor":13},
  {"name":"TP1302","type":"classroom","capacity":60,"floor":13},
  {"name":"TP1303","type":"classroom","capacity":60,"floor":13},
  {"name":"TP1304","type":"classroom","capacity":60,"floor":13},
  {"name":"TP1305","type":"classroom","capacity":60,"floor":13},
  {"name":"TP1306","type":"classroom","capacity":60,"floor":13},
  {"name":"TP1401","type":"classroom","capacity":60,"floor":14},
  {"name":"TP1402","type":"classroom","capacity":60,"floor":14},
  {"name":"TP1403","type":"classroom","capacity":60,"floor":14},
  {"name":"TP1404","type":"classroom","capacity":60,"floor":14},
  {"name":"TP1405","type":"classroom","capacity":60,"floor":14},
  {"name":"TP1406","type":"classroom","capacity":60,"floor":14},
  {"name":"TP1501","type":"classroom","capacity":60,"floor":15},
  {"name":"TP1502","type":"classroom","capacity":60,"floor":15},
  {"name":"TP1503","type": "classroom","capacity":60,"floor":15},
  {"name":"TP1504","type":"classroom","capacity":60,"floor":15},
  {"name":"TP1505","type":"classroom","capacity":60,"floor":15},
  {"name":"TP1506","type":"classroom","capacity":60,"floor":15},

  // --- LABS ---
  {"name":"TP 106","type":"lab","capacity":30,"floor":1},
  {"name":"TP 307","type":"lab","capacity":30,"floor":3},
  {"name":"TP 310","type":"lab","capacity":30,"floor":3},
  {"name":"TP 311","type":"lab","capacity":30,"floor":3},
  {"name":"TP 316","type":"lab","capacity":30,"floor":3},
  {"name":"TP 413","type":"lab","capacity":30,"floor":4},
  {"name":"TP 414","type":"lab","capacity":30,"floor":4},
  {"name":"TP 415","type":"lab","capacity":30,"floor":4},
  {"name":"TP 416","type":"lab","capacity":30,"floor":4},
  {"name":"TP 508","type":"lab","capacity":30,"floor":5},
  {"name":"TP 510","type":"lab","capacity":30,"floor":5},
  {"name":"TP 513","type":"lab","capacity":30,"floor":5},
  {"name":"TP 514","type":"lab","capacity":30,"floor":5},
  {"name":"TP 609","type":"lab","capacity":30,"floor":6},
  {"name":"TP 610","type":"lab","capacity":30,"floor":6},
  {"name":"TP 616","type":"lab","capacity":30,"floor":6},
  {"name":"TP709","type":"lab","capacity":30,"floor":7},
  {"name":"TP710","type":"lab","capacity":30,"floor":7},
  {"name":"TP711","type":"lab","capacity":30,"floor":7},
  {"name":"TP713","type":"lab","capacity":30,"floor":7},
  {"name":"TP 808","type":"lab","capacity":30,"floor":8},
  {"name":"TP 811","type":"lab","capacity":30,"floor":8},
  {"name":"TP 910","type":"lab","capacity":30,"floor":9},
  {"name":"TP 914","type":"lab","capacity":30,"floor":9},
  {"name":"TP 915","type":"lab","capacity":30,"floor":9},
  {"name":"TP 916","type":"lab","capacity":30,"floor":9},
  {"name":"TP 917","type":"lab","capacity":30,"floor":9},
  {"name":"TP 1018","type":"lab","capacity":30,"floor":10},
  {"name":"TP 1019","type":"lab","capacity":30,"floor":10},
  {"name":"TP 1020","type":"lab","capacity":30,"floor":10},
  {"name":"TP 1021","type":"lab","capacity":30,"floor":10},
  {"name":"TP 1108","type":"lab","capacity":30,"floor":11},
  {"name":"TP 1114","type":"lab","capacity":30,"floor":11},
  {"name":"TP 1115","type":"lab","capacity":30,"floor":11},
  {"name":"TP 1116","type":"lab","capacity":30,"floor":11},
  {"name":"TP 1117","type":"lab","capacity":30,"floor":11},
  {"name":"TP 1210","type":"lab","capacity":30,"floor":12},
  {"name":"TP 1220","type":"lab","capacity":30,"floor":12},
  {"name":"TP 1314","type":"lab","capacity":30,"floor":13},
  {"name":"TP 1315","type":"lab","capacity":30,"floor":13},
  {"name":"TP 1317","type":"lab","capacity":30,"floor":13},
  {"name":"TP1318","type":"lab","capacity":30,"floor":13},
  {"name":"TP 1319","type":"lab","capacity":30,"floor":13},
  {"name":"I MAC LAB 1","type":"lab","capacity":30,"floor":14},
  {"name":"I MAC LAB 2","type":"lab","capacity":30,"floor":14},
  {"name":"I MAC LAB 3","type":"lab","capacity":30,"floor":14},
  {"name":"I MAC LAB 4","type":"lab","capacity":30,"floor":14},
  {"name":"TP 1508","type":"lab","capacity":30,"floor":15},
  {"name":"TP 1508A","type":"lab","capacity":30,"floor":15},
  {"name":"TP 1509","type":"lab","capacity":30,"floor":15},
  {"name":"TP 1510","type":"lab","capacity":30,"floor":15},
  {"name":"TP 1511","type":"lab","capacity":30,"floor":15},
  {"name":"TP 1514","type":"lab","capacity":30,"floor":15},
  {"name":"TP 1515","type":"lab","capacity":30,"floor":15},

  // --- HALLS ---
  {"name":"MAIN AUDITORIUM","type":"hall","capacity":3000,"floor":0},
  {"name":"MINI HALL-1","type":"hall","capacity":300,"floor":0},
  {"name":"MINI HALL-2","type":"hall","capacity":250,"floor":0},
  {"name":"Dr. VENKATRAMAN RAMAKRISHNAN HALL","type":"hall","capacity":60,"floor":0},
  {"name":"S RADHAKRISHNAN HALL","type":"hall","capacity":30,"floor":0},
  {"name":"RAMANUJAN HALL","type":"hall","capacity":60,"floor":0},
  {"name":"TURING HALL","type":"hall","capacity":120,"floor":0},
  {"name":"SIR JC BOSE HALL","type":"hall","capacity":120,"floor":0},
  {"name":"Prof. G N RAMACHANDRAN HALL","type":"hall","capacity":300,"floor":0},
  {"name":"FARADAY HALL","type":"hall","capacity":600,"floor":0},
  {"name":"G D NAIDU HALL","type":"hall","capacity":300,"floor":0},
  {"name":"Sir. VISHVESHVARAYA HALL","type":"hall","capacity":120,"floor":0},
  {"name":"HIPPOCRATES AUDITORIUM","type":"hall","capacity":600,"floor":0}
];

// Helper function to assign department based on your logic
const getDepartment = (floor) => {
  if ([1, 2, 6, 7, 8, 14, 15].includes(floor)) return "CTECH";
  if ([3, 4, 5].includes(floor)) return "NWC";
  if ([9, 10, 11, 12, 13].includes(floor)) return "Electronics";
  return "Common"; // For Halls (Floor 0)
};

// Helper function to assign features based on room type
const getFeatures = (type) => {
  if (type === 'classroom') return ["WiFi", "Smart Board", "Projector"];
  if (type === 'lab') return ["High-Speed WiFi", "Workstations", "AC", "Specialized Equipment"];
  if (type === 'hall') return ["AC", "Audio System", "Stage", "Projector"];
  return [];
};

// Map over the raw data and build the final objects with departments and features
const finalSeedData = rawSeedData.map(room => ({
  ...room,
  department: getDepartment(room.floor),
  features: getFeatures(room.type)
}));

const seedDatabase = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB.');

    await Resource.deleteMany({});
    await Resource.insertMany(finalSeedData); // Insert the mapped data!
    console.log(`Successfully seeded ${finalSeedData.length} resources with proper departments!`);

    process.exit();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();