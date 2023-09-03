from loan_management.exceptions.exceptions import InvalidAmountException, InvalidValueException

def validate_info(details):
    """Function to validate the input details

    Args:
        details (dict): Input dictionary

    Raises:
        InvalidAmountException: If loan amount is less than 0 then raise exception
        InvalidValueException: If accounting provider selected is not one of the Xero or MYOB
    """
    if details['loan_amount'] <= 0 or details['buisness_yoe'] <= 0:
        raise InvalidAmountException

    if details['acc_provider'] not in ['Xero', 'MYOB']:
        raise InvalidValueException


def fetch_balanced_sheet(id):
    """Function to get balanced sheet for the buisness

    Args:
        id (string): Unique id of the buisness
    """
    # api call to fetch the details from the accounting software
    sheet = [
        {
            "year": 2020,
            "month": 12,
            "profitOrLoss": 250000,
            "assetsValue": 1234
        },
        {
            "year": 2020,
            "month": 11,
            "profitOrLoss": 1150,
            "assetsValue": 5789
        },
        {
            "year": 2020,
            "month": 10,
            "profitOrLoss": 2500,
            "assetsValue": 22345
        },
        {
            "year": 2020,
            "month": 9,
            "profitOrLoss": -187000,
            "assetsValue": 223452
        }
    ]
    return sheet