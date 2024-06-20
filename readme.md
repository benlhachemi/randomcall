<div align="center">
  <h1>RandomCall</h1>
  <h3><a style="color:#08b5ff" href="https://x.com/souhail_dev">Follow me on Twitter (X)</a></h3>
  <h5>
    Video chat app with random users.
  </h5>
  Full tutorial on <a href="https://youtu.be/FamZMfLIYag">YouTube</a>
  <br/>
  <br/>
  <p>   
    <a href="https://github.com/benlhachemi/randomcall/issues">
      <img src="https://img.shields.io/github/issues/benlhachemi/randomcall"/>
    </a>
    <a href="ttps://github.com/wisehackermonkey/benlhachemi/randomcall">
      <img src="https://img.shields.io/github/stars/benlhachemi/randomcall"/>
    </a>
    <a href="https://github.com/benlhachemi/randomcall/blob/master/LICENSE">
      <img src="https://img.shields.io/github/license/benlhachemi/randomcall"/>
    </a>
    
  </p>
  <p>
    <em>♥️ Subscribe to my <a href="https://www.youtube.com/@souhailDevv">Youtube Channel</a> for more free & open source projects ♥️</em>
  </p>
</div>

# Getting Started

This guide will help you get started with the installation process and run the app on your machine.


## Redis & Redis-insight
This app uses redis as database, so you need to run a Redis on a Docker container.

```shell
docker compose up -d
```


## Installation

### 📦 Install the dependecies on both Frontend and Backend

```shell
cd frontend && npm i
```

```shell
cd backend && npm i
```

### 🔌 Start the Frontend and Backend server
```shell
cd frontend && npm run dev
```

```shell
cd backend && npm run start:dev
```

### 🎉 Ready to Use

Now, open your browser and go to: "http://localhost:3000"

