export type Charity = {
  id: string
  name: string
  cause: string
  description: string
  url: string
  donateUrl: string
}

export const CHARITIES: Charity[] = [
  { id: "givedirectly", name: "GiveDirectly", cause: "Poverty", description: "Sends cash directly to people living in extreme poverty.", url: "https://www.givedirectly.org", donateUrl: "https://www.givedirectly.org/give-now/" },
  { id: "amf", name: "Against Malaria Foundation", cause: "Health", description: "Funds mosquito nets that protect families from malaria.", url: "https://www.againstmalaria.com", donateUrl: "https://www.againstmalaria.com/Donate.aspx" },
  { id: "msf", name: "Doctors Without Borders (MSF)", cause: "Health", description: "Emergency medical care in conflict zones and disasters.", url: "https://www.msf.org", donateUrl: "https://donate.doctorswithoutborders.org" },
  { id: "unicef", name: "UNICEF", cause: "Children", description: "Health, nutrition, education and protection for children worldwide.", url: "https://www.unicef.org", donateUrl: "https://www.unicef.org/donate" },
  { id: "save-the-children", name: "Save the Children", cause: "Children", description: "Helps children survive, learn and stay safe.", url: "https://www.savethechildren.org", donateUrl: "https://www.savethechildren.org/us/ways-to-help/donate" },
  { id: "wfp", name: "World Food Programme", cause: "Hunger", description: "The world's largest humanitarian food assistance organisation.", url: "https://www.wfp.org", donateUrl: "https://www.wfp.org/support-us/donate" },
  { id: "irc", name: "International Rescue Committee", cause: "Disaster relief", description: "Helps people affected by crisis to survive, recover and rebuild.", url: "https://www.rescue.org", donateUrl: "https://www.rescue.org/donate" },
  { id: "oxfam", name: "Oxfam", cause: "Poverty", description: "Fights inequality to end poverty and injustice.", url: "https://www.oxfam.org", donateUrl: "https://www.oxfam.org/en/donate" },
  { id: "charity-water", name: "charity: water", cause: "Clean water", description: "Brings clean, safe drinking water to communities in need.", url: "https://www.charitywater.org", donateUrl: "https://www.charitywater.org/donate" },
  { id: "water-org", name: "Water.org", cause: "Clean water", description: "Gives people access to safe water and sanitation through small loans.", url: "https://water.org", donateUrl: "https://water.org/donate/" },
  { id: "room-to-read", name: "Room to Read", cause: "Education", description: "Literacy and girls' education programmes in low-income countries.", url: "https://www.roomtoread.org", donateUrl: "https://www.roomtoread.org/donate/" },
  { id: "hki", name: "Helen Keller Intl", cause: "Health", description: "Prevents blindness and malnutrition in vulnerable communities.", url: "https://www.hki.org", donateUrl: "https://www.hki.org/donate/" },
  { id: "malaria-consortium", name: "Malaria Consortium", cause: "Health", description: "Malaria and neglected tropical disease prevention and treatment.", url: "https://www.malariaconsortium.org", donateUrl: "https://www.malariaconsortium.org/donate.htm" },
  { id: "tnc", name: "The Nature Conservancy", cause: "Environment", description: "Protects lands and waters on which all life depends.", url: "https://www.nature.org", donateUrl: "https://www.nature.org/en-us/get-involved/how-to-help/donate/" },
  { id: "wwf", name: "WWF", cause: "Environment", description: "Conserves nature and reduces the most pressing threats to wildlife.", url: "https://www.worldwildlife.org", donateUrl: "https://support.worldwildlife.org/site/Donation2" },
  { id: "rainforest-trust", name: "Rainforest Trust", cause: "Environment", description: "Buys and protects threatened tropical habitat.", url: "https://www.rainforesttrust.org", donateUrl: "https://www.rainforesttrust.org/donate/" },
  { id: "ocean-conservancy", name: "Ocean Conservancy", cause: "Environment", description: "Science-based solutions for a healthy ocean and wildlife.", url: "https://oceanconservancy.org", donateUrl: "https://oceanconservancy.org/donate/" },
  { id: "habitat", name: "Habitat for Humanity", cause: "Housing", description: "Helps families build and improve places to call home.", url: "https://www.habitat.org", donateUrl: "https://www.habitat.org/donate" },
  { id: "wikimedia", name: "Wikimedia Foundation", cause: "Education", description: "Keeps Wikipedia and free knowledge available to everyone.", url: "https://wikimediafoundation.org", donateUrl: "https://donate.wikimedia.org" },
  { id: "direct-relief", name: "Direct Relief", cause: "Disaster relief", description: "Delivers medical aid to people affected by emergencies.", url: "https://www.directrelief.org", donateUrl: "https://www.directrelief.org/donate/" },
]

export const CHARITY_IDS = CHARITIES.map((c) => c.id)

export function getCharity(id: string | null | undefined) {
  return CHARITIES.find((c) => c.id === id)
}
