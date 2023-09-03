def buisness_details_schema(schema):
    return {
        'application_id': schema['ref'],
        'buisness_id': schema['id'],
        'buisness_name': schema['name'],
        'buisness_owner': schema['owner'],
        'buisness_yoe': schema['setup_year'],
        'acc_provider': schema['acc_provider'],
        'loan_amount': schema['amount']
    }


def submit_details_schema(schema):
    return {
        'application_id': schema['ref'],
        'buisness_id': schema['id'],
        'buisness_name': schema['name'],
        'buisness_owner': schema['owner'],
        'buisness_yoe': schema['setup_year'],
        'loan_amount': schema['amount'],
        'sheet': schema['sheet']
    }

def decision_engine_input_schema(schema):
    return {
        'buisness_name': schema['buisness_name'],
        'buisness_yoe': schema['buisness_yoe'],
        'summary': schema['summary']
    }
