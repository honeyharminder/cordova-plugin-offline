//
//  CDVOfflineProtocol.m
//
//
//  Created by Harminder Singh on 18/02/20.
//

#import "CDVOfflineProtocol.h"

@implementation CDVOfflineProtocol

+ (BOOL)canInitWithRequest:(NSURLRequest *)request
{
    NSLog(@"REQUEST %@",request);
    return [super canInitWithRequest:request];
}

@end
