import { describe, expect, it} from 'vitest';
import { App, Stack } from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import { StackPolicy } from '../../src';

describe('StackPolicy', () => {
  const app = new App();
  const protectedStack = new Stack(app, 'ProtectedStack');

  it('generate the correct cloudformation', () => {
    const stack = new Stack(app, 'Stack');
    const policy = new StackPolicy(stack, 'PolicyStack', {
      protectedStack: protectedStack,
      policy: JSON.stringify({
        Statement: [
          {
            Effect: 'Allow',
            Action: 'Update:*',
            Principal: '*',
            Resource: '*',
          },
          {
            Effect: 'Deny',
            Action: 'Update:Delete',
            Principal: '*',
            Resource: '*',
          },
        ],
      }, undefined, 4),
    });
    const template = Template.fromStack(stack);
    expect(template.toJSON()).toMatchSnapshot();
  });
});
