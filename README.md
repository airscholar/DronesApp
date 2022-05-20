# DRONES
## Settign up the environment

### 1. Setting up container for postgres database

1. Ensure that you have docker installed on your machine.
2. Then run the following command to spin up the docker container for postgres database.
```bash
npm install
```
After the command is executed, run the following command to spin up the docker container for postgres database and populate the database with sample data.

```bash
npm run db:dev:restart
```

### 2. Creating the `.env` file
You can rename the `.env.example` file to `.env` and fill in the values. See sample below:

    ```bash 
    PORT=9000
    NODE_ENV=development
    DATABASE_URL="postgresql://postgres:postgres@localhost:5432/dronesApp?schema=public"
    JWT_SECRET=THIS_IS_A_SECRET_KEY
    UPLOAD_PATH="./upload"   
    ```

### 3. Running the application
```bash
npm run start:dev
```
Routes/endpoints documentation is done with [Swagger](https://swagger.io/).

The url to the documentation is - `base_url/api/docs` where base_url is the url of the application. E.g. `http://localhost:9000/api/docs/` 

### 4. Testing the application
```bash
npm run test
```


## Drones

[[_TOC_]]

---

:scroll: **START**


### Introduction

There is a major new technology that is destined to be a disruptive force in the field of transportation: **the drone**. Just as the mobile phone allowed developing countries to leapfrog older technologies for personal communication, the drone has the potential to leapfrog traditional transportation infrastructure.

Useful drone functions include delivery of small items that are (urgently) needed in locations with difficult access.

---

### Task description

We have a fleet of **10 drones**. A drone is capable of carrying devices, other than cameras, and capable of delivering small loads. For our use case **the load is medications**.

A **Drone** has:
- serial number (100 characters max);
- model (Lightweight, Middleweight, Cruiserweight, Heavyweight);
- weight limit (500gr max);
- battery capacity (percentage);
- state (IDLE, LOADING, LOADED, DELIVERING, DELIVERED, RETURNING).

Each **Medication** has: 
- name (allowed only letters, numbers, ‘-‘, ‘_’);
- weight;
- code (allowed only upper case letters, underscore and numbers);
- image (picture of the medication case).

Develop a service via REST API that allows clients to communicate with the drones (i.e. **dispatch controller**). The specific communicaiton with the drone is outside the scope of this task. 

The service should allow:
- registering a drone;
- loading a drone with medication items;
- checking loaded medication items for a given drone; 
- checking available drones for loading;
- check drone battery level for a given drone;

> Feel free to make assumptions for the design approach. 

---

### Requirements

While implementing your solution **please take care of the following requirements**: 

#### Functional requirements

- There is no need for UI;
- Prevent the drone from being loaded with more weight that it can carry;
- Prevent the drone from being in LOADING state if the battery level is **below 25%**;
- Introduce a periodic task to check drones battery levels and create history/audit event log for this.

---

#### Non-functional requirements

- Input/output data must be in JSON format;
- Your project must be buildable and runnable;
- Your project must have a README file with build/run/test instructions (use DB that can be run locally, e.g. in-memory, via container);
- Required data must be preloaded in the database.
- JUnit tests are optional but advisable (if you have time);
- Advice: Show us how you work through your commit history.

---

:scroll: **END**
