import random

from flask import Flask, render_template, request, jsonify
from yelpapi import YelpAPI

app = Flask(__name__,
            static_folder="../static/dist",
            static_url_path="/static",
            template_folder="../static/dist/html"
            )

app.config.from_pyfile('default_settings.py', silent=False)            
app.config.from_pyfile('local_settings.py', silent=True)

yelp = YelpAPI(app.config.get('YELP_API_KEY'))
categories = app.config.get('RESTAURANT_CATEGORIES')
required_params = ['price', 'category', 'lat', 'lon', 'radius']


@app.route('/api/categories', methods=['get'])
def api_get_categories():
    return jsonify(categories)


@app.route('/api/spot', methods=['post'])
def api_get_spot():
    params = request.get_json()
    if not all (k in params for k in required_params):
        # TODO: handle
        pass

    query_params = dict(
        price=int(params['price']),
        categories=[params['category']],
        latitude=float(params['lat']),
        longitude=float(params['lon']),
        radius=int(params['radius']),
        limit=1
    )

    spot = _get_spot(**query_params)

    if spot:
        return jsonify(spot)
    else:
        resp = jsonify({'message': 'Nothing found, please try another filter!'})
        resp.status_code = 404
        return resp


def _get_spot(**params):
    """Get total number of restaurants that match our query filters, 
    and randomly return one of those restaurants"""
    total = _search_yelp(**params)['total']

    if total == 0:
        return None

    # Yelp has hard limit of 1000 or less biz returned
    if total > 1000:
        total = 1000

    selected = random.randint(1, total)-1
    params['offset'] = selected
    restaurants = _search_yelp(**params)['businesses']

    return restaurants[0] # Should always return 1 restaurant


def _search_yelp(**params):
    """Search Yelp."""
    return yelp.search_query(**params)


@app.route('/')
def home():
    return render_template('index.html', categories=categories)


@app.route('/food')
def get_spot():
    category = request.args.get('cat')
    price = request.args.get('price')
    lat = request.args.get('lat')
    lon = request.args.get('lon')

    if not all([category, price]):
        # TODO: handle missing args
        pass

    results = yelp.search_query(
        latitude=float(lat),
        longitude=float(lon),
        categories=[category],
        limit=2,
        price=int(price))
    spots = [dict(name=r['name'],photo=r['image_url'],link=r['url']) for r in results['businesses']]
    return render_template('food.tpl', spots=spots)


if __name__ == '__main__':
    app.run()
