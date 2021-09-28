import { expect as expectCDK, matchTemplate, MatchStyle } from '@aws-cdk/assert';
import * as cdk from '@aws-cdk/core';
import * as AirdropCDK from '../lib/Airdrop/airdrop-stack';

test('Empty Stack', () => {
    const app = new cdk.App();
    // WHEN
    const stack = new AirdropCDK.AirdropStack(app, 'TestAirdropStack');
    // THEN
    expectCDK(stack).to(matchTemplate({
      "Resources": {}
    }, MatchStyle.EXACT))
});
