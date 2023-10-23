import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { CodePipeline, CodePipelineSource, ShellStep } from 'aws-cdk-lib/pipelines';
import { pipeline } from 'stream';
import { PipeLineAppStage } from './demoawspipeline-app-stack';
import { ManualApprovalStep } from 'aws-cdk-lib/pipelines';



export class DemoawspipelineStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const democicdpipeline = new CodePipeline(this, 'demopipeline', 
    {
      synth: new ShellStep('Synth', {
        input: CodePipelineSource.gitHub('ivanmontenegrogomez/cdk', 'main',
        {authentication: cdk.SecretValue.secretsManager("cdk-pipeline",{jsonField:"newToken"})}),
        commands: [
          'npm ci',
          'npm run build',
          'npx cdk synth',
        ]
      })
    })

    const testingStage = democicdpipeline.addStage(new PipeLineAppStage(this, 'test', {
      env: { account: '482695813838', region: 'us-east-1' },
    }));
    
    testingStage.addPost(new ManualApprovalStep('approval'))

    const prodStage = democicdpipeline.addStage(new PipeLineAppStage(this, 'prod', {
      env: { account: '482695813838', region: 'us-east-1' },
    }));


    
 }
}
