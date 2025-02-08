const fs = require('fs'); // Node.js file system module to read/write JSON data

class Driver {
  static currentDriverId = 1; // Start from ID 1

  // Static method to generate sequential driver IDs
  static generateDriverId() {
    const driverId = this.currentDriverId.toString().padStart(9, '0');
    this.currentDriverId++; // Increment for the next ID
    return driverId;
  }

  static generateRandomBirthDate() {
    // Calculate the year of birth based on the age range (13 to 80)
    const minAge = 13;
    const maxAge = 80;
    const currentYear = new Date().getFullYear();
    const age = Math.floor(Math.random() * (maxAge - minAge + 1)) + minAge; // Random age between 13 and 80
    const yearOfBirth = currentYear - age;

    // Random month between 1 and 12
    const month = Math.floor(Math.random() * 12) + 1;

    // Determine the number of days in the generated month
    const daysInMonth = new Date(yearOfBirth, month, 0).getDate();

    // Random day between 1 and the last day of the month
    const day = Math.floor(Math.random() * daysInMonth) + 1;

    // Return the birthdate as DD/MM/YYYY
    return `${day.toString().padStart(2, '0')}/${month.toString().padStart(2, '0')}/${yearOfBirth}`;
  }

  

  constructor(driverId, driverType, birthDate, licenseStatus) {
    this.driverId = driverId; // 9-digit unique driver ID
    this.driverType = driverType; // general, novice, public
    this.birthDate = birthDate; // DD/MM/YYYY
    this.licenseStatus = licenseStatus; // normal, expired, suspended
  }

  // Method to generate random driver data (this part is fixed for consistency)
  static generateDriverData(driverType, driverIndex) {
    const driverId = Driver.generateDriverId();
    const licenseStatuses = ['normal', 'expired', 'suspended'];
    
    const licenseStatus = licenseStatuses[driverIndex % 3]; // Cycle through statuses
    const birthDate = Driver.generateRandomBirthDate();; // Example date
    
    return new Driver(driverId, driverType, birthDate, licenseStatus);
  }

  static saveDriversToJSON(drivers, filename) {
    fs.writeFileSync(filename, JSON.stringify(drivers, null, 2)); // Save to file
  }

  static loadDriversFromJSON(filename) {
    if (fs.existsSync(filename)) {
      const data = fs.readFileSync(filename);
      return JSON.parse(data);
    } else {
      return [];
    }
  }
}

// Generate and save 50 drivers, ensuring each type has at least 10 drivers
function generateAndSaveDrivers() {
  const drivers = [];
  const driverTypes = ['general', 'novice', 'public'];

  // Create at least 10 drivers of each type
  driverTypes.forEach((type) => {
    for (let i = 0; i < 10; i++) {
      drivers.push(Driver.generateDriverData(type, i));
    }
  });

  // If there are still slots left (50 total), fill with additional drivers
  let remainingCount = 50 - drivers.length;
  for (let i = 0; i < remainingCount; i++) {
    const type = driverTypes[i % 3]; // Cycle through types
    drivers.push(Driver.generateDriverData(type, i + 10));
  }

  Driver.saveDriversToJSON(drivers, 'drivers.json');
  console.log('Drivers saved to JSON');
}

// Load drivers from JSON file
function loadDrivers() {
  const drivers = Driver.loadDriversFromJSON('drivers.json');
  console.log(drivers);
}

// Check if drivers already exist, if not, generate them
if (fs.existsSync('drivers.json')) {
  loadDrivers(); // Load existing drivers
} else {
  generateAndSaveDrivers(); // Generate and save new drivers
}
