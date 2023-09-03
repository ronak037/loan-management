from flask import Blueprint, request, Response

from loan_management.common import functions
from loan_management.infra.schema.details import submit_details_schema, decision_engine_input_schema
from loan_management.api_functions import application_details_functions
from loan_management.exceptions.exceptions import InvalidAmountException

import logging
import traceback

application_details = Blueprint('application_details', __name__)

@application_details.route('/initiate', methods=['POST'])
def initiate():
    """API call to initiate the application which return application number which can be used in various tracking systems, etc
    """
    logging.info("POST /application/initiate")
    application_num = functions.randomDigits(15)
    # application number will be used to track the application and to which buisness id it is associated for the future use case
    # check should be added so that application number generated is unique

    res = {'application_id': application_num}
    return res, 200


@application_details.route('/submit', methods=['POST'])
def submit():
    """API call to submit the application
    """
    logging.info("POST /application/submit")
    request_data = request.get_json()
    try:
        buisness_details = submit_details_schema(request_data)
    except Exception as e:
        logging.error("One of the required information is missing")
        logging.exception(traceback.format_exc())
        return Response(response="Required information is missing", status=400)

    try:
        application_details_functions.validate_info(buisness_details)
    except InvalidAmountException:
        logging.error("Loan amount must be greater than 0")
        return Response(response="Loan amount or buisness setup year must be greater than 0", status=400)

    preAssessment_value = application_details_functions.get_preAssessment_value(buisness_details['sheet'], buisness_details['loan_amount'])
    summary_report = application_details_functions.get_summary_by_year(buisness_details['sheet'])

    buisness_details['summary'] = summary_report
    decision_enginer_buisness_details = decision_engine_input_schema(buisness_details)

    application_status_info = application_details_functions.process_application(decision_enginer_buisness_details, preAssessment_value)

    return application_status_info, 201
