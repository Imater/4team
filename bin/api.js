#!/usr/bin/env node
if (false && process.env.NODE_ENV !== 'production' && !process.env.__DISABLE_SSR__) {
  if (!require('piping')({
      hook: true,
      ignore: /(\/\.|~$|\.json$)/i
    })) {
    return;
  }
}
require('../server.babel');
require('../api/api');
