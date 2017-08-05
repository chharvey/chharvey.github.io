var Skill    = require('./Skill.class.js')
var Position = require('./Position.class.js')
var Degree   = require('./Degree.class.js')
var Award    = require('./Award.class.js')
var ProDev   = require('./ProDev.class.js')

const SKILLS = {
  lang_sys1: [
    new Skill(Skill.Level.EXPERT    , '<a class="c-Camo" rel="external" href="https://nodejs.org/">node.js</a>/<a class="c-Camo" rel="external" href="https://www.npmjs.com/">npm</a>'),
    new Skill(Skill.Level.EXPERT    , '<span class="c-Acro">HTML</span>/<a class="c-Camo" rel="external" href="https://pugjs.org">Pug</a>'),
    new Skill(Skill.Level.PROFICIENT, 'Microdata,<a class="c-Camo" rel="external" href="https://schema.org/">Schema.org</a>'),
    new Skill(Skill.Level.COMPETENT , '<abbr class="c-Acro" title="Web Accessibility Initiative—Accessible Rich Internet Applications">WAI-ARIA</abbr>'),
    new Skill(Skill.Level.EXPERT    , '<span class="c-Acro">CSS</span>/<a class="c-Camo" rel="external" href="http://lesscss.org">Less</a>'),
    new Skill(Skill.Level.COMPETENT , '<span class="c-Acro">SVG</span>'),
  ],
  lang_sys2: [
    new Skill(Skill.Level.PROFICIENT, '<a class="c-Camo"rel="external" href="http://jquery.com/">jQuery</a>'),
    new Skill(Skill.Level.COMPETENT , '<span class="c-Acro">XML</span>/<abbr class="c-Acro" title="XML Schema Definition">XSD</abbr>'),
    new Skill(Skill.Level.BEGINNER  , 'Java'),
    new Skill(Skill.Level.PROFICIENT, '<a class="c-Camo"rel="external" href="http://www.latex-project.org/">\\(\\LaTeX\\)</a>'),
    new Skill(Skill.Level.NOVICE    , '<a class="c-Camo"rel="external" href="http://d3js.org/"><abbr title="Data-Driven Documents">D3</abbr>.js</a>'),
    new Skill(Skill.Level.EXPERT    , '<a class="c-Camo"rel="external" href="http://git-scm.com/">Git</a>'),
  ],
  lang_sys3: [
    new Skill(Skill.Level.NOVICE  , '<abbr class="c-Acro" title="XML Stylesheet Language: Transformation">XSLT</abbr>'),
    new Skill(Skill.Level.BEGINNER, '<abbr class="c-Acro" title="PHP: Hypertext Preprocessor">PHP</abbr>'),
  ],
  technical: [
    new Skill(Skill.Level.EXPERT    , 'technical writing &amp; style guides'),
    new Skill(Skill.Level.COMPETENT , 'color theory'),
    new Skill(Skill.Level.PROFICIENT, 'typography'),
  ],
}

const POSITIONS = {
  technical: [
    new Position('asce', 'Web Developer',
      { start: new Date('2015-07'), end: new Date() },
      new Position.City('Reston', 'VA', { lat: 38.9555819, lon: -77.3490615 }),
      { name: 'American Society of Civil Engineers', url: 'http://www.asce.org/', itemtype: 'http://schema.org/NGO' },
      true
    )
      .addDescription(`Aid the development of 15+ independent conference sites in <a class="c-Camo" rel="external" href="https://www.drupal.org/">Drupal</a>.`)
      .addDescription(`Revamp site-wide <span class="c-Acro">CSS</span> codebase, create and implement new style guide.`)
      .addDescription(`Address cross-browser, cross-platform compatible <span class="c-Acro">CSS</span>.`)
      .addDescription(`Enforce mobile-first layout practices, design decisions.`)
      .addDescription(`Equip inclusive design patterns, accessible technical standards.`),
    new Position('osmosis', 'Front-end Developer',
      { start: new Date('2014-10'), end: new Date('2015-03') },
      new Position.City('Charlottesville', 'VA', { lat: 38.035974, lon: -78.500286 }),
      { name: 'Knowledge Diffusion, <abbr title="Incorporated">Inc.</abbr>', url: 'http://www.osmosis.org/', itemtype: 'http://schema.org/LocalBusiness' }
    )
      .addDescription(`Implemented a feature that presented students their usage analytics using D3.js.`)
      .addDescription(`Automated construction of a dynamic, interactive graphical user interface with <span class="c-Acro">SVG</span> and Less.`)
      .addDescription(`Generated an interactive visualization for an Item Response Theory function and its parameters.`)
      .addDescription(`Corresponded with team members and endorsers on an
        <a class="c-Camo" rel="external" href="https://www.sbir.gov/"><abbr class="c-Acro" title="Small Business Innovation Research">SBIR</abbr></a>
        grant proposal for extending <cite>Osmosis</cite> to an undergraduate biology platform.`),
    new Position('VTSC-web', 'Webmaster',
      { start: new Date('2009-08'), end: new Date('2011-05') },
      new Position.City('Blacksburg', 'VA', { lat: 37.22667, lon: -80.42157 }),
      { name: 'Virginia Tech <span itemprop="sport">Swim</span> Club', url: 'http://www.swim.org.vt.edu/', itemtype: 'http://schema.org/SportsTeam' }
    )
      .addDescription(`Authored, administered, updated club&rsquo;s site in <span class="c-Acro">PHP</span>.`)
      .addDescription(`Created, sent surveys and election polls to members.`),
  ],
  teaching: [
    new Position('WMMS', 'Teacher, Math 7',
      { start: new Date('2013-08'), end: new Date('2014-06') },
      new Position.City('Stanardsville', 'VA', { lat: 38.294019, lon: -78.443066 }),
      { name: 'William Monroe Middle School', url: 'http://greenecounty.va.schoolwebpages.com/education/school/school.php?sectionid=6&linkid=nav-menu-container-1-32138', itemtype: 'http://schema.org/MiddleSchool' }
    )
      .addDescription(`Organized learning objectives from the <abbr class="c-Acro" title="Virginia Standards of Learning">VA SOLs</abbr> into subject-area-based curriculum.`)
      .addDescription(`Identified similarities/differences between state standards and <a class="c-Camo" rel="external" href="http://www.corestandards.org/">Common Core</a> standards.`),
    new Position('CHS', 'Teacher, Algebra II and Algebra II Honors',
      { start: new Date('2012-08'), end: new Date('2013-06') },
      new Position.City('Charlottesville', 'VA', { lat: 38.052427, lon: -78.476109 }),
      { name: 'Charlottesville High School', url: 'http://ccs.k12.va.us/schools/chs/index.aspx', itemtype: 'http://schema.org/HighSchool' }
    )
      .addDescription(`Differentiated academic/honors pacing guides, curriculum, instruction.`)
      .addDescription(`Assistant coached
        <span itemscope="" itemtype="http://schema.org/SportsTeam">
          <span itemprop="name">Charlottesville High School <span itemprop="sport">Swimming</span></span>,
          <time datetime="2012-11">Nov</time>&ndash;<time datetime="2013-02">Feb</time>, for
          <span itemprop="coach" itemscope="" itemtype="http://schema.org/Person">
            <span itemprop="name">Ron Price</span>
          </span>
        </span>.
      `),
    new Position('PHHS', 'Student Teaching, Geometry and Algebra II',
      { start: new Date('2012-02'), end: new Date('2012-04') },
      new Position.City('Roanoke', 'VA', { lat: 37.2559901, lon: -79.9836085 }),
      { name: 'Patrick Henry High School', url: 'http://ph.rcps.info/', itemtype: 'http://schema.org/HighSchool' }
    )
      .addDescription(`Cooperating Teacher: <span itemscope="" itemtype="http://schema.org/Person"><span itemprop="name">Ben Bazak</span></span>.`, true)
      .addDescription(`Constructed, delivered own lesson plans, assessment tools.`, true)
      .addDescription(`Periodically video recorded myself teaching lessons for self-evaluation.`)
      .addDescription(`Synthesized cumulative electronic portfolio featuring evidence of the 10
        <a class="c-Camo" rel="external" href="http://www.ccsso.org/Resources/Programs/Interstate_Teacher_Assessment_Consortium_(InTASC).html">
          <abbr class="c-Acro" title="Interstate Teacher Assessment and Support Consortium">InTASC</abbr>
        </a> standards.`),
    new Position('AMS', 'Internship, Math 7 and Pre-Algebra',
      { start: new Date('2011-09'), end: new Date('2011-12') },
      new Position.City('Riner', 'VA', { lat: 37.061729, lon: -80.442635 }),
      { name: 'Auburn Middle School', url: 'http://www.mcps.org/AMS/', itemtype: 'http://schema.org/MiddleSchool' }
    )
      .addDescription(`Cooperating Teacher: <span itemscope="" itemtype="http://schema.org/Person"><span itemprop="name">Eric Altizer</span></span>.`, true)
      .addDescription(`Assisted cooperating teacher with grading, attendance, classroom management.`)
      .addDescription(`Mirror-taught lessons, modified/constructed and taught lesson plans for entire class periods.`, true)
      .addDescription(`Conducted intensive student interview to assess understanding of a specific topic.`)
      .addDescription(`Attended after-school programs, clubs, parent-teacher conferences, team meetings.`, true),
    new Position('SJMS', '<abbr class="c-Acro" title="English Language Learner"><span class="c-Acro__First">E</span>LL</abbr> Teaching Project',
      { start: new Date('2011-10'), end: new Date('2011-11') },
      new Position.City('Roanoke', 'VA', { lat: 37.265693, lon: -79.926149 }),
      { name: 'Stonewall Jackson Middle School', url: 'http://jackson.sjms.rcps.info/', itemtype: 'http://schema.org/MiddleSchool' }
    )
      .addDescription(`Supervisor:
        <span itemscope="" itemtype="http://schema.org/Person">
          <span itemprop="name">Betti Kreye</span>,
          <span itemprop="affiliation" itemscope="" itemtype="http://schema.org/EducationalOrganization">
            <span itemprop="name">Virginia Tech</span>
          </span>
        </span>.`, true)
      .addDescription(`Diagnosed, analyzed gaps between Math
        <abbr class="c-Acro" title="Virginia Standards of Learning">VA SOLs</abbr> and
        <abbr class="c-Acro" title="World-Class Instructional Design and Assessment">WIDA</abbr>
        Can Do Standards.`)
      .addDescription(`Conducted observations in math classes,
        <abbr class="c-Acro" title="English Language Learner">ELL</abbr> classes following observation
        protocol.`, true)
      .addDescription(`Designed lesson plans that provide access to content concepts for
        <abbr class="c-Acro" title="English Language Learners">ELLs</abbr>, based on both sets
        of standards.`, true)
      .addDescription(`Worked with colleagues to construct and peer-teach a lesson using manipulatives.`),
    new Position('BHS', 'Early Field Experience, Geometry and Algebra II',
      { start: new Date('2011-02'), end: new Date('2011-04') },
      new Position.City('Blacksburg', 'VA', { lat: 37.210454, lon: -80.460639 }),
      { name: 'Blacksburg High School', url: 'http://www.mcps.org/bhs/', itemtype: 'http://schema.org/HighSchool' }
    )
      .addDescription(`Cooperating Teacher: <span itemscope="" itemtype="http://schema.org/Person"><span itemprop="name">Bill Noble</span></span>.`, true)
      .addDescription(`Assisted cooperating teacher with a variety of classroom duties.`)
      .addDescription(`Tutored students in small groups, one-on-one.`)
      .addDescription(`Conducted classroom observations, compared findings with professional research on the 6
        <abbr class="c-Acro" title="National Council of Teachers of Mathematics">NCTM</abbr> principles.`),
    new Position('VTME', 'Mathematics Tutor',
      { start: new Date('2010-08'), end: new Date('2011-12') },
      new Position.City('Blacksburg', 'VA', { lat: 37.2337, lon: -80.4342 }),
      { name: 'Virginia Tech Math Emporium', url: 'https://www.emporium.vt.edu/', itemtype: 'http://schema.org/EducationalOrganization' }
    )
      .addDescription(`Assisted students in first- and second-year collegiate mathematics courses.`)
      .addDescription(`Helped with practice quizzes, homework problems.`, true)
      .addDescription(`Reviewed lessons, clarified content material.`, true),
  ],
  other: [
    new Position('LE', 'Head <span itemprop="sport">Swim</span> Coach',
      { start: new Date('2010-05'), end: new Date('2011-08') },
      new Position.City('Vienna', 'VA', { lat: 38.8989018, lon: -77.2951528 }),
      { name: 'Lakevale Estates', url: 'http://www.lakevale.org/lakevale-dolphins/', itemtype: 'http://schema.org/SportsTeam' }
    )
      .addDescription(`Instructed children ages 4&ndash;18 in water training basics, stroke technique, drill, sprint, endurance training.`)
      .addDescription(`Coached swim meets, help organize, attend team activities, fundraisers.`)
      .addDescription(`Constructed swimmer lineups for dual, individual, relay meets.`)
      .addDescription(`Created positive learning environment for all swimmers.`, true)
      .addDescription(`4-1 record (<time>2010</time>); 5-0 record, Division Champions (<time>2011</time>)`, true),
    new Position('VTSC-treas', 'Treasurer',
      { start: new Date('2009-08'), end: new Date('2011-05') },
      new Position.City('Blacksburg', 'VA', { lat: 37.22667, lon: -80.42157 }),
      { name: 'Virginia Tech <span itemprop="sport">Swim</span> Club', url: 'http://www.swim.org.vt.edu/', itemtype: 'http://schema.org/SportsTeam' }
    )
      .addDescription(`Validated organization&rsquo;s identity with the <abbr class="c-Acro" title="Internal Revenue Service">IRS</abbr>.`)
      .addDescription(`Set up and administered bank account.`)
      .addDescription(`Managed club&rsquo;s income and expense funds.`)
      .addDescription(`Created projections and summaries of club&rsquo;s financial activity.`),
    new Position('VA', 'Assistant Swim Coach',
      { start: new Date('2006-05'), end: new Date('2009-08') },
      new Position.City('Fairfax', 'VA', { lat: 38.846711, lon: -77.330665 }),
      { name: 'Villa Aquatic <span itemprop="sport">Swim and Dive</span>', url: 'http://villaaquatic.com/', itemtype: 'http://schema.org/SportsTeam' }
    )
      .addDescription(`Head Coach: <span itemscope="" itemtype="http://schema.org/Person"><span itemprop="name">Matt Salerno</span></span>.`, true),
    new Position('beanco-manager', 'Assistant Manager',
      { start: new Date('2006-05'), end: new Date('2009-08') },
      new Position.City('Fairfax', 'VA', { lat: 38.846711, lon: -77.330665 }),
      { name: 'Beanco Aquatics', url: '', itemtype: 'http://schema.org/LocalBusiness' }
    )
      .addDescription(`Head Manager: <span itemscope="" itemtype="http://schema.org/Person"><span itemprop="name">Kevin Adams</span></span>.`, true)
      .addDescription(`Supervised other assistant managers and lifeguards.`, true)
      .addDescription(`Designed scheduling systems and employee procedures.`)
      .addDescription(`Administered pool operations; safety, first-aid, response, cleanliness, chemicals, other equipment.`),
    new Position('beanco-lifeguard', 'Lifeguard',
      { start: new Date('2003-05'), end: new Date('2009-08') },
      new Position.City('Fairfax', 'VA', { lat: 38.846711, lon: -77.330665 }),
      { name: 'Beanco Aquatics', url: '', itemtype: 'http://schema.org/LocalBusiness' }
    )
      .addDescription(`Tended to customers&rsquo; and patrons&rsquo; needs in a timely manner.`)
      .addDescription(`Obtained certification in <abbr class="c-Acro" title="cardiopulmonary resuscitation">CPR</abbr>, first aid, lifeguarding, pool operations.`),
  ],
}

const DEGREES = [
  new Degree(2012, 3.950, `<abbr title="Master of Arts in Education">M.A. Ed.</abbr> Curriculum and Instruction`),
  new Degree(2011, 3.539, `<abbr title="Bachelor of Science">B.S.</abbr> Mathematics, Education Option, <i lang="la">Cum Laude</i>`),
  new Degree(NaN , 3.248, `<abbr title="Bachelor of Arts">B.A.</abbr> Music, Technology Option, Piano Specialty`),
]

const PRODEVS = [
  new Award(`<time>2011</time>&ndash;<time>2014</time>`,
    `<span itemscope="" itemtype="http://schema.org/EducationalOrganization">
      <abbr class="c-Acro" title="Virginia Council of Teachers of Mathematics" itemprop="name">
        <span class="c-Acro__First">V</span>CTM
      </abbr>
      Conferences, annually statewide (<time datetime="PT40H">10 hr each</time>)
    </span>`),
  new ProDev(
    { start: new Date('2014-03-14'), end: new Date('2014-03-15') },
    new Position.City('Harrisonburg', 'VA', { lat: 38.4393105, lon: -78.8711824 }),
    10,
    `<span itemprop="organizer" itemscope="" itemtype="http://schema.org/EducationalOrganization">
      <abbr class="c-Acro" title="Virginia Council of Teachers of Mathematics" itemprop="name">
        <span class="c-Acro__First">V</span>CTM
      </abbr> Conference
    </span>`,
    'http://schema.org/EducationEvent'
  ),
  new ProDev(
    { start: new Date('2013-03-08'), end: new Date('2013-03-09') },
    new Position.City('Virginia Beach', 'VA', { lat: 36.7674971, lon: -76.0476647 }),
    10,
    `<span itemprop="organizer" itemscope="" itemtype="http://schema.org/EducationalOrganization">
      <abbr class="c-Acro" title="Virginia Council of Teachers of Mathematics" itemprop="name">
        <span class="c-Acro__First">V</span>CTM
      </abbr> Conference
    </span>`,
    'http://schema.org/EducationEvent'
  ),
  new ProDev(
    { start: new Date('2012-03-09'), end: new Date('2012-03-10') },
    new Position.City('Roanoke', 'VA', { lat: 37.2743219, lon: -79.9575425 }),
    10,
    `<span itemprop="organizer" itemscope="" itemtype="http://schema.org/EducationalOrganization">
      <abbr class="c-Acro" title="Virginia Council of Teachers of Mathematics" itemprop="name">
        <span class="c-Acro__First">V</span>CTM
      </abbr> Conference
    </span>`,
    'http://schema.org/EducationEvent'
  ),
  new ProDev(
    { start: new Date('2011-03-11'), end: new Date('2011-03-12') },
    new Position.City('Richmond', 'VA', { lat: 37.5246609, lon: -77.4932615 }),
    10,
    `<span itemprop="organizer" itemscope="" itemtype="http://schema.org/EducationalOrganization">
      <abbr class="c-Acro" title="Virginia Council of Teachers of Mathematics" itemprop="name">
        <span class="c-Acro__First">V</span>CTM
      </abbr> Conference
    </span>`,
    'http://schema.org/EducationEvent'
  ),
  new Award(`<time datetime="2011-08-12" itemprop="startDate endDate">12 Oct, 2011</time>`,
    `<span itemscope="" itemtype="http://schema.org/Event">
      <span itemprop="name">Secondary Mathematics Instruction in an Inclusive Classroom</span>
      <time datetime="PT3H" itemprop="duration">(3 hr)</time>
    </span>`),
  new Award(`<time datetime="2009-03-28" itemprop="startDate endDate">28 Mar, 2009</time>`,
    `<span itemscope="" itemtype="http://schema.org/Event">
      <span itemprop="name">Preservice Teacher Education with TI-Nspire Technology</span>
      <time datetime="PT9H" itemprop="duration">(9 hr)</time>
    </span>`),
]

const AWARDS = [
  new Award(`valid <time>2012</time>&ndash;<time>2017</time>`,
    `Virginia Postgraduate Professional Licence, Secondary Mathematics`),
  new Award(`<time datetime="2011-08"><abbr title="Fall">Fa</abbr> 2011</time>&ndash;<time datetime="2012-05"><abbr title="Spring">Sp</abbr> 2012</time>`,
    `Robert Noyce Scholarship`),
  new Award(`<time datetime="2010-11-13">13 Nov, 2010</time>`,
    `Educational Testing Service Recognition of Excellence`),
  new Award(`<time>2007</time>&ndash;<time>2011</time>`,
    `<span itemscope="" itemtype="http://schema.org/EducationalOrganization"><span itemprop="name">National Society of Collegiate Scholars</span></span>`),
  new Award(`<time>2007</time>&ndash;<time>2009</time>`,
    `<span itemscope="" itemtype="http://schema.org/Organization"><span itemprop="name">Virginia Tech Marching Virginians</span></span>, Trombone II`),
  new Award(`<time datetime="2006-11"><abbr title="Fall">Fa</abbr> 2006</time>, <time datetime="2007-11"><abbr title="Fall">Fa</abbr> 2007</time>, <time datetime="2008-05"><abbr title="Spring">Sp</abbr> 2008</time>`,
    `Dean&rsquo;s List`),
  new Award(`<time>2006</time>`,
    `<span itemscope="" itemtype="http://schema.org/EducationalOrganization"><span itemprop="name">National Honor Society</span></span>`),
  new Award(`<time>2003</time>&ndash;<time>2006</time>`,
    `Fairfax High School Marching, Symphonic, Jazz Bands <dl class="o-ListAchv -d-n">${[
      new Award(`<time>2005</time>&ndash;<time>2006</time>`,`Trombone I &amp; Field Captain`),
      new Award(`<time>2003</time>&ndash;<time>2004</time>`,`Trombone II`),
    ].map((el) => el.html()).join('')}</dl>`),
]

const TEAMS = [
  new Award(`<time>2007</time>&ndash;<time>2012</time>`,
    `<span itemscope="" itemtype="http://schema.org/SportsTeam">
      <a class="c-Camo" rel="external" href="http://www.swim.org.vt.edu/" itemprop="url">
        <span itemprop="name">Virginia Tech <span itemprop="sport">Swim</span> Club</span>
      </a>
    </span>`),
  new Award(`<time>2003</time>&ndash;<time>2006</time>`,
    `<div itemscope="" itemtype="http://schema.org/SportsTeam" style="display:inline;">
      <a class="c-Camo" rel="external" href="http://www.fairfaxhighsports.org/index.cfm?action=main.team&ID=2329" itemprop="url">
        <span itemprop="name">Fairfax High School Varsity <span itemprop="sport">Swim and Dive</span></span>
      </a>,
      <span itemscope="" itemtype="http://schema.org/EducationalOrganization">
        <a class="c-Camo" rel="external" href="http://www.vhsl.org/" itemprop="url">
          <abbr class="c-Acro" title="Virginia High School League" itemprop="name">VHSL</abbr>
        </a>
      </span>
      <dl class="o-ListAchv -d-n">${[
        new Award(`<time>2003</time>&ndash;<time>2006</time>`,`Four-year letter achiever`),
        new Award(`<time>2004</time>, <time>2006</time>`,`VA State qualifier for 200 Free Relay`),
      ].map((el) => el.html()).join('')}</dl>
    </div>`),
  new Award(`<time>1994</time>&ndash;<time>2006</time>`,
    `<div itemscope="" itemtype="http://schema.org/SportsTeam" style="display:inline;">
      <a class="c-Camo" rel="external" href="http://villaaquatic.com/" itemprop="url">
        <span itemprop="name">Villa Aquatic <span itemprop="sport">Swim and Dive</span></span>
      </a>,
      <span itemscope="" itemtype="http://schema.org/Organization">
        <a class="c-Camo" rel="external" href="http://nvsl.nvblu.com/" itemprop="url">
          <abbr class="c-Acro" title="Northern Virginia Swim League" itemprop="name">NVSL</abbr>
        </a>
      </span>
      <dl class="o-ListAchv -d-n">${[
        new Award(`<time>2005</time>`,`Team record breaker in 200 Free Relay`),
        new Award(`<time>2000</time>, <time>2002</time>`,`All-Star competitor in 50 Free`),
      ].map((el) => el.html()).join('')}</dl>
    </div>`),
]

/**
 * Static class for résumé content.
 * NOTE: since es6 classes cannot have static fields, I have used `static get` methods,
 * returning constants that have been declared outside the class.
 * This speeds up runtime as the objects above don’t have to be constructed each and every time
 * the static methods below are called.
 * @module
 */
module.exports = class Resume {
  /** @private */ constructor() {}

  /**
   * List of skills, grouped by category.
   * @type {Object<Array<Skill>>}
   */
  static get SKILLS() { return SKILLS }

  /**
   * List of software applications.
   * @type {Array<string>}
   */
  static get APPS() {
    return [
      `Key Curriculum Press <cite>Geometer&rsquo;s Sketchpad</cite>`,
      `Key Curriculum Press <cite>TinkerPlots</cite>`,
      `<cite>Calculator-Based Ranger 2</cite>; <cite>TI-Navigator</cite>`,
      `SMART Technologies`,
      `<cite>Logic Studio 9</cite>`,
      `Sonic Studio <cite>Soundblade</cite>`,
    ]
  }

  /**
   * List of positions, grouped by category.
   * @type {Object<Array<Position>>}
   */
  static get POSITIONS() { return POSITIONS }

  /**
   * List of degrees.
   * @type {Array<Degree>}
   */
  static get DEGREES() { return DEGREES }

  /**
   * List of professional development hours.
   * @type {Array<Award>}
   */
  static get PRODEVS() { return PRODEVS }

  /**
   * List of other awards & memberships.
   * @type {Array<Award>}
   */
  static get AWARDS() { return AWARDS }

  /**
   * List of athletic team memberships.
   * @type {Array<Award>}
   */
  static get TEAMS() { return TEAMS }
}
