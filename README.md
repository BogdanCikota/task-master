Task Master App
-------------------

<!--ts-->
   * [Setup guide](#setup-guide)
   * [Folder Structure](#folder-structure)
   * [Additional statistics](#additional-statistics)
<!--te-->

This app is published via github pages and can be visited here :point_right: [Task Master App](https://bogdancikota.github.io/task-master)


Setup guide
-------------------
1. Clone this repo
2. Create ```.env``` file in the root of the project, and setup variables that are sent in an email
```
REACT_APP_FIREBASE_API_KEY=
REACT_APP_FIREBASE_AUTH_DOMAIN=
REACT_APP_FIREBASE_PROJECT_ID=
REACT_APP_FIREBASE_STORAGE_BUCKET=
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=
REACT_APP_FIREBASE_APP_ID=
```
3. In the project directory, run ```npm install``` or ``` yarn add ```
4. ```npm start``` or ```yarn start```
5. Open ```http://localhost:3000``` to view it in your browser.


Folder Structure
-------------------
The tree view of a project architecture

<pre>
├── src                        
    ├── assets        # folder for storing static assets
        ├── images
        ├── styles
    ├── components    # folder for components that are used on view pages
    ├── firebase      # contains the configuration settings to connect to the Firebase project              
    ├── views         # folder for pages
        ├── employees
        ├── home
        ├── notFound
        ├── tasks
    ├── App.js
    └── index.js
</pre>

Additional statistics
-------------------
### Total number of employees and tasks on Homepage
The Total Number of Employees and Tasks feature is a statistcs that can impact the productivity and efficiency of a company.