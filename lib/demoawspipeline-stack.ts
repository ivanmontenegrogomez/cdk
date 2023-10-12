import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { CodePipeline, CodePipelineSource, ShellStep } from 'aws-cdk-lib/pipelines';
import { pipeline } from 'stream';

export class DemoawspipelineStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const democicdpipeline = new CodePipeline(this, 'demopipeline', 
    {
      synth: new ShellStep('Synth', {
        input: CodePipelineSource.gitHub('ivanmontenegrogomez/cdk', 'main',
        {authentication: cdk.SecretValue.secretsManager("github-token-v4",{jsonField:"github-token-v4"})}),
        commands: [
          'npm ci',
          'npm run build',
          'npx cdk synth',
        ]
      })
    })
 }
}
