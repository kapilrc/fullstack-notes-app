# Fullstack notes app

Tech Stack used React, MongoDB, Express and Node.js

In the server directory (root directory), create .env file and add

```
PORT=<port#>
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.kvsdtyy.mongodb.net/?retryWrites=true&w=majority
NODE_ENV=production || development
JWT_SECRET=<any random key chars>
```

then run below command to start server at a given port:

`npm i && npm start`

In the client directory, create .env file and add

```
VITE_CLOUDINARY_URL=https://api.cloudinary.com/v1_1/<your-app>/image/upload
VITE_API_ENDPOINT_URL=https://your-api-path//api
```

then, run below command:

`yarn && yarn dev`


