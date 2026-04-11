// ─────────────────────────────────────────────────────────────
// QUESTION DATA
// Each question must have:
//   id       — question number within the module
//   passage  — the text shown in the LEFT panel (required for R&W)
//   text     — the question prompt shown in the RIGHT panel
//   choices  — answer options A–D
//   answer   — correct letter (for reference)
// ─────────────────────────────────────────────────────────────

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
  // ─────────────────────────────────────────────────────────────
  // READING AND WRITING — MODULE 1  (27 questions, 32 min)
  // ─────────────────────────────────────────────────────────────
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
        answer: "A",
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
        answer: "A",
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
        answer: "A",
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
        answer: "B",
      },
      {
        id: 5,
        passage:
          "The researcher noted that migratory birds navigate using Earth's magnetic field. This finding ______ earlier studies that suggested birds relied solely on visual landmarks.",
        text: "Which choice completes the text with the most logical and precise word or phrase?",
        choices: [
          { letter: "A", text: "contradicts" },
          { letter: "B", text: "corroborates" },
          { letter: "C", text: "supplements" },
          { letter: "D", text: "overlooks" },
        ],
        answer: "A",
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
        answer: "C",
      },
      {
        id: 7,
        passage:
          "Many economists argue that automation will displace workers in manufacturing industries; ______, others contend that new technologies will create more jobs than they eliminate.",
        text: "Which choice completes the text with the most logical and precise word or phrase?",
        choices: [
          { letter: "A", text: "therefore" },
          { letter: "B", text: "furthermore" },
          { letter: "C", text: "however" },
          { letter: "D", text: "consequently" },
        ],
        answer: "C",
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
        answer: "B",
      },
      {
        id: 9,
        passage:
          "The committee's decision to postpone the event ______ criticized by participants who had already made travel arrangements.",
        text: "Which choice completes the text so that it conforms to the conventions of Standard English?",
        choices: [
          { letter: "A", text: "was" },
          { letter: "B", text: "were" },
          { letter: "C", text: "are" },
          { letter: "D", text: "have been" },
        ],
        answer: "A",
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
        answer: "B",
      },
      {
        id: 11,
        passage:
          "Despite widespread concern about declining bee populations, some ______ still question whether colony collapse disorder poses a significant threat to agriculture.",
        text: "Which choice completes the text so that it conforms to the conventions of Standard English?",
        choices: [
          { letter: "A", text: "researchers" },
          { letter: "B", text: "research" },
          { letter: "C", text: "researching" },
          { letter: "D", text: "researched" },
        ],
        answer: "A",
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
        answer: "B",
      },
      {
        id: 13,
        passage:
          "The engineering team's prototype, along with several backup units, ______ submitted to the review board last Tuesday.",
        text: "Which choice completes the text so that it conforms to the conventions of Standard English?",
        choices: [
          { letter: "A", text: "was" },
          { letter: "B", text: "were" },
          { letter: "C", text: "have been" },
          { letter: "D", text: "are" },
        ],
        answer: "A",
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
        answer: "B",
      },
      {
        id: 15,
        passage:
          "The new policy aims to reduce carbon emissions by encouraging the adoption of electric vehicles and investing in renewable energy infrastructure. Analysts predict that these measures will ______ the country's environmental goals.",
        text: "Which choice completes the text with the most logical and precise word or phrase?",
        choices: [
          { letter: "A", text: "accelerate progress toward" },
          { letter: "B", text: "provide obstacles to" },
          { letter: "C", text: "undermine the effectiveness of" },
          { letter: "D", text: "replace entirely" },
        ],
        answer: "A",
      },
      {
        id: 16,
        passage:
          "Psychologist Carol Dweck's research on mindset has shown that students who believe their abilities can be developed through dedication and hard work—what she calls a 'growth mindset'—tend to achieve more than those who believe their abilities are innate and fixed. Dweck found that praising effort rather than intelligence encourages students to embrace challenges rather than avoid them.",
        text: "Which choice best describes the main finding of Dweck's research?",
        choices: [
          { letter: "A", text: "Students who are praised for intelligence perform better on standardized tests" },
          { letter: "B", text: "Believing abilities can improve leads to greater student achievement" },
          { letter: "C", text: "Hard work is more important than natural talent in all academic fields" },
          { letter: "D", text: "Schools should eliminate all forms of academic praise" },
        ],
        answer: "B",
      },
      {
        id: 17,
        passage:
          "The journalist's investigation revealed that the company had been ______ safety protocols for years, putting workers at risk.",
        text: "Which choice completes the text with the most logical and precise word or phrase?",
        choices: [
          { letter: "A", text: "instituting" },
          { letter: "B", text: "circumventing" },
          { letter: "C", text: "augmenting" },
          { letter: "D", text: "monitoring" },
        ],
        answer: "B",
      },
      {
        id: 18,
        passage:
          "The Giant Sequoia trees of California's Sierra Nevada are among the largest living organisms on Earth. These trees can live for more than 3,000 years and grow to heights exceeding 300 feet. Despite their massive size, sequoias depend on periodic wildfires to release seeds from their cones and clear competing vegetation from the forest floor.",
        text: "According to the text, what role do wildfires play for Giant Sequoias?",
        choices: [
          { letter: "A", text: "They destroy older trees to make room for younger ones" },
          { letter: "B", text: "They are harmful to sequoias but beneficial to other plant species" },
          { letter: "C", text: "They help sequoias reproduce and reduce competition for resources" },
          { letter: "D", text: "They limit the height that sequoias can reach" },
        ],
        answer: "C",
      },
      {
        id: 19,
        passage:
          "The discovery of penicillin by Alexander Fleming in 1928 is often cited as one of the most important medical breakthroughs of the 20th century. Fleming noticed that a mold, Penicillium notatum, had contaminated one of his bacterial cultures and was killing the bacteria around it. Rather than discarding the contaminated dish, Fleming recognized the significance of what he had observed.",
        text: "Which choice best describes the structure of the text?",
        choices: [
          { letter: "A", text: "A scientific debate is introduced and then resolved" },
          { letter: "B", text: "A discovery is described, its mechanism is explained, and its importance is noted" },
          { letter: "C", text: "A historical event is presented chronologically with emphasis on its accidental nature" },
          { letter: "D", text: "A common misconception is identified and corrected" },
        ],
        answer: "C",
      },
      {
        id: 20,
        passage:
          "The city council approved the new transit plan; ______, construction on the first subway line is expected to begin within six months.",
        text: "Which choice completes the text with the most logical and precise word or phrase?",
        choices: [
          { letter: "A", text: "nonetheless" },
          { letter: "B", text: "conversely" },
          { letter: "C", text: "accordingly" },
          { letter: "D", text: "alternatively" },
        ],
        answer: "C",
      },
      {
        id: 21,
        passage:
          "In her 1963 essay 'Is There a Text in This Class?', literary theorist Stanley Fish argued that the meaning of a text is not fixed within the text itself but is instead produced by interpretive communities—groups of readers who share assumptions and interpretive strategies. Two readers who belong to different interpretive communities, Fish argued, can read the same text and arrive at entirely different meanings, neither of which is inherently more correct than the other.",
        text: "Based on the text, which of the following best captures Fish's central claim?",
        choices: [
          { letter: "A", text: "The meaning of a text depends on the author's original intent" },
          { letter: "B", text: "Readers from different backgrounds will always misinterpret texts" },
          { letter: "C", text: "The meaning of a text is shaped by the community in which it is read" },
          { letter: "D", text: "Only professional literary critics can accurately analyze a text" },
        ],
        answer: "C",
      },
      {
        id: 22,
        passage:
          "During the 18th century, clockmakers developed increasingly precise instruments. ______ these advances, navigators were able to determine longitude at sea with much greater accuracy.",
        text: "Which choice completes the text with the most logical and precise word or phrase?",
        choices: [
          { letter: "A", text: "Despite" },
          { letter: "B", text: "Because of" },
          { letter: "C", text: "In contrast to" },
          { letter: "D", text: "Regardless of" },
        ],
        answer: "B",
      },
      {
        id: 23,
        passage:
          "The Harlem Renaissance of the 1920s was a cultural movement that produced some of the most significant literary, artistic, and musical works in American history. Writers such as Langston Hughes and Zora Neale Hurston used the movement to explore themes of Black identity, pride, and the experience of living under racial segregation in America. The movement had a profound influence on subsequent generations of African American artists and writers.",
        text: "Which choice best states the main idea of the text?",
        choices: [
          { letter: "A", text: "The Harlem Renaissance was primarily a musical movement" },
          { letter: "B", text: "The Harlem Renaissance was a culturally significant period that shaped American artistic tradition" },
          { letter: "C", text: "Langston Hughes and Zora Neale Hurston were the most important writers of the 20th century" },
          { letter: "D", text: "Racial segregation prevented African American artists from achieving success" },
        ],
        answer: "B",
      },
      {
        id: 24,
        passage:
          "Scientists believe that the deep ocean, once thought to be ______, is in fact teeming with diverse life forms that have evolved unique adaptations to survive extreme pressure, cold, and darkness.",
        text: "Which choice completes the text with the most logical and precise word or phrase?",
        choices: [
          { letter: "A", text: "inhospitable" },
          { letter: "B", text: "expansive" },
          { letter: "C", text: "transparent" },
          { letter: "D", text: "temperate" },
        ],
        answer: "A",
      },
      {
        id: 25,
        passage:
          "Historian David Landes argues that the Industrial Revolution began in Britain rather than elsewhere due to a combination of unique cultural and institutional factors. These included a tradition of practical tinkering, legal protections for inventors, and a commercial culture that rewarded innovation. Other historians, however, contend that geography and access to coal deposits were the decisive factors.",
        text: "The primary purpose of the text is to:",
        choices: [
          { letter: "A", text: "establish that Britain's geography was the most important factor in industrialization" },
          { letter: "B", text: "present competing explanations for why industrialization began in Britain" },
          { letter: "C", text: "refute Landes's argument about cultural factors in the Industrial Revolution" },
          { letter: "D", text: "describe the inventions that drove the Industrial Revolution" },
        ],
        answer: "B",
      },
      {
        id: 26,
        passage:
          "The report found that employees who work from home report higher levels of job satisfaction; ______, the same employees show lower rates of promotion compared to their in-office counterparts.",
        text: "Which choice completes the text with the most logical and precise word or phrase?",
        choices: [
          { letter: "A", text: "similarly" },
          { letter: "B", text: "therefore" },
          { letter: "C", text: "however" },
          { letter: "D", text: "additionally" },
        ],
        answer: "C",
      },
      {
        id: 27,
        passage:
          "Primatologist Jane Goodall's decades of fieldwork at Gombe Stream National Park in Tanzania fundamentally changed scientists' understanding of chimpanzee behavior. Before Goodall's research, scientists believed that tool use was uniquely human. When Goodall observed chimpanzees stripping leaves from twigs to extract termites from mounds, renowned anthropologist Louis Leakey remarked that science would now need to redefine 'tool,' redefine 'man,' or accept chimpanzees as human.",
        text: "Which choice best describes the significance of Goodall's observation according to the text?",
        choices: [
          { letter: "A", text: "It demonstrated that chimpanzees are more intelligent than other primates" },
          { letter: "B", text: "It challenged a defining characteristic previously thought to belong only to humans" },
          { letter: "C", text: "It proved that all primates are capable of using tools under certain conditions" },
          { letter: "D", text: "It led to new conservation efforts for chimpanzees in Tanzania" },
        ],
        answer: "B",
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // READING AND WRITING — MODULE 2  (27 questions, 32 min)
  // ─────────────────────────────────────────────────────────────
  {
    name: "Reading and Writing - Module 2",
    durationMinutes: 32,
    questions: [
      {
        id: 1,
        passage:
          "Ecological economist Herman Daly proposed that the economy should be understood as a subsystem of the biosphere, not as a separate and self-sustaining entity. He argued that conventional economics ignored the physical limits of natural resources, leading to unsustainable growth. Daly's concept of a 'steady-state economy' held that production and consumption should be maintained at levels compatible with ecological limits.",
        text: "Which choice best describes the main idea of the text?",
        choices: [
          { letter: "A", text: "Daly believed economic growth was the primary driver of environmental destruction" },
          { letter: "B", text: "Daly challenged conventional economics by arguing that growth must respect ecological boundaries" },
          { letter: "C", text: "Daly's steady-state economy was widely adopted by governments" },
          { letter: "D", text: "Conventional economists have since accepted Daly's ecological framework" },
        ],
        answer: "B",
      },
      {
        id: 2,
        passage:
          "The astronomer's recent findings ______ the long-held assumption that the outer solar system contains only gas giants and icy bodies.",
        text: "Which choice completes the text with the most logical and precise word or phrase?",
        choices: [
          { letter: "A", text: "reinforce" },
          { letter: "B", text: "complicate" },
          { letter: "C", text: "validate" },
          { letter: "D", text: "describe" },
        ],
        answer: "B",
      },
      {
        id: 3,
        passage:
          "Text 1: Philosopher Peter Singer argues that we have a moral obligation to donate to effective charities, since the suffering of distant strangers is as morally significant as the suffering of people nearby. Failure to donate when we can do so at minimal cost to ourselves is, Singer contends, morally equivalent to letting a child drown in a shallow pond.\n\nText 2: Philosopher Susan Wolf disagrees, arguing that morality does not require us to devote our lives entirely to others. Living a good life, Wolf suggests, involves pursuing personal projects and relationships, which have inherent value that cannot be reduced to their utility for others.",
        text: "Based on the texts, how would Wolf most likely respond to Singer's drowning child argument?",
        choices: [
          { letter: "A", text: "By arguing that distant strangers deserve more moral concern than Singer acknowledges" },
          { letter: "B", text: "By contending that personal pursuits have moral value that Singer's framework ignores" },
          { letter: "C", text: "By agreeing that donating to charity is morally required in all circumstances" },
          { letter: "D", text: "By claiming that Singer's analogy between poverty and drowning is empirically inaccurate" },
        ],
        answer: "B",
      },
      {
        id: 4,
        passage:
          "The committee voted unanimously to accept the proposal; each member ______ signed the final agreement before the meeting adjourned.",
        text: "Which choice completes the text so that it conforms to the conventions of Standard English?",
        choices: [
          { letter: "A", text: "has" },
          { letter: "B", text: "have" },
          { letter: "C", text: "had" },
          { letter: "D", text: "were" },
        ],
        answer: "C",
      },
      {
        id: 5,
        passage:
          "Playwright August Wilson's ten-play Pittsburgh Cycle chronicles the African American experience across each decade of the twentieth century. Wilson stated that his goal was to illuminate the lives of Black Americans in ways that mainstream American theater had ignored. Critics have praised the cycle for its richly detailed characters and its portrayal of the social and economic forces shaping Black communities.",
        text: "Which choice best states August Wilson's purpose in writing the Pittsburgh Cycle?",
        choices: [
          { letter: "A", text: "To critique the shortcomings of mainstream American theater" },
          { letter: "B", text: "To document the history of Pittsburgh from the Black American perspective" },
          { letter: "C", text: "To portray aspects of Black American life that had been overlooked by mainstream theater" },
          { letter: "D", text: "To demonstrate that African American playwrights are as talented as their white counterparts" },
        ],
        answer: "C",
      },
      {
        id: 6,
        passage:
          "The archaeologist's conclusion—that the site was abandoned due to a prolonged drought—______ recent geological evidence suggesting a sudden volcanic event.",
        text: "Which choice completes the text with the most logical and precise word or phrase?",
        choices: [
          { letter: "A", text: "aligns with" },
          { letter: "B", text: "is contradicted by" },
          { letter: "C", text: "is supported by" },
          { letter: "D", text: "underscores" },
        ],
        answer: "B",
      },
      {
        id: 7,
        passage:
          "Researchers studying collective animal behavior have found that flocks of starlings can perform extraordinarily complex aerial maneuvers without any centralized coordination. Each bird follows only three simple rules: move in the same direction as neighbors, stay close to neighbors, and avoid collisions. These local interactions produce the large-scale, fluid patterns—called murmurations—that appear to be coordinated by a single intelligence.",
        text: "Which choice best describes how the text explains starling murmurations?",
        choices: [
          { letter: "A", text: "As behavior directed by a dominant bird in the flock" },
          { letter: "B", text: "As a result of individual birds following instinctive but simple local rules" },
          { letter: "C", text: "As a survival mechanism against predators that requires planning" },
          { letter: "D", text: "As a phenomenon that researchers have not yet been able to explain" },
        ],
        answer: "B",
      },
      {
        id: 8,
        passage:
          "The novelist's latest work, like her earlier books, ______ a dark, atmospheric tone that keeps readers in a state of unease throughout.",
        text: "Which choice completes the text so that it conforms to the conventions of Standard English?",
        choices: [
          { letter: "A", text: "maintain" },
          { letter: "B", text: "maintains" },
          { letter: "C", text: "have maintained" },
          { letter: "D", text: "are maintaining" },
        ],
        answer: "B",
      },
      {
        id: 9,
        passage:
          "In the early 20th century, physicist Niels Bohr proposed a model of the atom in which electrons orbit the nucleus in fixed paths, like planets orbiting the sun. Although this model was later shown to be an oversimplification, it was an essential stepping stone toward quantum mechanics and successfully explained the spectral lines of hydrogen.",
        text: "According to the text, which statement best characterizes Bohr's atomic model?",
        choices: [
          { letter: "A", text: "It was completely accurate in its representation of electron behavior" },
          { letter: "B", text: "It was flawed but played an important role in advancing atomic science" },
          { letter: "C", text: "It was rejected by the scientific community immediately after publication" },
          { letter: "D", text: "It remains the accepted model in modern physics textbooks" },
        ],
        answer: "B",
      },
      {
        id: 10,
        passage:
          "The senator's remarks, though intended to ______ tension between the two parties, instead provoked a heated exchange on the floor of the chamber.",
        text: "Which choice completes the text with the most logical and precise word or phrase?",
        choices: [
          { letter: "A", text: "inflame" },
          { letter: "B", text: "escalate" },
          { letter: "C", text: "diffuse" },
          { letter: "D", text: "exploit" },
        ],
        answer: "C",
      },
      {
        id: 11,
        passage:
          "Architect Zaha Hadid was known for her radical deconstructivist designs, which featured sweeping curves and fragmented geometric forms. Her buildings challenged the conventional straight lines and right angles of modern architecture. Critics initially dismissed her work as unbuildable, but advances in digital fabrication and engineering eventually made her visionary designs a reality.",
        text: "The main purpose of the text is to:",
        choices: [
          { letter: "A", text: "explain the technical processes Hadid used to construct her buildings" },
          { letter: "B", text: "describe how Hadid's revolutionary approach overcame initial skepticism" },
          { letter: "C", text: "compare Hadid's style to other deconstructivist architects" },
          { letter: "D", text: "argue that deconstructivism is superior to conventional architecture" },
        ],
        answer: "B",
      },
      {
        id: 12,
        passage:
          "The new tax policy is projected to generate $4 billion in annual revenue. ______, the projected figure does not account for potential behavioral changes by taxpayers that could reduce revenue.",
        text: "Which choice completes the text with the most logical and precise word or phrase?",
        choices: [
          { letter: "A", text: "Furthermore" },
          { letter: "B", text: "Similarly" },
          { letter: "C", text: "However" },
          { letter: "D", text: "Therefore" },
        ],
        answer: "C",
      },
      {
        id: 13,
        passage:
          "The field of epigenetics studies how gene expression can be altered by environmental factors without changing the underlying DNA sequence. Scientists have found that experiences such as chronic stress, diet, and trauma can leave chemical marks on DNA that influence which genes are switched on or off. These epigenetic changes can sometimes be passed from parents to children, suggesting that acquired characteristics may be inherited in ways that challenge classical Mendelian genetics.",
        text: "Based on the text, what is the significance of epigenetic inheritance?",
        choices: [
          { letter: "A", text: "It shows that DNA sequences are more changeable than previously thought" },
          { letter: "B", text: "It suggests that life experiences can influence the genetics of future generations" },
          { letter: "C", text: "It confirms that Mendelian genetics is fundamentally incorrect" },
          { letter: "D", text: "It demonstrates that stress is the primary driver of genetic change" },
        ],
        answer: "B",
      },
      {
        id: 14,
        passage:
          "After years of negotiations, the treaty was ______ ratified by all twelve member nations, bringing a long era of regional conflict to an end.",
        text: "Which choice completes the text with the most logical and precise word or phrase?",
        choices: [
          { letter: "A", text: "tentatively" },
          { letter: "B", text: "unanimously" },
          { letter: "C", text: "hastily" },
          { letter: "D", text: "reluctantly" },
        ],
        answer: "B",
      },
      {
        id: 15,
        passage:
          "In the 1940s, mathematician Alan Turing proposed what became known as the 'Turing Test' as a measure of machine intelligence. In the test, a human interrogator conducts a text-based conversation with both a human and a machine and must determine which is which. If the machine can fool the interrogator, Turing argued, it should be considered intelligent. Critics have since challenged whether the test truly measures intelligence or merely the ability to simulate human conversation.",
        text: "Which choice best describes the central debate surrounding the Turing Test?",
        choices: [
          { letter: "A", text: "Whether machines can process language faster than humans" },
          { letter: "B", text: "Whether passing the test indicates genuine intelligence or effective imitation" },
          { letter: "C", text: "Whether humans or machines are better at identifying artificial conversation" },
          { letter: "D", text: "Whether Turing's mathematical background qualified him to define intelligence" },
        ],
        answer: "B",
      },
      {
        id: 16,
        passage:
          "The board of directors, despite pressure from shareholders, ______ to delay the merger until a thorough audit could be completed.",
        text: "Which choice completes the text so that it conforms to the conventions of Standard English?",
        choices: [
          { letter: "A", text: "choose" },
          { letter: "B", text: "choosing" },
          { letter: "C", text: "chose" },
          { letter: "D", text: "have chose" },
        ],
        answer: "C",
      },
      {
        id: 17,
        passage:
          "Physicist Richard Feynman was as celebrated for his teaching as for his scientific discoveries. He believed that if you truly understood a concept, you could explain it in simple terms. His famous 'Feynman Technique'—explaining a concept as if teaching it to a child, identifying gaps in understanding, and returning to source material to fill those gaps—has become a widely recommended study strategy.",
        text: "According to the text, what principle underlies the Feynman Technique?",
        choices: [
          { letter: "A", text: "True comprehension is demonstrated by the ability to explain something simply" },
          { letter: "B", text: "Children are better learners than adults because they ask more questions" },
          { letter: "C", text: "Repeated reading of source material is the best way to master a subject" },
          { letter: "D", text: "Scientific concepts can never be fully explained to non-experts" },
        ],
        answer: "A",
      },
      {
        id: 18,
        passage:
          "Conservationists argue that the proposed dam will ______ the natural migration patterns of several species of salmon that depend on the river to reach their spawning grounds.",
        text: "Which choice completes the text with the most logical and precise word or phrase?",
        choices: [
          { letter: "A", text: "facilitate" },
          { letter: "B", text: "disrupt" },
          { letter: "C", text: "stabilize" },
          { letter: "D", text: "replicate" },
        ],
        answer: "B",
      },
      {
        id: 19,
        passage:
          "The impressionist movement in painting emerged in France in the 1870s when a group of artists, including Claude Monet and Pierre-Auguste Renoir, rejected the strict academic rules of the time. Instead of painting in studios from historical or mythological subjects, they painted outdoors from direct observation of everyday scenes. Their loose brushwork and interest in capturing light and atmosphere were initially mocked by critics, with one dismissive review coining the term 'impressionism' as an insult.",
        text: "Which choice best describes the irony noted in the final sentence?",
        choices: [
          { letter: "A", text: "A critical term intended to mock the style became the movement's defining label" },
          { letter: "B", text: "Critics who initially mocked impressionism later became its most prominent supporters" },
          { letter: "C", text: "The artists rejected the term 'impressionism' despite eventually accepting its principles" },
          { letter: "D", text: "Academic painters adopted impressionist techniques after initially opposing them" },
        ],
        answer: "A",
      },
      {
        id: 20,
        passage:
          "The laboratory's results, which were replicated in three separate studies, ______ compelling evidence that the new compound effectively inhibits tumor growth.",
        text: "Which choice completes the text so that it conforms to the conventions of Standard English?",
        choices: [
          { letter: "A", text: "provide" },
          { letter: "B", text: "provides" },
          { letter: "C", text: "is providing" },
          { letter: "D", text: "was providing" },
        ],
        answer: "A",
      },
      {
        id: 21,
        passage:
          "Evolutionary biologist Stephen Jay Gould proposed the theory of 'punctuated equilibrium,' which holds that evolution does not proceed at a slow, steady rate as Darwin originally proposed. Instead, Gould argued, species remain largely unchanged for long periods and then undergo rapid evolutionary change in geologically brief intervals, often in response to environmental crises. This challenged the gradualist view that had dominated evolutionary biology since Darwin.",
        text: "According to the text, what distinguishes Gould's theory from Darwin's original proposal?",
        choices: [
          { letter: "A", text: "Gould believed that evolution was random, while Darwin believed it was directed" },
          { letter: "B", text: "Gould proposed that evolution occurs in rapid bursts rather than at a constant rate" },
          { letter: "C", text: "Gould argued that environmental crises prevent evolution from occurring" },
          { letter: "D", text: "Gould contended that natural selection is less important than genetic mutation" },
        ],
        answer: "B",
      },
      {
        id: 22,
        passage:
          "The novel's narrator, an unreliable witness to the events he describes, often contradicts himself—______, several key plot details that he presents as facts are later revealed to be fabrications.",
        text: "Which choice completes the text with the most logical and precise word or phrase?",
        choices: [
          { letter: "A", text: "for instance" },
          { letter: "B", text: "on the other hand" },
          { letter: "C", text: "in contrast" },
          { letter: "D", text: "meanwhile" },
        ],
        answer: "A",
      },
      {
        id: 23,
        passage:
          "Research on bilingualism has shown that people who regularly use two languages develop denser gray matter in regions of the brain associated with language processing and executive function. This structural difference may explain findings that bilingual individuals tend to outperform monolinguals on tasks requiring attention switching and cognitive flexibility. Some researchers have even suggested that sustained bilingualism may delay the onset of dementia by several years.",
        text: "Which choice best states the main idea of the text?",
        choices: [
          { letter: "A", text: "Learning a second language in adulthood provides the same cognitive benefits as childhood bilingualism" },
          { letter: "B", text: "Regular use of two languages is associated with measurable cognitive advantages" },
          { letter: "C", text: "Bilingualism is the most effective known strategy for preventing dementia" },
          { letter: "D", text: "The brains of bilingual individuals are structurally identical to those of monolinguals" },
        ],
        answer: "B",
      },
      {
        id: 24,
        passage:
          "The policy, if enacted, would require all new residential buildings to meet strict energy efficiency standards—______ from the voluntary guidelines currently in place.",
        text: "Which choice completes the text with the most logical and precise word or phrase?",
        choices: [
          { letter: "A", text: "a modest divergence" },
          { letter: "B", text: "a significant departure" },
          { letter: "C", text: "a logical extension" },
          { letter: "D", text: "a subtle distinction" },
        ],
        answer: "B",
      },
      {
        id: 25,
        passage:
          "Sociologist Erving Goffman introduced the concept of 'impression management' in his 1959 work The Presentation of Self in Everyday Life. Goffman argued that social interactions are akin to theatrical performances, in which individuals consciously or unconsciously project a particular image of themselves to their audience. The concept has since been applied to the study of how people curate their identities on social media platforms.",
        text: "Based on the text, how has Goffman's concept been extended beyond its original context?",
        choices: [
          { letter: "A", text: "It has been used to analyze how directors stage theatrical productions" },
          { letter: "B", text: "It has been applied to understand self-presentation on digital platforms" },
          { letter: "C", text: "It has been used to explain why people behave differently in private than in public" },
          { letter: "D", text: "It has been expanded to include the behavior of animals in social groups" },
        ],
        answer: "B",
      },
      {
        id: 26,
        passage:
          "Climate scientists have documented a troubling trend: as global temperatures rise, the permafrost in Arctic regions is beginning to thaw, releasing large quantities of methane—a greenhouse gas far more ______ than carbon dioxide—into the atmosphere.",
        text: "Which choice completes the text with the most logical and precise word or phrase?",
        choices: [
          { letter: "A", text: "prevalent" },
          { letter: "B", text: "visible" },
          { letter: "C", text: "potent" },
          { letter: "D", text: "stable" },
        ],
        answer: "C",
      },
      {
        id: 27,
        passage:
          "In the mid-20th century, political theorist Hannah Arendt coined the phrase 'the banality of evil' to describe her observation that great evil is often perpetrated not by fanatical monsters but by ordinary people who follow orders without critical moral reflection. Arendt developed this idea while covering the 1961 trial of Adolf Eichmann, a Nazi official responsible for organizing the deportation of millions to death camps. Arendt concluded that Eichmann's most striking characteristic was not his hatred but his thoughtlessness.",
        text: "Which choice best describes the key insight captured by Arendt's phrase 'the banality of evil'?",
        choices: [
          { letter: "A", text: "Evil is always the result of deep psychological pathology in individuals" },
          { letter: "B", text: "Ordinary people can commit atrocities through passive compliance and lack of moral reflection" },
          { letter: "C", text: "The Nuremberg trials failed to adequately hold Nazi officials accountable" },
          { letter: "D", text: "Political violence requires a charismatic leader to direct ordinary people" },
        ],
        answer: "B",
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // MATH — MODULE 1  (22 questions, 35 min)
  // ─────────────────────────────────────────────────────────────
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
        answer: "C",
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
        answer: "C",
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
        answer: "A",
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
        answer: "C",
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
        answer: "B",
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
        answer: "C",
      },
      {
        id: 7,
        text: "A car travels at a constant speed of 60 miles per hour. How far will it travel in 2 hours and 30 minutes?",
        choices: [
          { letter: "A", text: "120 miles" },
          { letter: "B", text: "140 miles" },
          { letter: "C", text: "150 miles" },
          { letter: "D", text: "160 miles" },
        ],
        answer: "C",
      },
      {
        id: 8,
        text: "If the mean of the numbers 4, 7, 10, x, and 14 is 9, what is the value of x?",
        choices: [
          { letter: "A", text: "8" },
          { letter: "B", text: "9" },
          { letter: "C", text: "10" },
          { letter: "D", text: "11" },
        ],
        answer: "C",
      },
      {
        id: 9,
        text: "Which of the following is a solution to the equation x² − 5x + 6 = 0?",
        choices: [
          { letter: "A", text: "x = 1" },
          { letter: "B", text: "x = 2" },
          { letter: "C", text: "x = 4" },
          { letter: "D", text: "x = 6" },
        ],
        answer: "B",
      },
      {
        id: 10,
        text: "A triangle has sides of length 5, 12, and 13. What is the area of the triangle?",
        choices: [
          { letter: "A", text: "20" },
          { letter: "B", text: "25" },
          { letter: "C", text: "30" },
          { letter: "D", text: "36" },
        ],
        answer: "C",
      },
      {
        id: 11,
        text: "If 2^x = 32, what is the value of x?",
        choices: [
          { letter: "A", text: "3" },
          { letter: "B", text: "4" },
          { letter: "C", text: "5" },
          { letter: "D", text: "6" },
        ],
        answer: "C",
      },
      {
        id: 12,
        text: "A line in the xy-plane passes through the origin and has a slope of 3. Which of the following points lies on this line?",
        choices: [
          { letter: "A", text: "(1, 2)" },
          { letter: "B", text: "(2, 6)" },
          { letter: "C", text: "(3, 6)" },
          { letter: "D", text: "(4, 9)" },
        ],
        answer: "B",
      },
      {
        id: 13,
        text: "In a class of 30 students, 18 play soccer and 12 play basketball. If 6 students play both sports, how many students play neither sport?",
        choices: [
          { letter: "A", text: "4" },
          { letter: "B", text: "6" },
          { letter: "C", text: "8" },
          { letter: "D", text: "10" },
        ],
        answer: "B",
      },
      {
        id: 14,
        text: "What is the value of |−7 + 3|?",
        choices: [
          { letter: "A", text: "−4" },
          { letter: "B", text: "4" },
          { letter: "C", text: "10" },
          { letter: "D", text: "−10" },
        ],
        answer: "B",
      },
      {
        id: 15,
        text: "A circle has a radius of 6. What is the circumference of the circle?",
        choices: [
          { letter: "A", text: "6π" },
          { letter: "B", text: "12π" },
          { letter: "C", text: "18π" },
          { letter: "D", text: "36π" },
        ],
        answer: "B",
      },
      {
        id: 16,
        text: "If 5(x − 2) = 3x + 8, what is the value of x?",
        choices: [
          { letter: "A", text: "7" },
          { letter: "B", text: "8" },
          { letter: "C", text: "9" },
          { letter: "D", text: "10" },
        ],
        answer: "C",
      },
      {
        id: 17,
        text: "The function g is defined by g(x) = 2x² + 3x − 5. What is the value of g(−2)?",
        choices: [
          { letter: "A", text: "−7" },
          { letter: "B", text: "−3" },
          { letter: "C", text: "1" },
          { letter: "D", text: "3" },
        ],
        answer: "B",
      },
      {
        id: 18,
        text: "A bag contains 4 red marbles, 5 blue marbles, and 3 green marbles. If one marble is drawn at random, what is the probability it is blue?",
        choices: [
          { letter: "A", text: "1/4" },
          { letter: "B", text: "5/12" },
          { letter: "C", text: "1/3" },
          { letter: "D", text: "5/9" },
        ],
        answer: "B",
      },
      {
        id: 19,
        text: "What is the slope of the line 3x − 4y = 12?",
        choices: [
          { letter: "A", text: "−3/4" },
          { letter: "B", text: "3/4" },
          { letter: "C", text: "4/3" },
          { letter: "D", text: "−4/3" },
        ],
        answer: "B",
      },
      {
        id: 20,
        text: "If x² = 81, which of the following gives all possible values of x?",
        choices: [
          { letter: "A", text: "9 only" },
          { letter: "B", text: "−9 only" },
          { letter: "C", text: "9 and −9" },
          { letter: "D", text: "81 and −81" },
        ],
        answer: "C",
      },
      {
        id: 21,
        text: "A cylinder has a radius of 3 and a height of 8. What is the volume of the cylinder?",
        choices: [
          { letter: "A", text: "24π" },
          { letter: "B", text: "48π" },
          { letter: "C", text: "72π" },
          { letter: "D", text: "96π" },
        ],
        answer: "C",
      },
      {
        id: 22,
        text: "If the ratio of boys to girls in a class is 3:4 and there are 28 students total, how many boys are in the class?",
        choices: [
          { letter: "A", text: "9" },
          { letter: "B", text: "12" },
          { letter: "C", text: "16" },
          { letter: "D", text: "21" },
        ],
        answer: "B",
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // MATH — MODULE 2  (22 questions, 35 min)
  // ─────────────────────────────────────────────────────────────
  {
    name: "Math - Module 2",
    durationMinutes: 35,
    questions: [
      {
        id: 1,
        text: "Which of the following is equivalent to (x + 4)²?",
        choices: [
          { letter: "A", text: "x² + 8" },
          { letter: "B", text: "x² + 8x + 16" },
          { letter: "C", text: "x² + 16" },
          { letter: "D", text: "x² + 4x + 16" },
        ],
        answer: "B",
      },
      {
        id: 2,
        text: "A train travels 240 miles in 4 hours. At this rate, how many miles will the train travel in 7 hours?",
        choices: [
          { letter: "A", text: "360" },
          { letter: "B", text: "380" },
          { letter: "C", text: "400" },
          { letter: "D", text: "420" },
        ],
        answer: "D",
      },
      {
        id: 3,
        text: "For the function h(x) = 3x − 7, what value of x gives h(x) = 8?",
        choices: [
          { letter: "A", text: "3" },
          { letter: "B", text: "4" },
          { letter: "C", text: "5" },
          { letter: "D", text: "6" },
        ],
        answer: "C",
      },
      {
        id: 4,
        text: "What is the solution to the system of equations?\n2x + y = 10\nx − y = 2",
        choices: [
          { letter: "A", text: "x = 3, y = 4" },
          { letter: "B", text: "x = 4, y = 2" },
          { letter: "C", text: "x = 5, y = 0" },
          { letter: "D", text: "x = 2, y = 6" },
        ],
        answer: "B",
      },
      {
        id: 5,
        text: "The graph of y = ax² + bx + c has a vertex at (2, −3). If the parabola opens upward, which of the following must be true?",
        choices: [
          { letter: "A", text: "a < 0" },
          { letter: "B", text: "a > 0" },
          { letter: "C", text: "b = 0" },
          { letter: "D", text: "c < 0" },
        ],
        answer: "B",
      },
      {
        id: 6,
        text: "A data set has a mean of 50 and a standard deviation of 5. Which value is exactly two standard deviations above the mean?",
        choices: [
          { letter: "A", text: "55" },
          { letter: "B", text: "57" },
          { letter: "C", text: "60" },
          { letter: "D", text: "65" },
        ],
        answer: "C",
      },
      {
        id: 7,
        text: "In the equation 4(x + 3) = 2(x + 9), what is the value of x?",
        choices: [
          { letter: "A", text: "1" },
          { letter: "B", text: "3" },
          { letter: "C", text: "5" },
          { letter: "D", text: "6" },
        ],
        answer: "B",
      },
      {
        id: 8,
        text: "A right triangle has legs of length 8 and 15. What is the length of the hypotenuse?",
        choices: [
          { letter: "A", text: "13" },
          { letter: "B", text: "16" },
          { letter: "C", text: "17" },
          { letter: "D", text: "23" },
        ],
        answer: "C",
      },
      {
        id: 9,
        text: "If the expression (3x³y²)(4x²y) is simplified, which of the following is the result?",
        choices: [
          { letter: "A", text: "7x⁵y³" },
          { letter: "B", text: "12x⁵y³" },
          { letter: "C", text: "12x⁶y²" },
          { letter: "D", text: "7x⁶y³" },
        ],
        answer: "B",
      },
      {
        id: 10,
        text: "A square has an area of 144 square units. What is the perimeter of the square?",
        choices: [
          { letter: "A", text: "36" },
          { letter: "B", text: "44" },
          { letter: "C", text: "48" },
          { letter: "D", text: "52" },
        ],
        answer: "C",
      },
      {
        id: 11,
        text: "If log₂(x) = 5, what is the value of x?",
        choices: [
          { letter: "A", text: "10" },
          { letter: "B", text: "16" },
          { letter: "C", text: "25" },
          { letter: "D", text: "32" },
        ],
        answer: "D",
      },
      {
        id: 12,
        text: "A population grows at a rate of 4% per year. If the initial population is 5,000, what is the population after 2 years?",
        choices: [
          { letter: "A", text: "5,200" },
          { letter: "B", text: "5,400" },
          { letter: "C", text: "5,408" },
          { letter: "D", text: "5,432" },
        ],
        answer: "C",
      },
      {
        id: 13,
        text: "In the xy-plane, the equation of a circle with center (3, −2) and radius 5 is:",
        choices: [
          { letter: "A", text: "(x − 3)² + (y + 2)² = 5" },
          { letter: "B", text: "(x + 3)² + (y − 2)² = 25" },
          { letter: "C", text: "(x − 3)² + (y + 2)² = 25" },
          { letter: "D", text: "(x − 3)² − (y + 2)² = 25" },
        ],
        answer: "C",
      },
      {
        id: 14,
        text: "What is the value of sin(30°)?",
        choices: [
          { letter: "A", text: "√3/2" },
          { letter: "B", text: "1/2" },
          { letter: "C", text: "√2/2" },
          { letter: "D", text: "1" },
        ],
        answer: "B",
      },
      {
        id: 15,
        text: "If x + y = 10 and xy = 21, what is the value of x² + y²?",
        choices: [
          { letter: "A", text: "42" },
          { letter: "B", text: "58" },
          { letter: "C", text: "79" },
          { letter: "D", text: "100" },
        ],
        answer: "B",
      },
      {
        id: 16,
        text: "A line has the equation y = −2x + 5. Which of the following lines is parallel to it?",
        choices: [
          { letter: "A", text: "y = 2x + 5" },
          { letter: "B", text: "y = −2x − 3" },
          { letter: "C", text: "y = (1/2)x + 5" },
          { letter: "D", text: "y = −(1/2)x + 3" },
        ],
        answer: "B",
      },
      {
        id: 17,
        text: "What is the sum of the roots of 2x² − 8x + 6 = 0?",
        choices: [
          { letter: "A", text: "2" },
          { letter: "B", text: "3" },
          { letter: "C", text: "4" },
          { letter: "D", text: "6" },
        ],
        answer: "C",
      },
      {
        id: 18,
        text: "A committee of 3 people is to be chosen from a group of 7. In how many ways can this be done?",
        choices: [
          { letter: "A", text: "21" },
          { letter: "B", text: "35" },
          { letter: "C", text: "42" },
          { letter: "D", text: "210" },
        ],
        answer: "B",
      },
      {
        id: 19,
        text: "Which value of x satisfies |2x − 3| = 7?",
        choices: [
          { letter: "A", text: "x = −2 only" },
          { letter: "B", text: "x = 5 only" },
          { letter: "C", text: "x = 5 or x = −2" },
          { letter: "D", text: "x = 5 or x = 2" },
        ],
        answer: "C",
      },
      {
        id: 20,
        text: "The expression (x² − 9)/(x − 3) is equivalent to which of the following for x ≠ 3?",
        choices: [
          { letter: "A", text: "x − 3" },
          { letter: "B", text: "x + 3" },
          { letter: "C", text: "x² − 3" },
          { letter: "D", text: "x + 9" },
        ],
        answer: "B",
      },
      {
        id: 21,
        text: "A geometric sequence has first term 3 and common ratio 2. What is the 6th term?",
        choices: [
          { letter: "A", text: "48" },
          { letter: "B", text: "96" },
          { letter: "C", text: "64" },
          { letter: "D", text: "192" },
        ],
        answer: "B",
      },
      {
        id: 22,
        text: "If the discriminant of ax² + bx + c = 0 equals zero, which of the following must be true?",
        choices: [
          { letter: "A", text: "The equation has two distinct real roots" },
          { letter: "B", text: "The equation has no real roots" },
          { letter: "C", text: "The equation has exactly one real root" },
          { letter: "D", text: "The equation has two imaginary roots" },
        ],
        answer: "C",
      },
    ],
  },
];
