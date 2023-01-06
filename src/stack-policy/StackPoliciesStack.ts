import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { StackPolicy } from './StackPolicy';

export interface StackPolicyAssignment {
  readonly stack: Stack;
  readonly policy: { Statement: Record<string, any>[] };
}

export interface StackPoliciesProps extends StackProps {
  readonly stackPoliciesAssignment: StackPolicyAssignment[];
}

export class StackPoliciesStack extends Stack {
  constructor(scope: Construct, id: string, props: StackPoliciesProps) {
    super(scope, id);

    for (const stackPolicyAssignment of props.stackPoliciesAssignment) {
      const { stack, policy } = stackPolicyAssignment;
      new StackPolicy(this, `policy-${stack.stackName}`, { policy: JSON.stringify(policy), protectedStack: stack });
    }
  }

}
