import logging


from flask import Flask
from flask_cors import CORS

def create_app(test_config=None):
    # create and configure the app
    app = Flask(__name__,instance_relative_config=True)
    CORS(app)
    app.config.from_mapping(SECRET_KEY='dev')

    if test_config is None:
        # load the instance config, if it exists, when not testing
        app.config.from_pyfile('config.py', silent=True)
    else:
        # load the test config if passed in
        app.config.from_mapping(test_config)

    logging.basicConfig(level=logging.DEBUG)

    from loan_management.blueprints.application_details import application_details
    app.register_blueprint(application_details, url_prefix='/api/application')

    from loan_management.blueprints.review_details import review_details
    app.register_blueprint(review_details, url_prefix='/api')

    return app