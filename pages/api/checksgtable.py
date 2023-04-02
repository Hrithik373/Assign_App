import boto3

dynamodb = boto3.resource('dynamodb', region_name='ap-south-1')
table = dynamodb.Table('SignupTable')

response = table.scan()
items = response['Items']

print(items)