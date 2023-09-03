export type AwsTags = {
  app: string;
  team: string;
  env: string;
  repo: string;
  infraAsCode: 'cdk';
} & Record<string, string>;

export interface AdditionalTags {
  stackName?: string;
}
