from exceptions.exceptions import InvalidAmountException

def validate_info(details):
    """Function to validate the input details

    Args:
        details (dict): Input dictionary

    Raises:
        InvalidAmountException: If loan amount is less than 0 then raise exception
    """
    if details['loan_amount'] <= 0 or details['buisness_yoe'] <= 0:
        raise InvalidAmountException


def process_application(buisness_details, preAssessment_val):
    """Simulated function to process the application acting as decision system

    Args:
        buisness_details (dict): Details of the application
        preAssessment_val (int): pre-assessment value
    """
    return {'status': 'Loan Approved', 'loan_amount': '1 Cr'}


def get_preAssessment_value(sheet, loan_amount):
    """Function to get preAssessment value

    Args:
        sheet (list of dict): Balanced sheet returned by the accounting software
        loan_amount (int): Loan amount
    """

    # Assuming that sheet stores the data in sorted manner i.e., recent month+year first
    preAssessment_value = 20
    sheet_len = len(sheet)
    traversal_len = min(12, sheet_len)

    pnl_val = 0
    total_asset_val = 0

    for i in range(0, traversal_len):
        record = sheet[i]
        pnl_val += record['profitOrLoss']
        total_asset_val += record['assetsValue']

    if pnl_val>0:
        preAssessment_value = 60

    if total_asset_val/12 > loan_amount:
        preAssessment_value = 100

    return preAssessment_value


def get_summary_by_year(sheet):
    """Function to get summary of profit or loss by the year

    Args:
        sheet (list of dict): Balanced sheet returned by the accounting software

    Returns:
        dict: summary report of pnl by the year, key->year and value->pnl_value
    """
    summary_report = dict()

    for record in sheet:
        if record['year'] not in summary_report:
            summary_report['year'] = record['profitOrLoss']
        else:
            summary_report['year'] += record['profitOrLoss']

    return summary_report