import { Stack, Tags } from 'aws-cdk-lib';
import { StackProps } from 'aws-cdk-lib/core/lib/stack';
import { Construct } from 'constructs';
import { AdditionalTags, AwsTags } from '../tags';

export interface BaseStackProps extends StackProps {
  stackName: string;
  tags: AwsTags;
}

export class BaseStack extends Stack {
  constructor(scope: Construct, id: string, props: BaseStackProps) {
    super(scope, id, props);

    const additionalTags: AdditionalTags = {
      stackName: props.stackName,
    };

    for (const [key, value] of Object.entries({ ...props.tags, ...additionalTags })) {
      Tags.of(this).add(key, value);
    }
  }
}
