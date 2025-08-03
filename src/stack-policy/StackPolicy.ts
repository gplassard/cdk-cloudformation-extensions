import { Duration } from 'aws-cdk-lib';
import { RetentionDays } from 'aws-cdk-lib/aws-logs';
import { AwsCustomResource, AwsCustomResourcePolicy, PhysicalResourceId } from 'aws-cdk-lib/custom-resources';
import { Construct } from 'constructs';
import { BaseStack } from '../cloudformation/BaseStack';

export interface StackPolicyProps {
  readonly protectedStack: BaseStack;
  readonly policy: string;
}

export class StackPolicy extends Construct {
  constructor(scope: Construct, id: string, props: StackPolicyProps) {
    super(scope, id);

    new AwsCustomResource(this, `custom-resource-${props.protectedStack.stackName}`, {
      timeout: Duration.minutes(2),
      logRetention: RetentionDays.ONE_WEEK,
      onCreate: {
        service: 'CloudFormation',
        action: 'setStackPolicy',
        parameters: {
          StackName: props.protectedStack.stackName,
          StackPolicyBody: props.policy,
        },
        physicalResourceId: PhysicalResourceId.of(`policy-${props.protectedStack.stackName}`),
      },
      onUpdate: {
        service: 'CloudFormation',
        action: 'setStackPolicy',
        parameters: {
          StackName: props.protectedStack.stackName,
          StackPolicyBody: props.policy,
        },
        physicalResourceId: PhysicalResourceId.of(`policy-${props.protectedStack.stackName}`),
      },
      onDelete: {
        service: 'CloudFormation',
        action: 'setStackPolicy',
        parameters: {
          StackName: props.protectedStack.stackName,
          StackPolicyBody: JSON.stringify({
            Statement: [
              {
                Effect: 'Allow',
                Action: 'Update:*',
                Principal: '*',
                Resource: '*',
              },
            ],
          }, undefined, 4),
        },
        physicalResourceId: PhysicalResourceId.of(`policy-${props.protectedStack.stackName}`),
      },
      policy: AwsCustomResourcePolicy.fromSdkCalls({ resources: [props.protectedStack.stackId] }),
    });
  }
}
