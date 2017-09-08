var Element  = require('helpers-js').Element
var City     = require('./City.class.js')
var Skill    = require('./Skill.class.js')
var Position = require('./Position.class.js')
var Degree   = require('./Degree.class.js')
var Award    = require('./Award.class.js')
var ProDev   = require('./ProDev.class.js')

const SKILLS = {
  content: [
    new Skill(5, '<span class="c-Acro">HTML</span>/<a class="c-Camo" rel="external" href="https://pugjs.org">Pug</a>'),
    new Skill(4, 'Microdata,<a class="c-Camo" rel="external" href="https://schema.org/">Schema.org</a>'),
    new Skill(3, '<abbr class="c-Acro" title="Web Accessibility Initiative—Accessible Rich Internet Applications">WAI-ARIA</abbr>'),
  ],
  design: [
    new Skill(5, '<span class="c-Acro">CSS</span>/<a class="c-Camo" rel="external" href="http://lesscss.org">Less</a>'),
    new Skill(3, '<span class="c-Acro">SVG</span>'),
    new Skill(4, '<a class="c-Camo"rel="external" href="http://jquery.com/">jQuery</a>'),
    new Skill(1, '<a class="c-Camo"rel="external" href="http://d3js.org/"><abbr title="Data-Driven Documents">D3</abbr>.js</a>'),
  ],
  programming: [
    new Skill(5, '<a class="c-Camo" rel="external" href="https://nodejs.org/">node.js</a>/<a class="c-Camo" rel="external" href="https://www.npmjs.com/">npm</a>'),
    // new Skill(4, 'ES6'),
    new Skill(2, 'Java'),
    new Skill(5, '<a class="c-Camo"rel="external" href="http://git-scm.com/">Git</a>'),
  ],
  data: [
    new Skill(3, '<span class="c-Acro">XML</span>/<abbr class="c-Acro" title="XML Schema Definition">XSD</abbr>'),
    // json schema (3)
    new Skill(4, '<a class="c-Camo"rel="external" href="http://www.latex-project.org/">\\(\\LaTeX\\)</a>'),
    // new Skill(1, '<abbr class="c-Acro" title="XML Stylesheet Language: Transformation">XSLT</abbr>'),
    // new Skill(2, '<abbr class="c-Acro" title="PHP: Hypertext Preprocessor">PHP</abbr>'),
  ],
  technical: [
    new Skill(5, 'technical writing &amp; style guides'),
    new Skill(3, 'color theory'),
    new Skill(4, 'typography'),
  ],
  apps: [
    new Skill(4, 'Key Curriculum Press <cite>Geometer&rsquo;s Sketchpad</cite>'),
    new Skill(2, 'Key Curriculum Press <cite>TinkerPlots</cite>'),
    new Skill(1, '<cite>Calculator-Based Ranger 2</cite>; <cite>TI-Navigator</cite>'),
    new Skill(3, 'SMART Technologies'),
    new Skill(1, '<cite>Logic Studio 9</cite>'),
    new Skill(1, 'Sonic Studio <cite>Soundblade</cite>'),
  ],
}

const POSITIONS = {
  technical: [
    new Position('asce', {
      title   : 'Web Developer',
      org     : { name: 'American Society of Civil Engineers', url: 'http://www.asce.org/', itemtype: 'http://schema.org/NGO' },
      dates   : { start: new Date('2015-07'), end: new Date() },
      location: new City('Reston', 'VA', { lat: 38.9555819, lon: -77.3490615 }),
      descriptions: [
        `Aid the development of 15+ independent conference sites in <a class="c-Camo" rel="external" href="https://www.drupal.org/">Drupal</a>.`,
        `Revamp site-wide <span class="c-Acro">CSS</span> codebase, create and implement new style guide.`,
        `Address cross-browser, cross-platform compatible <span class="c-Acro">CSS</span>.`,
        `Enforce mobile-first layout practices, design decisions.`,
        `Equip inclusive design patterns, accessible technical standards.`,
      ],
    }),
    new Position('osmosis', {
      title   : 'Front-end Developer',
      org     : { name: 'Knowledge Diffusion, <abbr title="Incorporated">Inc.</abbr>', url: 'http://www.osmosis.org/', itemtype: 'http://schema.org/LocalBusiness' },
      dates   : { start: new Date('2014-10'), end: new Date('2015-03') },
      location: new City('Charlottesville', 'VA', { lat: 38.035974, lon: -78.500286 }),
      descriptions: [
        `Implemented a feature that presented students their usage analytics using D3.js.`,
        `Automated construction of a dynamic, interactive graphical user interface with <span class="c-Acro">SVG</span> and Less.`,
        `Generated an interactive visualization for an Item Response Theory function and its parameters.`,
        `Corresponded with team members and endorsers on an,
          <a class="c-Camo" rel="external" href="https://www.sbir.gov/"><abbr class="c-Acro" title="Small Business Innovation Research">SBIR</abbr></a>
          grant proposal for extending <cite>Osmosis</cite> to an undergraduate biology platform.`,
      ],
    }),
    new Position('VTSC-web', {
      title   : 'Webmaster',
      org     : { name: 'Virginia Tech <span itemprop="sport">Swim</span> Club', url: 'http://www.swim.org.vt.edu/', itemtype: 'http://schema.org/SportsTeam' },
      dates   : { start: new Date('2009-08'), end: new Date('2011-05') },
      location: new City('Blacksburg', 'VA', { lat: 37.22667, lon: -80.42157 }),
      descriptions: [
        `Authored, administered, updated club&rsquo;s site in <span class="c-Acro">PHP</span>.`,
        `Created, sent surveys and election polls to members.`,
      ],
    }),
  ],
  teaching: [
    new Position('WMMS', {
      title   : 'Teacher, Math 7',
      org     : { name: 'William Monroe Middle School', url: 'http://greenecounty.va.schoolwebpages.com/education/school/school.php?sectionid=6&linkid=nav-menu-container-1-32138', itemtype: 'http://schema.org/MiddleSchool' },
      dates   : { start: new Date('2013-08'), end: new Date('2014-06') },
      location: new City('Stanardsville', 'VA', { lat: 38.294019, lon: -78.443066 }),
      descriptions: [
        `Organized learning objectives from the <abbr class="c-Acro" title="Virginia Standards of Learning">VA SOLs</abbr> into subject-area-based curriculum.`,
        `Identified similarities/differences between state standards and <a class="c-Camo" rel="external" href="http://www.corestandards.org/">Common Core</a> standards.`,
      ],
    }),
    new Position('CHS', {
      title   : 'Teacher, Algebra II and Algebra II Honors',
      org     : { name: 'Charlottesville High School', url: 'http://ccs.k12.va.us/schools/chs/index.aspx', itemtype: 'http://schema.org/HighSchool' },
      dates   : { start: new Date('2012-08'), end: new Date('2013-06') },
      location: new City('Charlottesville', 'VA', { lat: 38.052427, lon: -78.476109 }),
      descriptions: [
        `Differentiated academic/honors pacing guides, curriculum, instruction.`,
        `Assistant coached
          <span itemscope="" itemtype="http://schema.org/SportsTeam">
            <span itemprop="name">Charlottesville High School <span itemprop="sport">Swimming</span></span>,
            <time datetime="2012-11">Nov</time>&ndash;<time datetime="2013-02">Feb</time>, for
            <span itemprop="coach" itemscope="" itemtype="http://schema.org/Person">
              <span itemprop="name">Ron Price</span>
            </span>
          </span>.`,
      ],
    }),
    new Position('PHHS', {
      title   : 'Student Teaching, Geometry and Algebra II',
      org     : { name: 'Patrick Henry High School', url: 'http://ph.rcps.info/', itemtype: 'http://schema.org/HighSchool' },
      dates   : { start: new Date('2012-02'), end: new Date('2012-04') },
      location: new City('Roanoke', 'VA', { lat: 37.2559901, lon: -79.9836085 }),
      descriptions: [
        // `Cooperating Teacher: <span itemscope="" itemtype="http://schema.org/Person"><span itemprop="name">Ben Bazak</span></span>.`,
        // `Constructed, delivered own lesson plans, assessment tools.`,
          `Periodically video recorded myself teaching lessons for self-evaluation.`,
          `Synthesized cumulative electronic portfolio featuring evidence of the 10
            <a class="c-Camo" rel="external" href="http://www.ccsso.org/Resources/Programs/Interstate_Teacher_Assessment_Consortium_(InTASC).html">
              <abbr class="c-Acro" title="Interstate Teacher Assessment and Support Consortium">InTASC</abbr>
            </a> standards.`,
      ],
    }),
    new Position('AMS', {
      title   : 'Internship, Math 7 and Pre-Algebra',
      org     : { name: 'Auburn Middle School', url: 'http://www.mcps.org/AMS/', itemtype: 'http://schema.org/MiddleSchool' },
      dates   : { start: new Date('2011-09'), end: new Date('2011-12') },
      location: new City('Riner', 'VA', { lat: 37.061729, lon: -80.442635 }),
      descriptions: [
        // `Cooperating Teacher: <span itemscope="" itemtype="http://schema.org/Person"><span itemprop="name">Eric Altizer</span></span>.`,
        `Assisted cooperating teacher with grading, attendance, classroom management.`,
        // `Mirror-taught lessons, modified/constructed and taught lesson plans for entire class periods.`,
        `Conducted intensive student interview to assess understanding of a specific topic.`,
        // `Attended after-school programs, clubs, parent-teacher conferences, team meetings.`,
      ],
    }),
    new Position('SJMS', {
      title   : '<abbr class="c-Acro" title="English Language Learner"><span class="c-Acro__First">E</span>LL</abbr> Teaching Project',
      org     : { name: 'Stonewall Jackson Middle School', url: 'http://jackson.sjms.rcps.info/', itemtype: 'http://schema.org/MiddleSchool' },
      dates   : { start: new Date('2011-10'), end: new Date('2011-11') },
      location: new City('Roanoke', 'VA', { lat: 37.265693, lon: -79.926149 }),
      descriptions: [
        // `Supervisor:
        //   <span itemscope="" itemtype="http://schema.org/Person">
        //     <span itemprop="name">Betti Kreye</span>,
        //     <span itemprop="affiliation" itemscope="" itemtype="http://schema.org/EducationalOrganization">
        //       <span itemprop="name">Virginia Tech</span>
        //     </span>
        //   </span>.`,
        `Diagnosed, analyzed gaps between Math
          <abbr class="c-Acro" title="Virginia Standards of Learning">VA SOLs</abbr> and
          <abbr class="c-Acro" title="World-Class Instructional Design and Assessment">WIDA</abbr>
          Can Do Standards.`,
        // `Conducted observations in math classes,
        //   <abbr class="c-Acro" title="English Language Learner">ELL</abbr> classes following observation
        //   protocol.`,
        // `Designed lesson plans that provide access to content concepts for
        //   <abbr class="c-Acro" title="English Language Learners">ELLs</abbr>, based on both sets
        //   of standards.`,
        `Worked with colleagues to construct and peer-teach a lesson using manipulatives.`,
      ],
    }),
    new Position('BHS', {
      title   : 'Early Field Experience, Geometry and Algebra II',
      org     : { name: 'Blacksburg High School', url: 'http://www.mcps.org/bhs/', itemtype: 'http://schema.org/HighSchool' },
      dates   : { start: new Date('2011-02'), end: new Date('2011-04') },
      location: new City('Blacksburg', 'VA', { lat: 37.210454, lon: -80.460639 }),
      descriptions: [
        // `Cooperating Teacher: <span itemscope="" itemtype="http://schema.org/Person"><span itemprop="name">Bill Noble</span></span>.`,
        `Assisted cooperating teacher with a variety of classroom duties.`,
        `Tutored students in small groups, one-on-one.`,
        `Conducted classroom observations, compared findings with professional research on the 6
          <abbr class="c-Acro" title="National Council of Teachers of Mathematics">NCTM</abbr> principles.`,
      ],
    }),
    new Position('VTME', {
      title   : 'Mathematics Tutor',
      org     : { name: 'Virginia Tech Math Emporium', url: 'https://www.emporium.vt.edu/', itemtype: 'http://schema.org/EducationalOrganization' },
      dates   : { start: new Date('2010-08'), end: new Date('2011-12') },
      location: new City('Blacksburg', 'VA', { lat: 37.2337, lon: -80.4342 }),
      descriptions: [
        `Assisted students in first- and second-year collegiate mathematics courses.`,
        // `Helped with practice quizzes, homework problems.`,
        // `Reviewed lessons, clarified content material.`,
      ],
    }),
  ],
  other: [
    new Position('LE', {
      title   : 'Head <span itemprop="sport">Swim</span> Coach',
      org     : { name: 'Lakevale Estates', url: 'http://www.lakevale.org/lakevale-dolphins/', itemtype: 'http://schema.org/SportsTeam' },
      dates   : { start: new Date('2010-05'), end: new Date('2011-08') },
      location: new City('Vienna', 'VA', { lat: 38.8989018, lon: -77.2951528 }),
      descriptions: [
        `Instructed children ages 4&ndash;18 in water training basics, stroke technique, drill, sprint, endurance training.`,
        `Coached swim meets, help organize, attend team activities, fundraisers.`,
        `Constructed swimmer lineups for dual, individual, relay meets.`,
        // `Created positive learning environment for all swimmers.`,
        // `4-1 record (<time>2010</time>); 5-0 record, Division Champions (<time>2011</time>)`,
      ],
    }),
    new Position('VTSC-treas', {
      title   : 'Treasurer',
      org     : { name: 'Virginia Tech <span itemprop="sport">Swim</span> Club', url: 'http://www.swim.org.vt.edu/', itemtype: 'http://schema.org/SportsTeam' },
      dates   : { start: new Date('2009-08'), end: new Date('2011-05') },
      location: new City('Blacksburg', 'VA', { lat: 37.22667, lon: -80.42157 }),
      descriptions: [
        `Validated organization&rsquo;s identity with the <abbr class="c-Acro" title="Internal Revenue Service">IRS</abbr>.`,
        `Set up and administered bank account.`,
        `Managed club&rsquo;s income and expense funds.`,
        `Created projections and summaries of club&rsquo;s financial activity.`,
      ],
    }),
    new Position('VA', {
      title   : 'Assistant Swim Coach',
      org     : { name: 'Villa Aquatic <span itemprop="sport">Swim and Dive</span>', url: 'http://villaaquatic.com/', itemtype: 'http://schema.org/SportsTeam' },
      dates   : { start: new Date('2006-05'), end: new Date('2009-08') },
      location: new City('Fairfax', 'VA', { lat: 38.846711, lon: -77.330665 }),
      descriptions: [
        // `Head Coach: <span itemscope="" itemtype="http://schema.org/Person"><span itemprop="name">Matt Salerno</span></span>.`,
      ],
    }),
    new Position('beanco-manager', {
      title   : 'Assistant Manager',
      org     : { name: 'Beanco Aquatics', url: '', itemtype: 'http://schema.org/LocalBusiness' },
      dates   : { start: new Date('2006-05'), end: new Date('2009-08') },
      location: new City('Fairfax', 'VA', { lat: 38.846711, lon: -77.330665 }),
      descriptions: [
        // `Head Manager: <span itemscope="" itemtype="http://schema.org/Person"><span itemprop="name">Kevin Adams</span></span>.`,
        // `Supervised other assistant managers and lifeguards.`,
        `Designed scheduling systems and employee procedures.`,
        `Administered pool operations; safety, first-aid, response, cleanliness, chemicals, other equipment.`,
      ],
    }),
    new Position('beanco-lifeguard', {
      title   : 'Lifeguard',
      org     : { name: 'Beanco Aquatics', url: '', itemtype: 'http://schema.org/LocalBusiness' },
      dates   : { start: new Date('2003-05'), end: new Date('2009-08') },
      location: new City('Fairfax', 'VA', { lat: 38.846711, lon: -77.330665 }),
      descriptions: [
        `Tended to customers&rsquo; and patrons&rsquo; needs in a timely manner.`,
        `Obtained certification in <abbr class="c-Acro" title="cardiopulmonary resuscitation">CPR</abbr>, first aid, lifeguarding, pool operations.`,
      ],
    }),
  ],
}

const DEGREES = [
  new Degree(2012, 3.950, `<abbr title="Master of Arts in Education">M.A. Ed.</abbr> Curriculum and Instruction`),
  new Degree(2011, 3.539, `<abbr title="Bachelor of Science">B.S.</abbr> Mathematics, Education Option, <i lang="la">Cum Laude</i>`),
  new Degree(NaN , 3.248, `<abbr title="Bachelor of Arts">B.A.</abbr> Music, Technology Option, Piano Specialty`),
]

const PRODEVS = [
  new Award(`<time>2011</time>&ndash;<time>2014</time>`,
    new Element('span')
      .attr('itemscope','').attr('itemtype','http://schema.org/EducationalOrganization')
      .addElements([
        new Element('abbr').class('c-Acro')
          .attr('title','Virginia Council of Teachers of Mathematics').attr('itemprop','name')
          .addElements([ new Element('span').class('c-Acro__First').addContent(`V`) ])
          .addContent(`CTM`)
      ])
      .addContent(` Conference, annually statewide (<time datetime="PT40H">10 hr each</time>)`)
      .html()
  ),
  new ProDev(
    { start: new Date('2014-03-14'), end: new Date('2014-03-15') },
    new City('Harrisonburg', 'VA', { lat: 38.4393105, lon: -78.8711824 }),
    10,
    new Element('span')
      .attr('itemprop','organizer').attr('itemscope','').attr('itemtype','http://schema.org/EducationalOrganization')
      .addElements([
        new Element('abbr').class('c-Acro')
          .attr('title','Virginia Council of Teachers of Mathematics').attr('itemprop','name')
          .addElements([ new Element('span').class('c-Acro__First').addContent(`V`) ])
          .addContent(`CTM`)
      ])
      .addContent(` Conference`)
      .html(),
    'http://schema.org/EducationEvent'
  ),
  new ProDev(
    { start: new Date('2013-03-08'), end: new Date('2013-03-09') },
    new City('Virginia Beach', 'VA', { lat: 36.7674971, lon: -76.0476647 }),
    10,
    new Element('span')
      .attr('itemprop','organizer').attr('itemscope','').attr('itemtype','http://schema.org/EducationalOrganization')
      .addElements([
        new Element('abbr').class('c-Acro')
          .attr('title','Virginia Council of Teachers of Mathematics').attr('itemprop','name')
          .addElements([ new Element('span').class('c-Acro__First').addContent(`V`) ])
          .addContent(`CTM`)
      ])
      .addContent(` Conference`)
      .html(),
    'http://schema.org/EducationEvent'
  ),
  new ProDev(
    { start: new Date('2012-03-09'), end: new Date('2012-03-10') },
    new City('Roanoke', 'VA', { lat: 37.2743219, lon: -79.9575425 }),
    10,
    new Element('span')
      .attr('itemprop','organizer').attr('itemscope','').attr('itemtype','http://schema.org/EducationalOrganization')
      .addElements([
        new Element('abbr').class('c-Acro')
          .attr('title','Virginia Council of Teachers of Mathematics').attr('itemprop','name')
          .addElements([ new Element('span').class('c-Acro__First').addContent(`V`) ])
          .addContent(`CTM`)
      ])
      .addContent(` Conference`)
      .html(),
    'http://schema.org/EducationEvent'
  ),
  new ProDev(
    { start: new Date('2011-03-11'), end: new Date('2011-03-12') },
    new City('Richmond', 'VA', { lat: 37.5246609, lon: -77.4932615 }),
    10,
    new Element('span')
      .attr('itemprop','organizer').attr('itemscope','').attr('itemtype','http://schema.org/EducationalOrganization')
      .addElements([
        new Element('abbr').class('c-Acro')
          .attr('title','Virginia Council of Teachers of Mathematics').attr('itemprop',"name")
          .addElements([ new Element('span').class('c-Acro__First').addContent(`V`) ])
          .addContent(`CTM`)
      ])
      .addContent(` Conference`)
      .html(),
    'http://schema.org/EducationEvent'
  ),
  new Award(`<time datetime="2011-08-12" itemprop="startDate endDate">12 Oct 2011</time>`,
    new Element('span')
      .attr('itemscope','').attr('itemtype','http://schema.org/Event')
      .addElements([
        new Element('span').attr('itemprop','name').addContent(`Secondary Mathematics Instruction in an Inclusive Classroom`),
        new Element('time').attr('datetime','PT3H').attr('itemprop','duration').addContent(` (3 hr)`),
      ])
      .html()
  ),
  new Award(`<time datetime="2009-03-28" itemprop="startDate endDate">28 Mar 2009</time>`,
    new Element('span')
      .attr('itemscope','').attr('itemtype','http://schema.org/Event')
      .addElements([
        new Element('span').attr('itemprop','name').addContent(`Preservice Teacher Education with TI-Nspire Technology`),
        new Element('time').attr('datetime','PT9H').attr('itemprop','duration').addContent(` (9 hr)`),
      ])
      .html()
  ),
]

const AWARDS = [
  new Award(`valid <time>2012</time>&ndash;<time>2017</time>`,
    `Virginia Postgraduate Professional Licence, Secondary Mathematics`),
  new Award(`<time datetime="2011-08"><abbr title="Fall">Fa</abbr> 2011</time>&ndash;<time datetime="2012-05"><abbr title="Spring">Sp</abbr> 2012</time>`,
    `Robert Noyce Scholarship`),
  new Award(`<time datetime="2010-11-13">13 Nov 2010</time>`,
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
    `Fairfax High School Marching, Symphonic, Jazz Bands`
    + new Element('dl').class('o-ListAchv')
      .addContent([
        new Award(`<time>2005</time>&ndash;<time>2006</time>`,`Trombone I &amp; Field Captain`),
        new Award(`<time>2003</time>&ndash;<time>2004</time>`,`Trombone II`),
      ].map((item) => item.view()).join(''))
      .html()
  ),
]

const TEAMS = [
  new Award(`<time>2007</time>&ndash;<time>2012</time>`,
    new Element('span')
      .attr('itemscope','').attr('itemtype','http://schema.org/SportsTeam')
      .addElements([
        new Element('a').class('c-Camo')
          .attr('rel','external').attr('href','http://www.swim.org.vt.edu/').attr('itemprop','url')
          // .attrObj({ rel:'external', href:'http://www.swim.org.vt.edu/', itemprop:'url' })
          .addElements([
            new Element('span').attr('itemprop','name')
              .addContent(`Virginia Tech `)
              .addElements([ new Element('span').attr('itemprop','sport').addContent(`Swim`) ])
              .addContent(` Club`)
          ])
      ]).html()
  ),
  new Award(`<time>2003</time>&ndash;<time>2006</time>`,
    new Element('div').attr('style','display:inline;')
      .attr('itemscope','').attr('itemtype','http://schema.org/SportsTeam')
      .addElements([
        new Element('a').class('c-Camo')
          .attr('rel','external').attr('href','http://www.fairfaxhighsports.org/index.cfm?action=main.team&ID=2329').attr('itemprop','url')
          .addElements([
            new Element('span').attr('itemprop','name')
              .addContent(`Fairfax High School Varsity `)
              .addElements([ new Element('span').attr('itemprop','sport').addContent(`Swim and Dive`) ])
          ])
      ])
      .addContent(`, `)
      .addElements([
        new Element('span')
          .attr('itemscope','').attr('itemtype','http://schema.org/EducationalOrganization')
          .addElements([
            new Element('a').class('c-Camo')
              .attr('rel','external').attr('href','http://www.vhsl.org/').attr('itemprop','url')
              .addElements([
                new Element('abbr').class('c-Acro')
                  .attr('title','Virginia High School League').attr('itemprop','name')
                  .addContent(`VHSL`)
              ])
          ]),
        new Element('dl').class('o-ListAchv')
          .addContent([
            new Award(`<time>2003</time>&ndash;<time>2006</time>`,`Four-year letter achiever`),
            new Award(`<time>2004</time>, <time>2006</time>`,`VA State qualifier for 200 Free Relay`),
          ].map((item) => item.view()).join('')),
      ])
      .html()
  ),
  new Award(`<time>1994</time>&ndash;<time>2006</time>`,
    new Element('div').attr('style','display:inline;')
      .attr('itemscope','').attr('itemtype','http://schema.org/SportsTeam')
      .addElements([
        new Element('a').class('c-Camo')
          .attr('rel','external').attr('href','http://villaaquatic.com/').attr('itemprop','url')
          .addElements([
            new Element('span').attr('itemprop','name')
              .addContent(`Villa Aquatic `)
              .addElements([ new Element('span').attr('itemprop','sport').addContent(`Swim and Dive`) ])
          ])
      ])
      .addContent(`, `)
      .addElements([
        new Element('span')
          .attr('itemscope','').attr('itemtype','http://schema.org/Organization')
          .addElements([
            new Element('a').class('c-Camo')
              .attr('rel','external').attr('href','http://nvsl.nvblu.com/').attr('itemprop','url')
              .addElements([
                new Element('abbr').class('c-Acro')
                  .attr('title','Northern Virginia Swim League').attr('itemprop','name')
                  .addContent(`NVSL`)
              ])
          ]),
        new Element('dl').class('o-ListAchv')
          .addContent([
            new Award(`<time>2005</time>`,`Team record breaker in 200 Free Relay`),
            new Award(`<time>2000</time>, <time>2002</time>`,`All-Star competitor in 50 Free`),
          ].map((item) => item.view()).join('')),
      ])
      .html()
  ),
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
   * Contact data for this resume.
   * ```json
   * {
   *   "$schema": "http://json-schema.org/draft-06/schema#",
   *   "title": "Resume.CONTACT_DATA",
   *   "description": "Contact data for this resume.",
   *   "type": "array",
   *   "items": {
   *     "type": "object",
   *     "required": ["url", "octicon", "content"],
   *     "additionalProperties": false,
   *     "properties": {
   *       "url"     : { "type": "string", "description": "url of the link" },
   *       "octicon" : { "type": "string", "description": "octicon CSS class of the icon" },
   *       "itemprop": { "type": "string", "description": "(optional) itemprop Microdata of the contact point" },
   *       "content" : { "type": "string", "description": "text content of the link" }
   *     }
   *   }
   * }
   * ```
   * @type {Array<Object<string>>}
   */
  static get CONTACT_DATA() {
    return [
      {
        url     : 'tel:+17035072467',
        octicon : 'octicon-device-mobile',
        itemprop: 'telephone',
        content : `(703) 507-2467`,
      },
      {
        url     : 'mailto:chrisharvey2pi@gmail.com',
        octicon : 'octicon-mail',
        itemprop: 'email',
        content : `chrisharvey2pi@gmail.com`,
      },
      {
        url     : 'https://chharvey.github.io/',
        octicon : 'octicon-home',
        itemprop: 'url',
        content : `chharvey.github.io`,
      },
    ]
  }

  /**
   * List of skills, grouped by category.
   * @type {Object<Array<Skill>>}
   */
  static get SKILLS() { return SKILLS }

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
