import boto3

# create an instance of the DynamoDB client
dynamodb = boto3.resource('dynamodb', region_name='ap-south-1')

# create the SignupTable
table = dynamodb.create_table(
    TableName='SignupTable',
    KeySchema=[
        {
            'AttributeName': 'signup_id',
            'KeyType': 'HASH'  # partition key
        }
    ],
    AttributeDefinitions=[
        {
            'AttributeName': 'signup_id',
            'AttributeType': 'N'  # number data type
        },
        {
            'AttributeName': 'email',
            'AttributeType': 'S'  # string data type
        }
    ],
    ProvisionedThroughput={
        'ReadCapacityUnits': 5,
        'WriteCapacityUnits': 5
    },
    GlobalSecondaryIndexes=[
        {
            'IndexName': 'EmailIndex',
            'KeySchema': [
                {
                    'AttributeName': 'email',
                    'KeyType': 'HASH'
                }
            ],
            'Projection': {
                'ProjectionType': 'ALL'
            },
            'ProvisionedThroughput': {
                'ReadCapacityUnits': 5,
                'WriteCapacityUnits': 5
            }
        }
    ]
)

# wait for the table to be created
table.meta.client.get_waiter('table_exists').wait(TableName='SignupTable')

# add an item to the table
item = {
    'signup_id': table.item_count + 1,
    'first_name': 'John',
    'last_name': 'Doe',
    'email': 'johndoe@example.com',
    'password': 'mypassword'
}
table.put_item(Item=item)

print('Item added to table.')