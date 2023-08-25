import { ModuleSvg, TeacherSvg, VideoSvg } from "../components/svg-components";
import colors from "../config/colors";
export const GRADE_LEVEL = [
  "Kinder",
  "Grade 1",
  "Grade 2",
  "Grade 3",
  "Grade 4",
  "Grade 5",
  "Grade 6",
];
export const PASSING_SCORE = {
  KINDER: 10,
  GRADE13: 20,
  GRADE46: 6,
};
export const CAROUSEL_DATA = [
  {
    title: "App-Mazing Games",
    description:
      "There are many games here for kinder up to grade 6 whose content is counting and recognize numbers, the four fundamental operations.",
    image: require("../assets/images/carousel-images/slide1.png"),
  },
  {
    title: "App-Mazing Quiz",
    description:
      "Math Quiz is a great way to check math skills! Players choose a quiz from four different categories - Kinder, Grade 1 to Grade 6 and then the questions in the quiz are random and after they answer they can submit it and view the result of how many they got.",
    image: require("../assets/images/carousel-images/slide2.png"),
  },
  {
    title: "Video Lessons/ Learning Modules",
    description:
      "Student have the freedom to take change of their own learning with the ability to speed up, slow down, or replay each lesson as necessary. They can see the modules and video lessons that the teacher uploads to the application.",
    image: require("../assets/images/carousel-images/slide3.png"),
  },
];
export const FAQS_DATA = [
  {
    key: 1,
    title: "1. What is App-Mazing?",
    description: `
    •  It is a Mobile Learning Game-Based Application for a Child with Dyscalculia that contains letters, words, shapes, and numbers. This game can help kids understand numbers and symbols. These techniques often teach math concepts in a logical way in which one skill builds on the next. 
    
    •  App-Mazing is a tool to build entertaining, educational, and enjoyable content. Can enhance not only the overall e-learning experience but also its effectiveness.`,
  },
  {
    key: 2,
    title:
      "2. How is e-learning App-Mazing different from game based learning?",
    description: `
    •  The game itself is a component of the learning process in game-based learning. To achieve particular learning objectives, it is used at the product level inside an educational program, module, or topic.
    
    •  The purpose of the lesson is to either teach a particular ability to the students or to assess their comprehension of a topic.
`,
  },
  {
    key: 3,
    title: "3. What are game mechanics and game elements?",
    description: `
    In order to provide gameplay, game mechanics are structures of rules or techniques created for interacting with the game state. While a game's features are its game elements, adding them to the earning process makes it more interesting and motivational for students. The following are the most well-liked game components:
    
    •  Challenges
    •  Points
    •  Badges
    •  Leaderboards
    •  Levels
    •  Feedback     
    `,
  },
  {
    key: 4,
    title: "4. What are the benefits of gamification in eLearning?",
    description: `
    •  Healthy competition between learners, by including elements such as scores, leaderboards.
    
    •  A sense of accomplishment from obtaining badges or levelling up.
    
    •  Improved knowledge retention since playing games and taking quizzes makes it easier to gain and learned new information.
`,
  },
  {
    key: 5,
    title: "5. Can I use App-Mazing without internet connection?",
    description: `
    Users can access the application both offline (without internet connection) and online. however, if you use it without an internet connection, your score in the games will not be recorded or will not go to the system's database.`,
  },
  {
    key: 6,
    title: "6. Can I edit the personal information in my account?",
    description: `
    No, only the system administrator is able to edit it. The teacher at Papallasen Elementary School or whoever is incharge is the system's administrator.`,
  },
];
export const PLAY_NOW_DATA = [
  {
    key: 1,
    title: "Kinder",
    description:
      "They can learn to count numbers forward and backward properly, recognize and comparing numbers.",
    icon: require("../assets/images/play-images/cat1.png"),
    backgroundColor: colors.blue,
    link: "daycare_game",
    allowed: "Kinder",
  },
  {
    key: 2,
    title: "Grade 1-3",
    description:
      "They will learn comparing numbers, Adding and subtracting 3-digit numbers with regrouping.",
    icon: require("../assets/images/play-images/cat2.png"),
    backgroundColor: colors.yellow,
    link: "grade13_game",
    allowed: "Grade 1 Grade 2 Grade 3",
  },
  {
    key: 3,
    title: "Grade 4-6",
    description:
      "They will learn using all four operations - addition, subtraction, multiplication, and division to solve problems involving multi-digit numbers.",
    icon: require("../assets/images/play-images/cat3.png"),
    backgroundColor: colors.red,
    link: "grade46_game",
    allowed: "Grade 4 Grade 5 Grade 6",
  },
];

export const LEARN_DATA = [
  {
    label: "Learn with E-Modules",
    description: "Learn at the comfort of your own home.",
    name: "learn-modules",
    image: <ModuleSvg />,
  },
  {
    label: "Learn with Videos",
    description: "Learn today and have a bright future.",
    name: "learn-videos",
    image: <VideoSvg />,
  },
  {
    label: "Papallasen Elementary School Teachers",
    name: "learn-teachers",
    image: <TeacherSvg />,
  },
];

export const GAMES = [
  {
    label: "Birthday Candle Counting",
    value: 1,
    allowed: "Kinder",
    image: require("../assets/images/game-images/game-assestment-icons/cake_logo.png"),
  },
  {
    label: "Connect the number",
    value: 2,
    allowed: "Kinder",
    image: require("../assets/images/game-images/game-assestment-icons/one.png"),
  },
  {
    label: "Object Number Recognition ",
    value: 7,
    allowed: "Kinder",
    image: require("../assets/images/game-images/game-assestment-icons/recognition_logo.png"),
  },
  {
    label: "Math Symbol",
    value: 3,
    allowed: "Grade 1 Grade 2 Grade 3",
    image: require("../assets/images/game-images/game-assestment-icons/symbol.png"),
  },
  {
    label: "Balloon Game",
    value: 5,
    allowed: "Grade 1 Grade 2 Grade 3",
    image: require("../assets/images/game-images/game-assestment-icons/balloons.png"),
  },
  {
    label: "Balance the cups",
    value: 9,
    allowed: "Grade 1 Grade 2 Grade 3",
    image: require("../assets/images/game-images/balance-the-cups-images/balanceRight.png"),
  },
  {
    label: "Bubble Game",
    value: 4,
    allowed: "Grade 1 Grade 2 Grade 3",
    image: require("../assets/images/game-images/game-assestment-icons/bubble.png"),
  },
  {
    label: "Owl Game",
    value: 6,
    allowed: "Grade 4 Grade 5 Grade 6",
    image: require("../assets/images/game-images/game-assestment-icons/owl.png"),
  },

  {
    label: "Multi Pobble Game",
    value: 10,
    allowed: "Grade 4 Grade 5 Grade 6",
    image: require("../assets/images/game-images/multi-pobble-images/pobble.png"),
  },
  {
    label: "Charting Treasure",
    value: 11,
    allowed: "Grade 4 Grade 5 Grade 6",
    image: require("../assets/images/game-images/treasure-images/chest.png"),
  },
];

export const PLAY_MENU_DATA = {
  daycare_game: [
    {
      key: 1,
      title: "Birthday Candle Counting",
      backgroundColor: colors.yellow,
      image: require("../assets/images/game-images/game-assestment-icons/cake_logo.png"),
      description:
        "Birthday Candle Counting is a fun educational game that helps kids practice one-to-one counting from 1 to 10.",
    },
    {
      key: 2,
      title: "Connect the number",
      backgroundColor: colors.blue,
      image: require("../assets/images/game-images/game-assestment-icons/one.png"),
      description:
        "Connect numbers to corresponding right answer that helps kids identify the number faster.",
    },
    {
      key: 4,
      title: "Object Number Recognition ",
      backgroundColor: colors.red,
      image: require("../assets/images/game-images/game-assestment-icons/recognition_logo.png"),
      description:
        "Object Number Recognition is where students learn how to recognize different numbers using objects.",
    },
  ],
  grade13_game: [
    {
      key: 3,
      title: "Math Symbol",
      backgroundColor: colors.yellow,
      image: require("../assets/images/game-images/game-assestment-icons/symbol.png"),
      description:
        "Matching math operators or number to easily remember what math operator and number looks.",
    },
    {
      key: 7,
      title: "Balloon Game",
      backgroundColor: colors.blue,
      image: require("../assets/images/game-images/game-assestment-icons/balloons.png"),
      description:
        "Balloon game is similar to the bubble game but with subtraction, multiplication and division.",
    },
    {
      key: 9,
      title: "Balance the cups",
      backgroundColor: colors.red,
      image: require("../assets/images/game-images/balance-the-cups-images/balanceRight.png"),
      description:
        "Students apply an additive number relationship to determine a range of values for variables.",
    },
    {
      key: 6,
      title: "Bubble Game",
      backgroundColor: colors.green,
      image: require("../assets/images/game-images/game-assestment-icons/bubble.png"),
      description:
        "The bubble game to practice addition by finding the bubble with the correct product and popping it.",
    },
  ],
  grade46_game: [
    {
      key: 8,
      title: "Owl Game",
      backgroundColor: colors.yellow,
      image: require("../assets/images/game-images/game-assestment-icons/owl.png"),
      description: "The owl game to practice creating and solving equations",
    },
    {
      key: 10,
      title: "Multi Pobble Game",
      backgroundColor: colors.blue,
      image: require("../assets/images/game-images/multi-pobble-images/pobble.png"),
      description:
        "Students apply knowledge of factors and multiples to solve problems and apply the commutative property of multiplication.",
    },
    {
      key: 11,
      title: "Charting Treasure",
      backgroundColor: colors.red,
      image: require("../assets/images/game-images/treasure-images/chest.png"),
      description:
        "This activity has students following directions to find the buried treasure. It requires students to write down coordinate points, quadrants and locations on the map.",
    },
  ],
};

export const treasure_game_images = [
  require("../assets/images/game-images/treasure-images/chest.png"),
  require("../assets/images/game-images/treasure-images/shark.png"),
  require("../assets/images/game-images/treasure-images/mime.png"),
  require("../assets/images/game-images/treasure-images/pirate_abandoned.png"),
  require("../assets/images/game-images/treasure-images/pirate_bag.png"),
  require("../assets/images/game-images/treasure-images/pirate_indian.png"),
  require("../assets/images/game-images/treasure-images/ship.png"),
  require("../assets/images/game-images/treasure-images/skull.png"),
  require("../assets/images/game-images/treasure-images/volcano.png"),
  require("../assets/images/game-images/treasure-images/x.png"),
];

export const cheat_sheet_treasure = JSON.stringify([
  { x: "", y: "", value: "" },
  { x: "", y: "", value: "" },
  { x: "", y: "", value: "" },
  { x: "", y: "", value: "" },
  { x: "", y: "", value: "" },
  { x: "", y: "", value: "" },
  { x: "", y: "", value: "" },
  { x: "", y: "", value: "" },
  { x: "", y: "", value: "" },
  { x: "", y: "", value: "" },
  //second row
  { x: "", y: "", value: "" },
  { x: -4, y: 3, value: "" },
  { x: -3, y: 3, value: "" },
  { x: -2, y: 3, value: "" },
  { x: -1, y: 3, value: "" },
  { x: 0, y: 3, value: 3 },
  { x: 1, y: 3, value: "" },
  { x: 2, y: 3, value: "" },
  { x: 3, y: 3, value: "" },
  { x: 4, y: 3, value: "" },
  //third row
  { x: "", y: "", value: "" },
  { x: -4, y: 2, value: "" },
  { x: -3, y: 2, value: "" },
  { x: -2, y: 2, value: "" },
  { x: -1, y: 2, value: "" },
  { x: 0, y: 2, value: 2 },
  { x: 1, y: 2, value: "" },
  { x: 2, y: 2, value: "" },
  { x: 3, y: 2, value: "" },
  { x: 4, y: 2, value: "" },
  //forth row
  { x: "", y: "", value: "" },
  { x: -4, y: 1, value: "" },
  { x: -3, y: 1, value: "" },
  { x: -2, y: 1, value: "" },
  { x: -1, y: 1, value: "" },
  { x: 0, y: 1, value: 1 },
  { x: 1, y: 1, value: "" },
  { x: 2, y: 1, value: "" },
  { x: 3, y: 1, value: "" },
  { x: 4, y: 1, value: "" },
  // fifth row
  { x: "", y: "", value: "" },
  { x: -4, y: 0, value: -4 },
  { x: -3, y: 0, value: -3 },
  { x: -2, y: 0, value: -2 },
  { x: -1, y: 0, value: -1 },
  { x: 0, y: 0, value: 0 },
  { x: 1, y: 0, value: 1 },
  { x: 2, y: 0, value: 2 },
  { x: 3, y: 0, value: 3 },
  { x: 4, y: 0, value: 4 },
  //sixth row
  { x: "", y: "", value: "" },
  { x: -4, y: -1, value: "" },
  { x: -3, y: -1, value: "" },
  { x: -2, y: -1, value: "" },
  { x: -1, y: -1, value: "" },
  { x: 0, y: -1, value: -1 },
  { x: 1, y: -1, value: "" },
  { x: 2, y: -1, value: "" },
  { x: 3, y: -1, value: "" },
  { x: 4, y: -1, value: "" },
  //seventh row
  { x: "", y: "", value: "" },
  { x: -4, y: -2, value: "" },
  { x: -3, y: -2, value: "" },
  { x: -2, y: -2, value: "" },
  { x: -1, y: -2, value: "" },
  { x: 0, y: -2, value: -2 },
  { x: 1, y: -2, value: "" },
  { x: 2, y: -2, value: "" },
  { x: 3, y: -2, value: "" },
  { x: 4, y: -2, value: "" },
  //eight row
  { x: "", y: "", value: "" },
  { x: -4, y: -3, value: "" },
  { x: -3, y: -3, value: "" },
  { x: -2, y: -3, value: "" },
  { x: -1, y: -3, value: "" },
  { x: 0, y: -3, value: -3 },
  { x: 1, y: -3, value: "" },
  { x: 2, y: -3, value: "" },
  { x: 3, y: -3, value: "" },
  { x: 4, y: -3, value: "" },
]);

export const number_data = [
  { number: 0, word: "zero" },
  { number: 1, word: "one" },
  { number: 2, word: "two" },
  { number: 3, word: "three" },
  { number: 4, word: "four" },
  { number: 5, word: "five" },
  { number: 6, word: "six" },
  { number: 7, word: "seven" },
  { number: 8, word: "eight" },

  { number: 9, word: "nine" },
];
export const kinder_symbol_data = ["+", "-", "÷", "×"];
export const grade_symbol_data = [
  "+",
  "-",
  "÷",
  "×",
  "=",
  "<",
  ">",
  "≠",
  "%",
  "√",
];

export const numeric_data = [
  { equation: "5-3", choices: [1, 2, 3, 4] },
  { equation: "7-4", choices: [2, 3, 8, 11] },
  { equation: "5-0", choices: [0, 3, 4, 5] },
  { equation: "8-8", choices: [0, 8, 16, 20] },
  { equation: "9-2", choices: [4, 7, 11, 15] },
  { equation: "4+2", choices: [4, 5, 6, 7] },
  { equation: "1+6", choices: [5, 6, 7, 8] },
  { equation: "3+3", choices: [3, 4, 5, 6] },
  { equation: "7+5", choices: [12, 14, 16, 19] },
  { equation: "9+8", choices: [15, 17, 20, 21] },
];
export const cap_images = [
  require("../assets/images/game-images/counting-bottlecaps-images/cola1_cap.png"),
  require("../assets/images/game-images/counting-bottlecaps-images/cola2_cap.png"),
  require("../assets/images/game-images/counting-bottlecaps-images/cola3_cap.png"),
  require("../assets/images/game-images/counting-bottlecaps-images/pepsi1_cap.png"),
];

export const SYMBOL_VIDEO_DATA = [
  {
    allowed: "Grade 1 Grade 2 Grade 3",
    title: "Addition",
    description:
      "Ang proseso ng pagsasama-sama ng dalawa o higit pang mga numero sa isang kabuuan, na kinakatawan ng simbolo + ",
    source: require("../assets/videos/basic-math-symbol-videos/BM-ADDITION.mp4"),
  },
  {
    allowed: "Kinder Grade 1 Grade 2 Grade 3",
    title: "Basic Math Symbol",
    description:
      "Ang simbolo ng matematika ay isang figure o kumbinasyon ng mga figure na ginagamit upang kumatawan sa isang mathematical object, isang aksyon sa mathematical object, isang ugnayan sa pagitan ng mathematical object, o para sa structuring ng iba pang mga simbolo na nangyayari sa isang formula.",
    source: require("../assets/videos/basic-math-symbol-videos/BM-SYMBOL.mp4"),
  },
  {
    allowed: "Grade 1 Grade 2 Grade 3",
    title: "Subtraction",
    description:
      "Ang pagbabawas ay ang terminong ginamit upang ilarawan kung paano natin 'inaalis' ang isa o higit pang mga numero mula sa isa pa.",
    source: require("../assets/videos/basic-math-symbol-videos/BM-SUBTRACTION.mp4"),
  },
];

export const NUMBER_VIDEO_DATA = [
  {
    allowed: "Grade 1 Grade 2 Grade 3",
    title: "Pagdaragdag at pagbabawas ng mga numero",
    description:
      "Pang-edukasyon na video para matutunan ng mga bata kung paano magdagdag at magbawas sa isang masayang paraan",
    source: require("../assets/videos/number-recognition-videos/NR-GRADE13.mp4"),
  },
  {
    allowed: "Kinder",
    title: "Pagbibilang ng mga numero na may mga bagay",
    description:
      "Video na pang-edukasyon upang matutong magsulat at magbilang mula 1 hanggang 10 sa isang masayang paraan",
    source: require("../assets/videos/number-recognition-videos/NR-KINDER.mp4"),
  },
  {
    allowed: "Kinder Grade 1 Grade 2 Grade 3",
    title: "Connect the numbers with their spelling",
    description:
      "Ang pagsasanay na ito sa pagtutugma ng mga numero sa mga salita ay makakatulong sa iyo na maging pamilyar sa mga mag-aaral sa parehong mga numerical na digit at mga numerong salita na tumutugma sa kanila.",
    source: require("../assets/videos/number-recognition-videos/NR-CONNECT-NUMBER.mp4"),
  },
  {
    allowed: "Kinder Grade 1 Grade 2 Grade 3",
    title: "Number Words",
    description:
      "Number words are the alphabetical form of numbers. As the name suggests, these are numbers written in words. Word form is writing the numerical/number as you would say it in words.",
    source: require("../assets/videos/number-recognition-videos/NR-WORDS-ENGLISH.mp4"),
  },
  {
    allowed: "Kinder Grade 1 Grade 2 Grade 3",
    title: "Numero at ang kanilang mga salita/pagbaybay",
    description:
      "Ang mga salitang numero ay ang alpabetikong anyo ng mga numero. Gaya ng ipinahihiwatig ng pangalan, ito ay mga numerong nakasulat sa mga salita. Ang anyo ng salita ay isinusulat ang numerical/number gaya ng sasabihin mo sa mga salita.",
    source: require("../assets/videos/number-recognition-videos/NR-WORDS-TAGALOG.mp4"),
  },
];

export const DIAGNOSTIC_DATA = [
  {
    number: "1",
    question: "Ilan ang bilang sa mga ibinigay na bagay",
    question_image: require("../assets/images/diagnostic-images/question-1.png"),
    choices_type: "text",
    choices: [8, 9, 10, 11],
    answer: 2,
  },
  {
    number: "2",
    question: "Ilan ang bilang sa mga ibinigay na bagay",
    question_image: require("../assets/images/diagnostic-images/question-2.png"),
    choices_type: "text",
    choices: [15, 16, 18, 20],
    answer: 1,
  },
  {
    number: "3",
    question: "Alin ang tamang simbolo na gagamitin sa mga ibinigay na bagay",
    question_image: require("../assets/images/diagnostic-images/question-3.png"),
    choices_type: "text",
    choices: [">", "<", "=", "+"],
    answer: 0,
  },
  {
    number: "4",
    question: "Alin ang tamang simbolo na gagamitin sa mga ibinigay na bagay",
    question_image: require("../assets/images/diagnostic-images/question-4.png"),
    choices_type: "text",
    choices: [">", "<", "=", "+"],
    answer: 1,
  },
  {
    number: "5",
    question: `May limang mansanas na nakakarga sa unang basket. Sa pangalawang basket ay may tatlong
    karga. Bakit pinili ni Ana ang unang basket?`,
    choices_type: "text",
    choices: [
      "Mas marami ang laman nito",
      "Mas kakaunti ang laman nito",
      "Parehas ang laman nito",
      "Walang laman ito",
    ],
    answer: 0,
  },
  {
    number: "6",
    question: `Kung si Dina ay sumulat ng pitumpu't siyam. Anong numero ang dapat niyang isulat nang tama?`,
    choices_type: "text",
    choices: [59, 69, 79, 89],
    answer: 2,
  },
  {
    number: "7",
    question: `Sa bilang na 67. Ano ang Place Value sa may salungguhit na bilang?
    `,
    choices_type: "text",
    choices: ["tig-isa", "tig-dalawa", "tig-aanim", "tig-sampo"],
    answer: 2,
  },
  {
    number: "8",
    question: `Tingnang mabuti ang mga larawan. Ano ang masasabi mong ikaanim na prutas?`,
    choices_type: "image",
    choices: [
      require("../assets/images/diagnostic-images/a-8.png"),
      require("../assets/images/diagnostic-images/b-8.png"),
      require("../assets/images/diagnostic-images/c-8.png"),
      require("../assets/images/diagnostic-images/d-8.png"),
    ],
    answer: 3,

    question_image: require("../assets/images/diagnostic-images/question-8.png"),
  },
  {
    number: "9",
    question: `Aling prutas ang ikawalo?`,
    choices_type: "image",
    choices: [
      require("../assets/images/diagnostic-images/a-9.png"),
      require("../assets/images/diagnostic-images/b-9.png"),
      require("../assets/images/diagnostic-images/c-9.png"),
      require("../assets/images/diagnostic-images/d-9.png"),
    ],
    answer: 2,

    question_image: require("../assets/images/diagnostic-images/question-8.png"),
  },
  {
    number: "10",
    question: `Binigyan ka ulit ng nanay mo ng 20 pesos para pambili ng juice at tinapay. Nasaan ang larawan 
    ng perang ibinigay niya sa iyo?
    `,
    choices_type: "image",
    choices: [
      require("../assets/images/diagnostic-images/a-10.png"),
      require("../assets/images/diagnostic-images/b-10.png"),
      require("../assets/images/diagnostic-images/c-10.png"),
      require("../assets/images/diagnostic-images/d-10.png"),
    ],
    answer: 3,
  },
  {
    number: "11",
    question: `Anong simbolo ang ginagamit mo kapag pinagsama mo ang bilang ng mga bagay?
    `,
    choices_type: "text",
    choices: ["+", "-", "x", "÷"],
    answer: 0,
  },
  {
    number: "12",
    question: `Ilan ang lahat ng bagay kung sila ay pagsasamahin mo?`,
    choices_type: "text",
    choices: [10, 11, 12, 13],
    answer: 3,

    question_image: require("../assets/images/diagnostic-images/question-12.png"),
  },
  {
    number: "13",
    question: `Tinanong siya ng ina ni Ben kung naiintindihan niya ang natutunan nila kagabi tungkol sa "Gawin 
mo sa bahay" Oo, sabi niya. Ito ang balita ng kanyang ina. Ano ang sagot dito 8+ 9 = ?`,
    choices_type: "text",
    choices: [14, 15, 17, 18],
    answer: 2,
  },
  {
    number: "14",
    question: `Idagdag ang mga gilid ng mga numero 7 + 7 = ____ ?
    `,
    choices_type: "text",
    choices: [14, 15, 15, 17],
    answer: 0,
  },
  {
    number: "15",
    question: `5 + 8 = ____?`,
    choices_type: "text",
    choices: [10, 11, 12, 13],
    answer: 3,
  },
  {
    number: "16",
    question: `9 + 5 = ____?`,
    choices_type: "text",
    choices: [12, 13, 14, 15],
    answer: 2,
  },
  {
    number: "17",
    question: `Binigyan ka ng nanay mo ng pitong kahil at tatlo naman ang binigay mo sa kapatid mo. Magkano 
ang natira saiyo?`,
    choices_type: "text",
    choices: [3, 4, 5, "Wala"],
    answer: 1,
  },
  {
    number: "18",
    question: `May walong bunga ng bayabas sa aming likod ng bahay. Pinitas ni Jack ang tatlo. Ilan pa ang 
    natira?`,
    choices_type: "text",
    choices: [3, 4, 5, 6],
    answer: 2,
  },
  {
    number: "19",
    question: `Tandaan na bawasan nang tama ang bilang. 18 - 9 =____ ?`,
    choices_type: "text",
    choices: [7, 8, 9, 10],
    answer: 2,
  },
  {
    number: "20",
    question: `Tandaan na bawasan nang tama ang bilang. 10 - 5 =____ ?`,
    choices_type: "text",
    choices: [1, 8, 5, 10],
    answer: 2,
  },
  // walang 20
  {
    number: "21",
    question: ` Kung kasama natin si Gretel na kalahatiin ang pakwan . Paano yung magandang hati nito?`,
    choices_type: "image",
    choices: [
      require("../assets/images/diagnostic-images/a-21.png"),
      require("../assets/images/diagnostic-images/b-21.png"),
      require("../assets/images/diagnostic-images/c-21.png"),
      require("../assets/images/diagnostic-images/d-21.png"),
    ],
    answer: 0,
    question_image: require("../assets/images/diagnostic-images/question-21.png"),
  },
  {
    number: "22",
    question: `Si Glen ay may limampung prutas na mangga sa kanyang bulsa at nais niya itong paghati-hatian 
    nilang limang magka-kaibigan. Kung hahatiin niya, anong hanay ng mga dibisyon ang ginagawa niya?`,
    choices_type: "image",
    choices: [
      require("../assets/images/diagnostic-images/a-22.png"),
      require("../assets/images/diagnostic-images/b-22.png"),
      require("../assets/images/diagnostic-images/c-22.png"),
      require("../assets/images/diagnostic-images/d-22.png"),
    ],
    answer: 3,
  },
  {
    number: "23",
    question: ` Anong hugis ang ipinakikita ng ulo ng bahay?`,
    choices_type: "image",
    choices: [
      require("../assets/images/diagnostic-images/a-23.png"),
      require("../assets/images/diagnostic-images/b-23.png"),
      require("../assets/images/diagnostic-images/c-23.png"),
      require("../assets/images/diagnostic-images/d-23.png"),
    ],
    answer: 3,
  },
  {
    number: "24",
    question: `Bakit gumulong ang pulang bola?`,
    choices_type: "text",
    choices: [
      "Dahil ito ay parisuka",
      "Dahil ito ay isang tatsulok",
      "Dahil ito ay parihaba",
      "Dahil ito ay bilog",
    ],
    answer: 3,
  },
  {
    number: "25",
    question: `Si Kiko ay nagtatayo ng kanyang bahay at nais na magkapareho ang sukat ng lahat ng sulok ng 
    katawan ng kanyang bahay. Nasaan ang hugis na may pantay na sulok?`,
    choices_type: "text",
    choices: ["Bilog", "Parisukat", "Parihaba", "Tatsulok"],
    answer: 1,
  },
  {
    number: "26",
    question: `Bumili si Zia ng isang buong bariles ng sabon para sa kanyang paglalaba. Ang hugis ng sabon ay?`,
    choices_type: "text",
    choices: ["Tatsulok", "Parisukat", "Parihaba", "Bilog"],
    answer: 2,
  },
  {
    number: "27",
    question: `Anong araw ang unang pag-aaral?`,
    choices_type: "text",
    choices: ["Lunes", "Martes", "Biernes", "Sabado"],
    answer: 0,
  },
  {
    number: "28",
    question: `Ito ang huling araw na nagkaroon kami ng pag-aaral`,
    choices_type: "text",
    choices: ["Huebes", "Biernes", "Sabado", "Linggo"],
    answer: 1,
  },
  {
    number: "29",
    question: `Ito ang unang buwan ng taon.`,
    choices_type: "text",
    choices: ["Disiembre", "Enero", "Pebrero", "Marso"],
    answer: 1,
  },
  {
    number: "30",
    question: `Anong buwan nagsimula tayong mag-aral.`,
    choices_type: "text",
    choices: ["Mayo", "Hunio", "Hulio", "Agosto"],
    answer: 3,
  },
  {
    number: "31",
    question: `Huling buwan na siyang kapanganakan ng ating Panginoong Hesus.`,
    choices_type: "text",
    choices: ["Setiembre", "Oktubre", "Nobiembre", "Disiembre"],
    answer: 3,
  },
  {
    number: "32",
    question: `Anong buwan ang ipinapakita ng kalendaryo?`,
    choices_type: "text",
    choices: ["Hunio", "Hulio", "Agosto", "Setiembre"],
    answer: 2,
    question_image: require("../assets/images/diagnostic-images/question-32.png"),
  },
  {
    number: "33",
    question: `Nang magsimula kaming mag-aral ay ika-22 ng Agosto. Anong araw ito lumapag?`,
    choices_type: "text",
    choices: ["Lunes", "Martes", "Mierkoles", "Huebes"],
    answer: 0,
  },
  {
    number: "34",
    question: `Gumising ka krizzia dahil minus fifteen na para sa alas-sais sabi ng nanay nya. Aling orasan ang 
    nagpapakita ng oras na sinabi ng kanyang ina?`,
    choices_type: "image",
    choices: [
      require("../assets/images/diagnostic-images/a-34.png"),
      require("../assets/images/diagnostic-images/b-34.png"),
      require("../assets/images/diagnostic-images/c-34.png"),
      require("../assets/images/diagnostic-images/d-34.png"),
    ],
    answer: 0,
  },
  {
    number: "35",
    question_image: require("../assets/images/diagnostic-images/question-35.png"),
    answer: ["1/2"],
    blank: true,
  },
  {
    number: "36",
    question_image: require("../assets/images/diagnostic-images/question-36.png"),
    answer: ["1/4"],
    blank: true,
  },
  {
    number: "37",
    question: `Alin dito ang parisukat na nagpapakita ng ¼`,
    choices_type: "image",
    choices: [
      require("../assets/images/diagnostic-images/a-37.png"),
      require("../assets/images/diagnostic-images/b-37.png"),
      require("../assets/images/diagnostic-images/c-37.png"),
      require("../assets/images/diagnostic-images/d-37.png"),
    ],
    answer: 0,
  },
  {
    number: "38",
    question: `Alin dito ang tatsulok na nagpapakita ng ½?`,
    choices_type: "image",
    choices: [
      require("../assets/images/diagnostic-images/a-38.png"),
      require("../assets/images/diagnostic-images/b-38.png"),
      require("../assets/images/diagnostic-images/c-38.png"),
      require("../assets/images/diagnostic-images/d-38.png"),
    ],
    answer: 2,
  },
  {
    number: "39",
    question_image: require("../assets/images/diagnostic-images/question-39.png"),
    answer: ["8", "8:00"],
    blank: true,
  },
  {
    number: "40",
    question_image: require("../assets/images/diagnostic-images/question-40.png"),
    answer: ["9:30"],
    blank: true,
  },
];
