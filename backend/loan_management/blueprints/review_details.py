from flask import Blueprint, request, Response

from api_functions import review_details_functions
from infra.schema.details import buisness_details_schema
from exceptions.exceptions import InvalidAmountException, InvalidValueException

import logging
import traceback

bp = Blueprint('review_details', __name__)

@bp.route('/balance_sheet', methods=['GET'])
def review_details():
    args = request.args
    try:
        buisness_details = buisness_details_schema(args)
        # Can fetch more information by adding keys in schema and pass it to get the balanced sheet
    except Exception as e:
        logging.error("One of the required information is missing")
        logging.exception(traceback.format_exc())
        return Response(response="Required information is missing", status=400)

    try:
        review_details_functions.validate_info(buisness_details)
    except InvalidAmountException:
        logging.error("Loan amount must be greater than 0")
        return Response(response="Loan amount or buisness setup year must be greater than 0", status=400)
    except InvalidValueException:
        logging.error("Invalid value passed for accounting provider")
        return Response(response="Value passed for accounting provider is wrong", status=400)

    balanced_sheet = review_details_functions.fetch_balanced_sheet(buisness_details["id"])

    buisness_details['sheet'] = balanced_sheet
    return Response(response=buisness_details, status=200)