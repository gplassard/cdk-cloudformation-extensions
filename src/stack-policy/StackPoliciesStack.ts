import { Stack } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { StackPolicy } from './StackPolicy';
import { BaseStack, BaseStackProps } from '../cloudformation/BaseStack';

export interface StackPolicyAssignment {
  readonly stack: BaseStack;
  readonly policy: { Statement: Record<string, any>[] };
}

export interface StackPoliciesProps extends BaseStackProps {
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
