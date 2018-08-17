# Lunch Spot

This is our entry for NRHL Hack Night.

### Challenge
Restaurant Picker
* Create an app that randomly selects lunch spot w/in .5 miles from location
* Extra:
  * food type filter
  * budget filter
  * creativity

### Setup

We're using Python, specifically Flask on the backend, dumping results to raw HTML (hopefully we can get a prettier front-end).

#### Config
* open up local_settings.py (note: this file is ignored by git)
* add the following entries:
```
DEBUG = True
YELP_API_KEY = '...'
SECRET_KEY = 'anything'
```

#### Python
* make you have Python installed, and virtualenv is also recommended
* `virtualenv .venv` will create your isolated environment
* `pip install -r requirements.txt` install dependencies
* `python app.py` to run on localhost:5000

