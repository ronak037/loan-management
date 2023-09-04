def buisness_details_schema(schema):
    return {
        'application_id': schema['ref'],
        'buisness_id': schema['id'],
        'buisness_name': schema['name'],
        'buisness_owner': schema['owner'],
        'buisness_yoe': int(schema['yoe']),
        'acc_provider': schema['acc_provider'],
        'loan_amount': int(schema['amount'])
    }


def submit_details_schema(schema):
    return {
        'application_id': schema['ref'],
        'buisness_id': schema['buisness_details']['id'],
        'buisness_name': schema['buisness_details']['name'],
        'buisness_owner': schema['buisness_details']['owner'],
        'buisness_yoe': int(schema['buisness_details']['yoe']),
        'loan_amount': int(schema['buisness_details']['loan_amount']),
        'sheet': schema['sheet']
    }


def decision_engine_input_schema(schema):
    return {
        'buisness_name': schema['buisness_name'],
        'buisness_yoe': schema['buisness_yoe'],
        'summary': schema['summary']
    }
