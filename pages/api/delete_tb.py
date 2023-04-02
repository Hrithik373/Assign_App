import boto3

# create a DynamoDB client
dynamodb = boto3.client('dynamodb')

# delete the SignupTable table
dynamodb.delete_table(TableName='SignupTable')