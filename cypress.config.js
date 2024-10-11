const { defineConfig } = require("cypress");
const fs = require('fs');

function loadConfig(env) {
  const configPath = `./cypress/config/${env}.json`;
    console.log("configPath = " + configPath);
    if (fs.existsSync(configPath)) {
      return JSON.parse(fs.readFileSync(configPath));
    } else {
     // throw new Error(`Config file for environment "${env}" not found.`);
    }
}

const env = process.env.CYPRESS_ENV || 'testing'; // Default to testing if not set
console.log("process.env.CYPRESS_ENV = "+ process.env.CYPRESS_ENV);
console.log("process.env.CYPRESS_ENV = "+ env);
const config = loadConfig(env);

module.exports = defineConfig({
  e2e: {

    baseUrl: "https://example.cypress.io", 
    env: {
      apiUrl: config.apiUrl, // Base API URL
      registerEndpoint: config.registerEndpoint,
      loginEndpoint: config.loginEndpoint,
      createCaseEndpoint: config.createCaseEndpoint,
      // Add more endpoints as needed
    },

        // Set up multi-reporters
      
  
      
    // reporter: 'cypress-multi-reporters',
    // reporterOptions: {
    // configFile: 'reporter-config.json',
    // chromeWebSecurity: false,
    // },

    setupNodeEvents(on, config) {
      // implement node event listeners here
      
    },
  },
});
