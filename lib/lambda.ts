import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as lambda from 'aws-cdk-lib/aws-lambda';


// create a lambda function 

export class LambdaStack extends cdk.Stack {
    constructor(scope: Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props);

        const lambdaFunction = new lambda.Function(this, 'LambdaFunction', {
            code: lambda.Code.fromInline('exports.handler = (event, context, callback) => "Hello, CDK";'),
            handler: 'index.handler',
            runtime: lambda.Runtime.NODEJS_14_X,
        })
  }
}