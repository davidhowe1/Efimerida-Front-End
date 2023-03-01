# Efimerida-Front-End
Efimerida is a RESTful API for running and maintaining a blog site. This repo contains the files that makeup the front end of the site.

## To run the front end of the application, follow these steps:

#### Clone git repository
```
https://github.com/davidhowe1/Efimerida-Front-End.git
```
#### Copy the repo to the Efimerida source folder (you should see blog, docs, and venv folders). 
The default name of the folder is 'Efimerida-Front-End' but you can call it something else for simplicity, such as 'frontend' to make it easier to navigate using terminal commands.

#### Navigate to Efimerida/Efimerida-Front-End and install dependencies and Vite by using terminal command:
```
npm install
```
#### To run in localserver:
```
yarn run dev
```
Vite runs the localserver in port:5173 as standard so make sure to white list this url in the CORS_ORIGIN_WHITELIST --> http://localhost:5173 
