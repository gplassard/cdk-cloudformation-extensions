import { App, Stack } from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import { StackPoliciesStack } from '../../src';

describe('StackPoliciesStack', () => {
  const app = new App();
  const firstProtectedStack = new Stack(app, 'FirstProtectedStack');
  const secondProtectedStack = new Stack(app, 'SecondProtectedStack');

  it('generate the correct cloudformation', () => {
    const policiesStack = new StackPoliciesStack(app, 'PolicyStack', {
      stackPoliciesAssignment: [
        {
          stack: firstProtectedStack,
          policy: {
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
          },
        },
        {
          stack: secondProtectedStack,
          policy: {
            Statement: [
              {
                Effect: 'Allow',
                Action: 'Update:*',
                Principal: '*',
                Resource: '*',
              },
              {
                Effect: 'Deny',
                Action: 'Update:Replace',
                Principal: '*',
                Resource: '*',
              },
            ],
          },
        },
      ],
    });
    const template = Template.fromStack(policiesStack);
    expect(template.toJSON()).toMatchSnapshot();
  });
});
