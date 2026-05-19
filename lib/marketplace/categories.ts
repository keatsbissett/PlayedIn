export const MARKETPLACE_CATEGORIES = {
  padel: {
    label: 'Padel', color: '#7CC47A',
    categories: [
      { slug: 'rackets', label: 'Rackets', desc: 'All padel rackets', tags: ['Power', 'Control', 'All-round'] },
      { slug: 'shoes', label: 'Shoes', desc: 'Padel-specific footwear', tags: ['Clay', 'Hard court', 'Indoor'] },
      { slug: 'balls', label: 'Balls & tubes', desc: 'Balls, tubes, accessories', tags: [] },
      { slug: 'bags', label: 'Bags & cases', desc: 'Racket bags and carry cases', tags: [] },
      { slug: 'apparel', label: 'Apparel', desc: 'Clothing and kit', tags: ['Tops', 'Shorts', "Women's"] },
      { slug: 'eyewear', label: 'Eyewear', desc: 'Sunglasses and protective eyewear', tags: [] },
      { slug: 'court-accessories', label: 'Court accessories', desc: 'Nets, lighting, flooring', tags: ['Nets', 'Lighting', 'Flooring'] },
      { slug: 'grips-strings', label: 'Grips & strings', desc: 'Overgrips and stringing', tags: [] },
      { slug: 'bundles', label: 'Full kits (bundle)', desc: 'Multi-item padel bundles', tags: [] },
    ]
  },
  golf: {
    label: 'Golf', color: '#D4A843',
    categories: [
      { slug: 'drivers', label: 'Drivers', desc: '1-wood and driver heads', tags: [] },
      { slug: 'fairway-woods', label: 'Fairway woods', desc: '3-wood, 5-wood etc.', tags: [] },
      { slug: 'hybrids', label: 'Hybrids', desc: 'Rescue clubs and hybrids', tags: [] },
      { slug: 'irons', label: 'Irons', desc: 'Individual irons and sets', tags: ['Blades', 'Cavity back', 'Full sets'] },
      { slug: 'wedges', label: 'Wedges', desc: 'Short game wedges', tags: ['Pitching', 'Sand', 'Lob'] },
      { slug: 'putters', label: 'Putters', desc: 'Blade, mallet and counterbalance', tags: [] },
      { slug: 'balls', label: 'Balls', desc: 'Golf balls by type', tags: ['Premium', 'Practice'] },
      { slug: 'bags-trolleys', label: 'Bags & trolleys', desc: 'Carry, cart, staff and electric', tags: [] },
      { slug: 'gps-rangefinders', label: 'GPS & rangefinders', desc: 'Laser and GPS devices', tags: [] },
      { slug: 'apparel', label: 'Apparel', desc: 'Golf clothing and footwear', tags: [] },
      { slug: 'bundles', label: 'Full bag sets (bundle)', desc: 'Complete club set bundles', tags: [] },
    ]
  },
  cycling: {
    label: 'Cycling', color: '#4ABFAD',
    categories: [
      { slug: 'complete-bikes', label: 'Complete bikes', desc: 'Full built-up bikes', tags: ['MTB', 'Road', 'Gravel'] },
      { slug: 'frames', label: 'Frames', desc: 'Framesets only', tags: [] },
      { slug: 'wheels-tyres', label: 'Wheels & tyres', desc: 'Wheelsets, rims, tyres and tubes', tags: [] },
      { slug: 'groupsets-components', label: 'Groupsets & components', desc: 'Drivetrains, brakes, derailleurs', tags: ['Shimano', 'SRAM', 'Campagnolo'] },
      { slug: 'handlebars-cockpit', label: 'Handlebars & cockpit', desc: 'Bars, stems, headsets', tags: [] },
      { slug: 'saddles-seatposts', label: 'Saddles & seatposts', desc: 'Saddles, dropper posts, seatposts', tags: [] },
      { slug: 'computers-gps', label: 'Computers & GPS', desc: 'Cycle computers and GPS units', tags: ['Garmin', 'Wahoo', 'Other'] },
      { slug: 'lighting', label: 'Lighting', desc: 'Front and rear lights', tags: [] },
      { slug: 'apparel-helmets', label: 'Apparel & helmets', desc: 'Kit, helmets, shoes and gloves', tags: [] },
      { slug: 'trainers-rollers', label: 'Trainers & rollers', desc: 'Smart trainers and rollers', tags: [] },
      { slug: 'bundles', label: 'Full builds (bundle)', desc: 'Multi-component bundle deals', tags: [] },
    ]
  },
  running: {
    label: 'Running', color: '#E8571A',
    categories: [
      { slug: 'shoes', label: 'Shoes', desc: 'Running shoes by surface and purpose', tags: ['Road', 'Trail', 'Track', 'Race day', 'Training'] },
      { slug: 'apparel', label: 'Apparel', desc: 'Running clothing and kit', tags: ['Tops', 'Shorts', 'Tights'] },
      { slug: 'gps-watches', label: 'GPS watches', desc: 'Running and multisport GPS watches', tags: ['Garmin', 'Polar', 'COROS', 'Apple'] },
      { slug: 'heart-rate-monitors', label: 'Heart rate monitors', desc: 'Chest straps and arm pods', tags: [] },
      { slug: 'hydration-vests', label: 'Hydration & vests', desc: 'Vests, belts and handheld bottles', tags: [] },
      { slug: 'nutrition', label: 'Nutrition & supplements', desc: 'Gels, powders and race nutrition', tags: [] },
      { slug: 'race-bibs', label: 'Race bibs & entries', desc: 'Transfer of race entries', tags: [] },
      { slug: 'recovery', label: 'Recovery gear', desc: 'Foam rollers, compression and massage', tags: ['Foam rollers', 'Compression boots'] },
      { slug: 'bundles', label: 'Full kits (bundle)', desc: 'Multi-item running bundles', tags: [] },
    ]
  }
} as const

export type Sport = keyof typeof MARKETPLACE_CATEGORIES
