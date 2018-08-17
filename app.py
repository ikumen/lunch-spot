from flask import Flask, render_template, request
from yelpapi import YelpAPI

app = Flask(__name__)
app.config.from_pyfile('local_settings.py')
yelp = YelpAPI(app.config.get('YELP_API_KEY'))

# TODO: externalize
categories = dict(
    breweries="Breweries", 
    bakeries="Bakeries",
    farmersmarket="Farmers Market",
    grocery="Grocery",
    juicebars="Juice Bars")

@app.route('/')
def home():
    return render_template('home.html', categories=categories)

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
        price=price)
    print(results)
    spots = [dict(name=r['name'],photo=r['image_url']) for r in results['businesses']]
    return render_template('food.html', spots=spots)


if __name__ == '__main__':
	app.run()

