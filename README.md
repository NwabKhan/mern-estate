# Real Estate MERN web app

### Setting up Frontend
Initailly clone the code by using the following command:
      
      git clone https://github.com/NwabKhan/mern-estate.git

After that go to client directory by:

      cd client

Now Install all the dependencies by:

      npm i

And simply type:

    npm run dev

Congratulation! The frontend is on!

### Setting up Backend
To set up backend go to api directory by typing folowing command in the terminal:

      cd api

Now Install all the dependencies by:

      npm i

And simply type:

    npm run dev

Congratulation! The Backend is ready!

## NOTE
Do not forget to add __environment__ veriables:

* Create a .env file in the root of /api directory
* Create a variable __MONGO_KEY__ and write your MongoDB key
* Create a veriable __JWT_SECRET_KEY__ and assign it to any of your secret pass

## Last Step
Write down your __firebaseConfig__ in the /client/src/firebase.js for google authentication
