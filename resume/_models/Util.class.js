const DTE = class {
  /**
   * List of full month names in English.
   * @type {Array<string>}
   */
  static get MONTH_NAMES() {
    return [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ]
  }

  /**
   * List of full day names in English.
   * @type {Array<string>}
   */
  static get DAY_NAMES() {
    return [
      'Sundary',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ]
  }

  /**
   * Shortcut formatting functions.
   * @type {Object<function(Date):string>}
   */
  static get FORMATS() {
    return {
      'F'  : (date) => `${DTE.MONTH_NAMES[date.getUTCMonth()].slice(0,3)}`,
      'F Y': (date) => `${DTE.MONTH_NAMES[date.getUTCMonth()].slice(0,3)} ${date.getFullYear()}`,
    }
  }
}



/**
 * Utility class.
 * @module
 */
module.exports = class Util {
  /** @private */ constructor() {}

  /**
   * Additional static members for the Date class.
   * @namespace
   */
  static get Date() { return DTE }


  /**
   * NOTE: Type Definition
   * @typedef {Object} StateObj - of type {index:string, name:string, pop:number, area:number, region:Util.Region}
   * @property {string} index   - the postal code for the state
   * @property {string} name    - the name of the state
   * @property {number} pop     - population in people
   * @property {number} area    - area in square km
   * @property {Util.Region} region - region of US
   */

  /**
   * List of US State objects.
   * @type {Array<StateObj>}
   */
  static get STATE_DATA() {
    return [
      { code: 'AL',  name: 'Alabama'       ,  pop:  4779736,  area:  52419, region: Util.Region.SOUTH     },
      { code: 'AK',  name: 'Alaska'        ,  pop:   710231,  area: 663267, region: Util.Region.WEST      },
      { code: 'AZ',  name: 'Arizona'       ,  pop:  6392017,  area: 113998, region: Util.Region.SOUTHWEST },
      { code: 'AR',  name: 'Arkansas'      ,  pop:  2915918,  area:  53179, region: Util.Region.SOUTH     },
      { code: 'CA',  name: 'California'    ,  pop: 37253956,  area: 163696, region: Util.Region.WEST      },
      { code: 'CO',  name: 'Colorado'      ,  pop:  5029196,  area: 104094, region: Util.Region.WEST      },
      { code: 'CT',  name: 'Connecticut'   ,  pop:  3574097,  area:   5543, region: Util.Region.NORTHEAST },
      { code: 'DE',  name: 'Delaware'      ,  pop:   897934,  area:   2489, region: Util.Region.NORTHEAST },
      { code: 'FL',  name: 'Florida'       ,  pop: 18801310,  area:  65755, region: Util.Region.SOUTH     },
      { code: 'GA',  name: 'Georgia'       ,  pop:  9687653,  area:  59425, region: Util.Region.SOUTH     },
      { code: 'HI',  name: 'Hawaii'        ,  pop:  1360301,  area:  10931, region: Util.Region.WEST      },
      { code: 'ID',  name: 'Idaho'         ,  pop:  1567582,  area:  83570, region: Util.Region.WEST      },
      { code: 'IL',  name: 'Illinois'      ,  pop: 12830632,  area:  57914, region: Util.Region.MIDWEST   },
      { code: 'IN',  name: 'Indiana'       ,  pop:  6483802,  area:  36418, region: Util.Region.MIDWEST   },
      { code: 'IA',  name: 'Iowa'          ,  pop:  3046355,  area:  56272, region: Util.Region.MIDWEST   },
      { code: 'KS',  name: 'Kansas'        ,  pop:  2853118,  area:  82277, region: Util.Region.MIDWEST   },
      { code: 'KY',  name: 'Kentucky'      ,  pop:  4339367,  area:  40409, region: Util.Region.SOUTH     },
      { code: 'LA',  name: 'Louisiana'     ,  pop:  4533372,  area:  51840, region: Util.Region.SOUTH     },
      { code: 'ME',  name: 'Maine'         ,  pop:  1328361,  area:  35385, region: Util.Region.NORTHEAST },
      { code: 'MD',  name: 'Maryland'      ,  pop:  5773552,  area:  12407, region: Util.Region.NORTHEAST },
      { code: 'MA',  name: 'Massachusetts' ,  pop:  6547629,  area:  10555, region: Util.Region.NORTHEAST },
      { code: 'MI',  name: 'Michigan'      ,  pop:  9883640,  area:  96716, region: Util.Region.MIDWEST   },
      { code: 'MN',  name: 'Minnesota'     ,  pop:  5303925,  area:  86939, region: Util.Region.MIDWEST   },
      { code: 'MS',  name: 'Mississippi'   ,  pop:  2967297,  area:  48430, region: Util.Region.SOUTH     },
      { code: 'MO',  name: 'Missouri'      ,  pop:  5988927,  area:  69704, region: Util.Region.MIDWEST   },
      { code: 'MT',  name: 'Montana'       ,  pop:   989415,  area: 147042, region: Util.Region.WEST      },
      { code: 'NE',  name: 'Nebraska'      ,  pop:  1826341,  area:  77354, region: Util.Region.MIDWEST   },
      { code: 'NV',  name: 'Nevada'        ,  pop:  2700551,  area: 110561, region: Util.Region.WEST      },
      { code: 'NH',  name: 'New Hampshire' ,  pop:  1316470,  area:   9350, region: Util.Region.NORTHEAST },
      { code: 'NJ',  name: 'New Jersey'    ,  pop:  8791894,  area:   8721, region: Util.Region.NORTHEAST },
      { code: 'NM',  name: 'New Mexico'    ,  pop:  2059179,  area: 121589, region: Util.Region.SOUTHWEST },
      { code: 'NY',  name: 'New York'      ,  pop: 19378102,  area:  54556, region: Util.Region.NORTHEAST },
      { code: 'NC',  name: 'North Carolina',  pop:  9535483,  area:  53819, region: Util.Region.SOUTH     },
      { code: 'ND',  name: 'North Dakota'  ,  pop:   672591,  area:  70700, region: Util.Region.MIDWEST   },
      { code: 'OH',  name: 'Ohio'          ,  pop: 11536504,  area:  44825, region: Util.Region.MIDWEST   },
      { code: 'OK',  name: 'Oklahoma'      ,  pop:  3751351,  area:  69898, region: Util.Region.SOUTHWEST },
      { code: 'OR',  name: 'Oregon'        ,  pop:  3831074,  area:  98381, region: Util.Region.WEST      },
      { code: 'PA',  name: 'Pennsylvania'  ,  pop: 12702379,  area:  46055, region: Util.Region.NORTHEAST },
      { code: 'RI',  name: 'Rhode Island'  ,  pop:  1052567,  area:   1545, region: Util.Region.NORTHEAST },
      { code: 'SC',  name: 'South Carolina',  pop:  4625364,  area:  32020, region: Util.Region.SOUTH     },
      { code: 'SD',  name: 'South Dakota'  ,  pop:   814180,  area:  77117, region: Util.Region.MIDWEST   },
      { code: 'TN',  name: 'Tennessee'     ,  pop:  6346105,  area:  42143, region: Util.Region.SOUTH     },
      { code: 'TX',  name: 'Texas'         ,  pop: 25145561,  area: 268581, region: Util.Region.SOUTHWEST },
      { code: 'UT',  name: 'Utah'          ,  pop:  2763885,  area:  84899, region: Util.Region.WEST      },
      { code: 'VT',  name: 'Vermont'       ,  pop:   625741,  area:   9614, region: Util.Region.NORTHEAST },
      { code: 'VA',  name: 'Virginia'      ,  pop:  8260405,  area:  42774, region: Util.Region.SOUTH     },
      { code: 'WA',  name: 'Washington'    ,  pop:  6971406,  area:  71300, region: Util.Region.WEST      },
      { code: 'WV',  name: 'West Virginia' ,  pop:  1854304,  area:  24230, region: Util.Region.SOUTH     },
      { code: 'WI',  name: 'Wisconsin'     ,  pop:  5686986,  area:  65498, region: Util.Region.MIDWEST   },
      { code: 'WY',  name: 'Wyoming'       ,  pop:   563626,  area:  97814, region: Util.Region.WEST      },
    ]
  }

  /**
   * Enum for state regions.
   * @enum {string}
   */
  static get Region() {
    return {
      SOUTH    : 's',
      WEST     : 'w',
      SOUTHWEST: 'sw',
      NORTHEAST: 'ne',
      MIDWEST  : 'mw',
    }
  }
}
