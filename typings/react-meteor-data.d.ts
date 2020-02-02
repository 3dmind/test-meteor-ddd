import * as React from 'react';

declare module 'meteor/react-meteor-data' {
  export function useTracker<TDataProps>(
    reactiveFn: () => TDataProps,
    deps?: React.DependencyList,
  ): TDataProps;
}
