// import crypto from 'crypto';
// import fs from 'fs';
// import path from 'path';

// // Function to generate a random string
// const generateRandomString = (length) => {
//   return crypto.randomBytes(length).toString('hex');
// };

// // Function to generate and save session secret to .env file
// const saveSessionSecretToEnv = () => {
//   const sessionSecret = generateRandomString(32);
//   const envPath = path.resolve(Ha-Geez_backend, '.env');
  
//   console.log('Env path:', envPath); // Debug: print the env path

//   let envContent = '';
  
//   // Check if .env file exists
//   if (fs.existsSync(envPath)) {
//     envContent = fs.readFileSync(envPath, 'utf8');
//     // Remove existing SESSION_SECRET line
//     envContent = envContent.replace(/^SESSION_SECRET=.*$/m, '');
//   }
  
//   // Append the new SESSION_SECRET
//   envContent += `SESSION_SECRET=${sessionSecret}\n`;
  
//   // Write the updated content back to the .env file
//   fs.writeFileSync(envPath, envContent);
  
//   console.log('Session secret saved to .env file:', sessionSecret);
// };

// // Save the session secret to the .env file
// saveSessionSecretToEnv();
