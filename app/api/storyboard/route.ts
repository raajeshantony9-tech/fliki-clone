import { NextResponse } from 'next/server'

const generateScript = (prompt: string) => {
  const lower = prompt.toLowerCase()
  // Define keywords for each genre
  const horrorWords = ['horror', 'ghost', 'haunted', 'zombie', 'vampire', 'monster', 'scary', 'dark', 'nightmare', 'creepy', 'blood', 'skeleton', 'witch']
  const spaceWords = ['space', 'astronaut', 'galaxy', 'star', 'planet', 'alien', 'rocket', 'nasa', 'orbit', 'mars', 'moon', 'spaceship', 'universe']
  const kidsWords = ['kid', 'kids', 'child', 'children', 'school', 'playground', 'toy', 'game', 'fun', 'learn', 'adventure', 'friend', 'family']
  const detectiveWords = ['detective', 'mystery', 'crime', 'murder', 'investigation', 'clue', 'sherlock', 'case', 'suspect', 'evidence', 'police']
  const fantasyWords = ['fantasy', 'magic', 'wizard', 'witch', 'dragon', 'elf', 'quest', 'kingdom', 'castle', 'sword', 'mythical', 'enchanted', 'fairy']
  const natureWords = ['nature', 'forest', 'jungle', 'ocean', 'sea', 'mountain', 'river', 'wildlife', 'animal', 'bird', 'tree', 'flower', 'wilderness']
  const sportsWords = ['sport', 'football', 'soccer', 'baseball', 'tennis', 'olympic', 'race', 'match', 'team', 'coach', 'stadium', 'championship']
  const techWords = ['technology', 'tech', 'robot', 'ai', 'artificial intelligence', 'computer', 'internet', 'software', 'robotics', 'future', 'innovation', 'digital', 'cyber']

  const matches = (arr: string[]) => arr.some(word => lower.includes(word))

  if (matches(horrorWords)) {
    return `In a desolate town shrouded by perpetual fog, ${prompt} becomes the catalyst for a nightmare that no resident could have anticipated. As night falls, strange occurrences begin—doors creak open by themselves, whispers echo through empty hallways, and shadows move without a source. Our protagonist, a skeptical newcomer, initially dismisses these events as superstition, but soon finds themselves face-to-face with an ancient evil that feeds on fear. With each clue uncovered, the town's dark history reveals a pact made centuries ago, and now the debt is due. Racing against time, they must gather the courage to confront the entity in its lair beneath the old church. The final confrontation is a battle of wills, where light battles darkness, and survival depends on believing in the impossible. Dawn breaks over a silent town, the threat contained but the memory of horror forever etched into the souls of those who witnessed it.`
  }

  if (matches(spaceWords)) {
    return `When humanity's first deep-space mission encounters ${prompt}, the voyage becomes a test of endurance, ingenuity, and the unquenchable spirit of exploration. Astronauts aboard the starship Odyssey discover a anomaly that defies the laws of physics—a shimmering portal near a distant nebula that promises answers to humanity's place in the cosmos. As they draw nearer, equipment malfunctions, time dilates strangely, and the crew experiences visions of both past glories and potential futures. Tensions rise as resources dwindle and the psychological toll of isolation manifests. Yet, driven by curiosity, they decide to probe the phenomenon, launching a probe that transmits back data suggesting an intelligent signal. The climax arrives when a decision must be made: retreat to safety or attempt contact. Choosing the latter, they establish first contact with an ancient, benevolent intelligence that shares knowledge of sustainable energy and interstellar cooperation. The crew returns home transformed, bearing a message of unity and a new era of space exploration dawns for Earth.`
  }

  if (matches(kidsWords)) {
    return `In a vibrant town where every day feels like an adventure, ${prompt} sparks a series of delightful discoveries for a group of curious children. Maya, Leo, and their mischievous puppy Buddy stumble upon a mysterious map tucked inside a library book, hinting at a hidden treasure somewhere in the town park. With backpacks packed with snacks, magnifying glasses, and boundless enthusiasm, they follow clues that lead them through the jungle gym, across the splash pad, and into the old oak tree's hollow. Along the way, they learn to cooperate, solve simple puzzles, and appreciate the beauty of their surroundings—from ladybugs on leaves to the rhythm of the wind chimes. When they finally uncover the chest, it's not gold or jewels but a collection of handwritten notes from past children, sharing their own dreams and adventures. Inspired, the friends add their own notes, promising to keep the spirit of exploration alive for the next generation. The sun sets on a day filled with laughter, friendship, and the timeless joy of childhood wonder.`
  }

  if (matches(detectiveWords)) {
    return `When a priceless artifact vanishes from the city museum under impossible circumstances, the city's best detective is called to investigate ${prompt}. The thief left behind only a single clue: a cryptic symbol etched into the display case. As our protagonist digs deeper, they uncover a secret society that has been operating in the shadows for decades, using the artifact as part of an ancient ritual. Each clue leads to a riddle that only someone with knowledge of the city's forgotten history can solve. Late-night stakeouts, covert interviews with informants, and a high-speed chase through the rain-slicked streets reveal layers of deception. The detective's intuition is put to the test when they realize the crime is an inside job—someone they trusted has been feeding information to the syndicate. In a dramatic showdown at the abandoned subway tunnels, the truth emerges: the theft was a distraction from a far more dangerous plot. With quick thinking and courage, our hero apprehends the culprits, recovers the treasure, and restores peace to the city.`
  }

  if (matches(fantasyWords)) {
    return `In a realm where magic flows as freely as rivers, ${prompt} heralds the rise of a young hero destined to restore balance to the kingdom. Born under a rare celestial alignment, they discover an innate ability to harness the ancient ley lines that pulse beneath the land. Guided by a wise old wizard and accompanied by a loyal griffin companion, they embark on a quest to retrieve the shattered shards of the Crystal of Light, scattered across treacherous realms after the dark sorcerer's betrayal. Each trial tests a different virtue—courage in the fiery pits of Mount Ember, wisdom in the labyrinthine Library of Whispers, and compassion in the enchanted forest where souls are trapped in thorns. As darkness spreads, corrupting the once-vibrant meadows and twisting creatures into grotesque shadows, the stakes become personal when the villain kidnaps the healer's apprentice. The final battle atop the Celestial Crescent combines swordplay, spellcraft, and sacrifice. Victory restores the crystal's brilliance, bathing the realm in renewed hope and ushering an era of peace where magic and humanity coexist in harmony.`
  }

  if (matches(natureWords)) {
    return `Deep within the emerald canopy of the Amazon rainforest, ${prompt} sets the stage for an extraordinary journey of discovery and conservation. A team of biologists and indigenous guides embarks on a months-long expedition to document unseen species and assess the health of this vital ecosystem. Each day brings new wonders: iridescent macaws streaking across the sky, elusive jaguars padding silently along riverbanks, and rare orchids blooming in hidden groves. Yet, the expedition also confronts harsh realities—illegal logging scars the landscape, poachers set traps for exotic creatures, and climate change alters rainfall patterns. Using a blend of traditional knowledge and cutting-edge technology, the team works to mediate between local communities' needs and environmental protection. They establish buffer zones, promote sustainable agroforestry, and educate visitors about the forest's irreplaceable value. As the mission concludes, the collected data becomes a powerful tool for advocacy, inspiring international efforts to preserve one of Earth's last great wildernesses for generations to come.`
  }

  if (matches(sportsWords)) {
    return `Under the blazing lights of the championship stadium, ${prompt} fuels the dreams of an underdog team striving for glory against all odds. After a season plagued by injuries and doubts, the recruits rally around a charismatic coach who believes in relentless preparation and unity. Each game becomes a lesson in perseverance—narrow victories teach resilience, crushing defeats reveal areas for growth, and the bond between players strengthens with every shared struggle. As the playoffs approach, the team faces their fiercest rivals, a dynasty known for flawless execution and icy composure. The semifinal clash goes into overtime, where a daring trick play secures a slim advantage. In the final match, with seconds left on the scoreboard and the score tied, the star athlete executes a maneuver practiced countless times, sending the ball soaring into the winning zone. Pandemonium erupts as confetti rains down, trophies are lifted, and the victory celebrated not just as a trophy, but as proof that heart, hard work, and belief can triumph over any obstacle.`
  }

  if (matches(techWords)) {
    return `In the bustling innovation hub of Neo City, ${prompt} inspires a young entrepreneur to launch a startup aimed at revolutionizing urban transportation. After months of coding in cramped coworking spaces and countless pitch meetings with skeptical investors, the team finally unveils their breakthrough: an AI-powered traffic management system that optimizes flow in real time, reducing congestion and emissions. Early pilots in the downtown district show promising results—commute times drop by fifteen percent, and air quality improves noticeably. However, success attracts scrutiny; concerns about data privacy and algorithmic bias emerge, prompting the founders to implement transparent governance and robust safeguards. As the system scales to other cities, it integrates with renewable energy grids, enabling smart cities to dynamically balance power consumption and mobility needs. The vision expands beyond roads to include autonomous public transit and pedestrian-friendly designs, creating a holistic ecosystem where technology serves humanity. The journey proves that ethical innovation, coupled with determination, can reshape urban life for the better.`
  }

  // Fallback: generic inspirational story using the prompt
  return `In a world where ${prompt} ignites change, a diverse group of individuals comes together to pursue a shared dream. Each brings unique talents and perspectives, yet they are united by a common purpose: to make a positive impact on their community and beyond. Their journey begins with humble brainstorming sessions in a modest garage, where ideas are sketched on whiteboards and prototypes cobbled together from everyday materials. Obstacles arise—funding shortages, technical setbacks, and moments of doubt—but the team learns to adapt, leveraging each setback as an opportunity to grow stronger. Mentors appear along the way, offering guidance and wisdom drawn from years of experience. Through perseverance and collaboration, they refine their vision, transforming abstract concepts into tangible solutions that address real-world needs. When the day arrives to unveil their creation to the public, the response is overwhelmingly positive, validating countless hours of hard work and heartfelt dedication. The project's success inspires others to embark on their own journeys of innovation, proving that when passion meets purpose, extraordinary things can happen.`
}

export async function POST(request: Request) {
  try {
    const { prompt } = await request.json()

    const now = new Date()
    const rawText = generateScript(prompt)

    const storyboard = {
      id: 'mock-storyboard-id',
      userId: 'demo-user',
      title: 'Mock Storyboard',
      prompt,
      script: {
        id: 'script-1',
        rawText,
        createdAt: now
      },
      scenes: [],
      timeline: {
        id: 'timeline-1',
        storyboardId: 'mock-storyboard-id',
        tracks: [],
        transitions: [],
        totalDuration: 0
      },
      status: 'draft',
      createdAt: now,
      updatedAt: now
    }

    return NextResponse.json(storyboard, { status: 200 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid request body' },
      { status: 400 }
    )
  }
}