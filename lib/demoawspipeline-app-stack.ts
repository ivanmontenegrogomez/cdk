import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { LambdaStack } from './lambda-stack';

export class PipeLineAppStage extends cdk.Stage{
    constructor(scope: Construct, id: string, props?: cdk.StageProps) {
        super(scope, id, props);

        const demolambdaStack = new LambdaStack(this, 'LambdaStack');
        }
        
    
}