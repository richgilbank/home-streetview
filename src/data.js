const panoramas = {
  basement: {
    0: 288,
  },
  bathroom: {
    0: 15,
  },
  bedroom: {
    0: 155,
    3: 22,
    4: -15,
    5: 3,
  },
  dining: {
    0: 15,
    1: 95,
    2: 43,
    3: -16,
    4: -10,
    5: -8,
  },
  ensuite: {
    4: 16,
    5: 14,
    6: 34,
  },
  entry: {
    0: 85,
    1: 70,
    2: 13,
    4: 13,
    5: 13,
  },
  garage: {
    0: 95,
  },
  kitchen: {
    0: 88,
    4: -10,
    5: -14,
  },
  living: {
    0: 0,
    1: 85,
    2: 14,
    3: 6,
    4: -8,
    5: -6,
  },
  master: {
    0: 17,
    1: 15,
    2: 13,
    3: 13,
    4: -15,
    5: 29,
  },
  study: {
    0: 88,
    2: -1,
    3: 21,
    4: 0,
    5: 25,
  },
  upstairs: {
    0: 330,
    4: 9,
  },
  yard: {
    0: 0,
  },
};

const panoramaLinks = {
  basement: [{
    heading: 320,
    pano: 'dining',
  }],
  bathroom: [{
    heading: 250,
    pano: 'upstairs',
  }],
  bedroom: [{
    heading: 160,
    pano: 'upstairs',
  }],
  dining: [{
    heading: 180,
    pano: 'living',
  }, {
    heading: 220,
    pano: 'entry',
  }, {
    heading: 320,
    pano: 'kitchen',
  }, {
    heading: 280,
    pano: 'basement',
  }],
  ensuite: [{
    heading: 150,
    pano: 'master',
  }],
  entry: [{
    heading: 80,
    pano: 'living',
  }, {
    heading: 10,
    pano: 'dining',
  }, {
    heading: 350,
    pano: 'upstairs',
  }],
  garage: [{
    heading: 180,
    pano: 'yard',
  }],
  kitchen: [{
    heading: 0,
    pano: 'yard',
  }, {
    heading: 180,
    pano: 'dining',
  }, {
    heading: 210,
    pano: 'basement',
  }],
  living: [{
    heading: 0,
    pano: 'dining',
  }, {
    heading: 270,
    pano: 'entry',
  }],
  master: [{
    heading: 330,
    pano: 'upstairs',
  }, {
    heading: 30,
    pano: 'ensuite',
  }],
  study: [{
    heading: 300,
    pano: 'upstairs',
  }],
  upstairs: [{
    heading: 200,
    pano: 'entry',
  }, {
    heading: 170,
    pano: 'master',
  }, {
    heading: 120,
    pano: 'study',
  }, {
    heading: 60,
    pano: 'bath',
  }, {
    heading: 0,
    pano: 'bedroom',
  }],
  yard: [{
    heading: 340,
    pano: 'garage',
  }, {
    heading: 210,
    pano: 'kitchen',
  }],
};

export { panoramas, panoramaLinks };