export interface Question {
  id: number;
  passage?: string;
  text: string;
  choices: { letter: string; text: string }[];
  answer?: string;
}

export interface Module {
  name: string;
  durationMinutes: number;
  questions: Question[];
}

export const modules: Module[] = [
  {
    name: "Reading and Writing - Module 1",
    durationMinutes: 32,
    questions: [
      {
        id: 1,
        passage:
          "According to a team of neuroeconomists from the University of Zurich, ease of decision making may be linked to communication between two brain regions, the prefrontal cortex and the parietal cortex. Individuals tend to be more decisive if the information flow between the regions is intensified, whereas they make choices more slowly when information flow is ______.",
        text: "Which choice completes the text with the most logical and precise word or phrase?",
        choices: [
          { letter: "A", text: "reduced" },
          { letter: "B", text: "evaluated" },
          { letter: "C", text: "determined" },
          { letter: "D", text: "acquired" },
        ],
      },
      {
        id: 2,
        passage:
          "Botanist Jeanne Baret, who sailed around the world in the 1760s disguised as a man, is said to have been the first woman to circumnavigate the globe. Baret joined the French expedition led by Louis Antoine de Bougainville and contributed significantly to plant specimen collection. The plant genus Baretia was named in her honor, though the name was later changed.",
        text: "Which choice best states the main purpose of the text?",
        choices: [
          { letter: "A", text: "To describe Baret's contributions to botany" },
          { letter: "B", text: "To explain why Baret disguised herself as a man" },
          { letter: "C", text: "To outline the route of Bougainville's expedition" },
          { letter: "D", text: "To argue that Baret deserves greater recognition" },
        ],
      },
      {
        id: 3,
        passage:
          "A study published in the journal Nature Climate Change found that the rate of sea level rise has accelerated over the past few decades. Researchers analyzed satellite data from 1993 to 2017 and found that the rate of rise increased from 1.8 millimeters per year to 3.1 millimeters per year. The acceleration is mainly attributed to the melting of ice sheets in Greenland and Antarctica.",
        text: "Which choice best describes the overall structure of the text?",
        choices: [
          { letter: "A", text: "A finding is presented, evidence is provided, and a cause is identified" },
          { letter: "B", text: "A hypothesis is stated, tested, and then confirmed" },
          { letter: "C", text: "A problem is introduced, solutions are debated, and one is chosen" },
          { letter: "D", text: "An experiment is described and its limitations are acknowledged" },
        ],
      },
      {
        id: 4,
        passage:
          "Linguist Noam Chomsky proposed that humans are born with an innate language acquisition device (LAD) that enables children to learn language rapidly and with limited input. Critics argue that language learning is instead driven by general cognitive processes and environmental exposure. However, the fact that children universally pass through similar stages of language development, regardless of their native language, lends support to Chomsky's position.",
        text: "Which choice best describes the function of the final sentence in the text?",
        choices: [
          { letter: "A", text: "It introduces a new counterargument to the critics' position" },
          { letter: "B", text: "It provides evidence that supports Chomsky's hypothesis" },
          { letter: "C", text: "It acknowledges a limitation of the language acquisition device theory" },
          { letter: "D", text: "It explains the mechanism behind universal language stages" },
        ],
      },
      {
        id: 5,
        text: "The researcher noted that migratory birds navigate using Earth's magnetic field. This finding ______ earlier studies that suggested birds relied solely on visual landmarks.",
        choices: [
          { letter: "A", text: "contradicts" },
          { letter: "B", text: "corroborates" },
          { letter: "C", text: "supplements" },
          { letter: "D", text: "overlooks" },
        ],
      },
      {
        id: 6,
        passage:
          "In 2019, researchers discovered a new species of dinosaur in Argentina. The creature, named Ingentia prima, lived approximately 210 million years ago and weighed up to ten tons. What makes the discovery particularly notable is that Ingentia prima predates all other known giant dinosaurs by at least 30 million years, suggesting that gigantism evolved in sauropods much earlier than previously thought.",
        text: "Which choice best states the main purpose of the text?",
        choices: [
          { letter: "A", text: "To compare Ingentia prima to other Argentine dinosaurs" },
          { letter: "B", text: "To explain how researchers identify new dinosaur species" },
          { letter: "C", text: "To highlight a discovery that challenges existing timelines of dinosaur evolution" },
          { letter: "D", text: "To describe the physical characteristics of large sauropods" },
        ],
      },
      {
        id: 7,
        text: "Many economists argue that automation will displace workers in manufacturing industries; ______, others contend that new technologies will create more jobs than they eliminate.",
        choices: [
          { letter: "A", text: "therefore" },
          { letter: "B", text: "furthermore" },
          { letter: "C", text: "however" },
          { letter: "D", text: "consequently" },
        ],
      },
      {
        id: 8,
        passage:
          "Ancient Rome's engineering achievements, including aqueducts, roads, and amphitheaters, were so advanced that many structures have survived for over two thousand years. Roman engineers used a form of volcanic ash called pozzolana in their concrete, which reacted chemically with seawater and lime to create an exceptionally durable material.",
        text: "According to the text, why were Roman concrete structures so durable?",
        choices: [
          { letter: "A", text: "Romans used only the finest stone quarried from Italian mountains" },
          { letter: "B", text: "A chemical reaction involving volcanic ash made the concrete exceptionally strong" },
          { letter: "C", text: "Ancient Roman workers were better trained than modern construction workers" },
          { letter: "D", text: "The structures were maintained consistently over two thousand years" },
        ],
      },
      {
        id: 9,
        text: "The committee's decision to postpone the event ______ criticized by participants who had already made travel arrangements.",
        choices: [
          { letter: "A", text: "was" },
          { letter: "B", text: "were" },
          { letter: "C", text: "are" },
          { letter: "D", text: "have been" },
        ],
      },
      {
        id: 10,
        passage:
          "Throughout the 19th century, whaling was one of the most important industries in the United States. Whaling ships embarked on voyages lasting two to four years, and the crews faced extreme dangers. Yet the industry declined sharply after 1859, when Edwin Drake struck oil in Pennsylvania. Petroleum products quickly replaced whale oil for lighting and lubrication, making the hazardous and expensive whaling voyages economically unviable.",
        text: "Which choice best explains the cause-and-effect relationship described in the text?",
        choices: [
          { letter: "A", text: "Whale populations declined because of overhunting, so crews abandoned the industry" },
          { letter: "B", text: "A cheaper energy source emerged, making the whaling industry unprofitable" },
          { letter: "C", text: "Advances in shipbuilding made whaling voyages shorter and safer" },
          { letter: "D", text: "Public awareness of dangers caused workers to leave whaling for other jobs" },
        ],
      },
      {
        id: 11,
        text: "Despite widespread concern about declining bee populations, some ______ still question whether colony collapse disorder poses a significant threat to agriculture.",
        choices: [
          { letter: "A", text: "researchers" },
          { letter: "B", text: "research" },
          { letter: "C", text: "researching" },
          { letter: "D", text: "researched" },
        ],
      },
      {
        id: 12,
        passage:
          "Author Toni Morrison once said that the function of freedom is to free someone else. This idea permeates her novels, which often explore the ways in which enslaved people found small acts of resistance and helped one another survive. For Morrison, freedom was not an individual achievement but a collective responsibility that rippled outward.",
        text: "Which choice best describes how the text characterizes Morrison's view of freedom?",
        choices: [
          { letter: "A", text: "As something best expressed through literature" },
          { letter: "B", text: "As an obligation that extends beyond the individual" },
          { letter: "C", text: "As a political concept limited to legal rights" },
          { letter: "D", text: "As an illusion for those living under oppression" },
        ],
      },
      {
        id: 13,
        text: "The engineering team's prototype, along with several backup units, ______ submitted to the review board last Tuesday.",
        choices: [
          { letter: "A", text: "was" },
          { letter: "B", text: "were" },
          { letter: "C", text: "have been" },
          { letter: "D", text: "are" },
        ],
      },
      {
        id: 14,
        passage:
          "Maria Sibylla Merian was a 17th-century German naturalist and scientific illustrator who helped transform the field of entomology. She traveled to Suriname at age 52—an extraordinary undertaking for a woman of her time—and spent two years documenting the life cycles of tropical insects. Her subsequent publication featured detailed illustrations that changed how Europeans understood metamorphosis.",
        text: "Based on the text, what was most significant about Merian's work?",
        choices: [
          { letter: "A", text: "She was the first European to travel to Suriname" },
          { letter: "B", text: "Her detailed illustrations advanced scientific understanding of insect development" },
          { letter: "C", text: "She published her findings at an unusually advanced age" },
          { letter: "D", text: "She proved that tropical insects were more complex than European ones" },
        ],
      },
      {
        id: 15,
        text: "The new policy aims to reduce carbon emissions by encouraging the adoption of electric vehicles and investing in renewable energy infrastructure. Analysts predict that these measures will ______ the country's environmental goals.",
        choices: [
          { letter: "A", text: "accelerate progress toward" },
          { letter: "B", text: "provide obstacles to" },
          { letter: "C", text: "undermine the effectiveness of" },
          { letter: "D", text: "replace entirely" },
        ],
      },
    ],
  },
  {
    name: "Math - Module 1",
    durationMinutes: 35,
    questions: [
      {
        id: 1,
        text: "If 3x + 7 = 22, what is the value of x?",
        choices: [
          { letter: "A", text: "3" },
          { letter: "B", text: "4" },
          { letter: "C", text: "5" },
          { letter: "D", text: "6" },
        ],
      },
      {
        id: 2,
        text: "A rectangle has a length of 12 cm and a width of 8 cm. What is the area of the rectangle in square centimeters?",
        choices: [
          { letter: "A", text: "40" },
          { letter: "B", text: "80" },
          { letter: "C", text: "96" },
          { letter: "D", text: "120" },
        ],
      },
      {
        id: 3,
        text: "Which of the following is equivalent to (2x + 3)(x − 4)?",
        choices: [
          { letter: "A", text: "2x² − 5x − 12" },
          { letter: "B", text: "2x² + 5x − 12" },
          { letter: "C", text: "2x² − 8x − 12" },
          { letter: "D", text: "2x² − 11x − 12" },
        ],
      },
      {
        id: 4,
        text: "A store sells notebooks for $2.50 each and pens for $1.25 each. If Sarah buys 4 notebooks and 6 pens, how much does she spend in total?",
        choices: [
          { letter: "A", text: "$14.00" },
          { letter: "B", text: "$15.00" },
          { letter: "C", text: "$17.50" },
          { letter: "D", text: "$19.50" },
        ],
      },
      {
        id: 5,
        text: "In the xy-plane, the slope of the line passing through (2, 5) and (6, 13) is:",
        choices: [
          { letter: "A", text: "1" },
          { letter: "B", text: "2" },
          { letter: "C", text: "3" },
          { letter: "D", text: "4" },
        ],
      },
      {
        id: 6,
        text: "If f(x) = x² − 3x + 2, what is f(4)?",
        choices: [
          { letter: "A", text: "2" },
          { letter: "B", text: "4" },
          { letter: "C", text: "6" },
          { letter: "D", text: "8" },
        ],
      },
      {
        id: 7,
        text: "A car travels at a constant speed of 60 miles per hour. How many miles does it travel in 2.5 hours?",
        choices: [
          { letter: "A", text: "120" },
          { letter: "B", text: "130" },
          { letter: "C", text: "150" },
          { letter: "D", text: "180" },
        ],
      },
      {
        id: 8,
        text: "What is the solution to the inequality 2x − 5 > 11?",
        choices: [
          { letter: "A", text: "x > 3" },
          { letter: "B", text: "x > 6" },
          { letter: "C", text: "x > 8" },
          { letter: "D", text: "x > 10" },
        ],
      },
      {
        id: 9,
        text: "The ratio of boys to girls in a class is 3:4. If there are 21 boys, how many girls are there?",
        choices: [
          { letter: "A", text: "24" },
          { letter: "B", text: "26" },
          { letter: "C", text: "28" },
          { letter: "D", text: "32" },
        ],
      },
      {
        id: 10,
        text: "Which equation represents a line perpendicular to y = 2x − 3?",
        choices: [
          { letter: "A", text: "y = 2x + 1" },
          { letter: "B", text: "y = −2x + 5" },
          { letter: "C", text: "y = −(1/2)x + 4" },
          { letter: "D", text: "y = (1/2)x − 1" },
        ],
      },
      {
        id: 11,
        text: "A circle has a radius of 5. What is its circumference? (Use π ≈ 3.14)",
        choices: [
          { letter: "A", text: "15.70" },
          { letter: "B", text: "31.40" },
          { letter: "C", text: "78.50" },
          { letter: "D", text: "157.00" },
        ],
      },
      {
        id: 12,
        text: "If 20% of a number is 14, what is the number?",
        choices: [
          { letter: "A", text: "60" },
          { letter: "B", text: "65" },
          { letter: "C", text: "70" },
          { letter: "D", text: "75" },
        ],
      },
      {
        id: 13,
        text: "Which of the following is a factor of x² − 9?",
        choices: [
          { letter: "A", text: "x − 3" },
          { letter: "B", text: "x + 9" },
          { letter: "C", text: "x − 9" },
          { letter: "D", text: "x² + 3" },
        ],
      },
      {
        id: 14,
        text: "A data set has the values: 4, 7, 7, 8, 9, 10, 12. What is the median?",
        choices: [
          { letter: "A", text: "7" },
          { letter: "B", text: "8" },
          { letter: "C", text: "9" },
          { letter: "D", text: "10" },
        ],
      },
      {
        id: 15,
        text: "In a right triangle, the two legs measure 6 and 8. What is the length of the hypotenuse?",
        choices: [
          { letter: "A", text: "9" },
          { letter: "B", text: "10" },
          { letter: "C", text: "12" },
          { letter: "D", text: "14" },
        ],
      },
      {
        id: 16,
        text: "Which of the following is equivalent to 3(2x − 4) − 2(x + 1)?",
        choices: [
          { letter: "A", text: "4x − 14" },
          { letter: "B", text: "4x + 14" },
          { letter: "C", text: "8x − 14" },
          { letter: "D", text: "8x + 14" },
        ],
      },
      {
        id: 17,
        text: "A bag contains 5 red marbles, 3 blue marbles, and 2 green marbles. What is the probability of randomly selecting a blue marble?",
        choices: [
          { letter: "A", text: "3/10" },
          { letter: "B", text: "3/7" },
          { letter: "C", text: "1/3" },
          { letter: "D", text: "2/5" },
        ],
      },
      {
        id: 18,
        text: "The population of a town was 12,500 in 2010 and 15,000 in 2020. What was the percent increase in population?",
        choices: [
          { letter: "A", text: "16%" },
          { letter: "B", text: "20%" },
          { letter: "C", text: "25%" },
          { letter: "D", text: "30%" },
        ],
      },
      {
        id: 19,
        text: "What are the solutions to x² − 5x + 6 = 0?",
        choices: [
          { letter: "A", text: "x = 1 and x = 6" },
          { letter: "B", text: "x = 2 and x = 3" },
          { letter: "C", text: "x = −2 and x = −3" },
          { letter: "D", text: "x = −1 and x = 6" },
        ],
      },
      {
        id: 20,
        text: "An angle measures 72°. What is its supplement?",
        choices: [
          { letter: "A", text: "18°" },
          { letter: "B", text: "108°" },
          { letter: "C", text: "118°" },
          { letter: "D", text: "288°" },
        ],
      },
      {
        id: 21,
        text: "If g(x) = 3x + 5 and h(x) = x − 2, what is g(h(4))?",
        choices: [
          { letter: "A", text: "9" },
          { letter: "B", text: "11" },
          { letter: "C", text: "13" },
          { letter: "D", text: "17" },
        ],
      },
      {
        id: 22,
        text: "The vertices of a triangle are at (0, 0), (4, 0), and (0, 3). What is the area of the triangle?",
        choices: [
          { letter: "A", text: "6" },
          { letter: "B", text: "7" },
          { letter: "C", text: "12" },
          { letter: "D", text: "14" },
        ],
      },
    ],
  },
];
