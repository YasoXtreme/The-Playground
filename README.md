# The Playground 🏡

> _"Play is the highest form of research."_ — Albert Einstein

## What is this?

Welcome to my digital laboratory. This repository is where I keep my fun little experiments, homework assignments, and proof-of-concept projects.

Nothing here is production-ready code. It's a collection of things I built to learn how things work under the hood—messy, experimental, and educational.

## How to use this repo

Since this is a **"monorepo"** (many projects in one place), you don't install everything at once. You pick the **specific experiment** you want to run.

### 1. Clone the repo

```bash
git clone https://github.com/YasoXtreme/The-Playground.git
cd the-playground
```

### 2. Choose an experiment

Navigate into the specific folder you want to test. For example, to try the user authentication experiment:

```bash
cd nodejs/01-middleware-auth-sqlite
```

### 3. Install & Run

I don't commit `node_modules` (to keep things clean), you need to install the dependencies for that specific project first.

`bash npm install node server.js `

## The Experiments

### Node.js

- **middleware-auth-sqlite**: A from-scratch implementation of a User Authentication System using standard Express Middleware and a local SQLite database.

### Tensorflow

- **cifar10:** The training and testing proccesses of a model that can identify objects in images using the cifar10 database.

_(More coming soon...)_
