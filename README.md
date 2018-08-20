# Lunch Spot
A little app for the [NRHL](https://www.hautelook.com/about) team to find their lunch spot.

### Motivation
This is our entry for NRHL Hack Night challenge.
```
Restaurant Picker
Create an app that randomly selects lunch spot w/in .5 miles from location
Extra:
  * food type filter
  * budget filter
  * creativity
```

### Setup
We decided to use the [Yelp Api](https://www.yelp.com/developers/documentation/v3/business_search) to power our search, along with Python (specifically Flask) on the backend, ~~dumping results to raw HTML~~ and React on the client side.

The project consist of two parts--[static folder](https://github.com/ikumen/lunch-spot/tree/master/static) for client code, and [server folder](https://github.com/ikumen/lunch-spot/tree/master/server) for backend code. 

#### Requirements
* [Python](https://www.python.org/)
* [npm](https://www.npmjs.com/)

#### Config
- [Yelp API](https://www.yelp.com/developers/documentation/v3) key is required, create an account
- add a `local_settings.py` (e.g, lunch-spot/server/local_settings.py)
- add your Yelp Api key to `local_settings.py`
  ```python
  YELP_API_KEY = "your api key in quotes"
  ```

#### Install
```shell
# Install client dependencies
$ cd path-to/lunch-spot/static
$ npm install

# Install server dependencies
$ cd path-to/lunch-spot/server
$ pip install -r requirements.txt
```

#### Run (Development)
For development we run client and backend on two different servers. Client will be managed by webpack, which proxies all calls to the backend, and hot loads when any changes are detected.
```shell
# Start client on localhost:8080
$ cd path-to/lunch-spot/static
$ npm run start

# Start backend server on localhost:5000
$ cd path-to/lunch-spot/server
$ python app.py
```




