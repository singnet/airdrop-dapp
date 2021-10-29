type FAQ = {
  question: string;
  answer: string;
};
export const faqSampleData: FAQ[] = [
  {
    question: "When is the airdrop?",
    answer:
      "The airdrop is in four monthly tranches, taking place on November xx, 2021, December xx 2021, January xx 2022, and February xx 2022. ",
  },
  {
    question: "How many NTX will be distributed?",
    answer:
      "A total of 50,000,000 NTX will be distributed across the four airdrops. These will be distributed in four increasing monthly amounts: 17.5% of the tokens (8,750,000) the first month, 22.5% of the tokens (11,250,000) the second month, 27.5% of the tokens (13,750,000) the third month, and 32.5% of the tokens (16,250,000) the fourth and final month.",
  },
  {
    question: "How many NTX can each participant get?",
    answer:
      "It is impossible to say this for sure, as it depends on how many people successfully complete the registration and snapshot eligibility requirements. The NTX amounts mentioned in the previous question will be distributed among eligible participants according to following formula: Reward = total_reward * log10(1+user_balance) / SUM(log10(1+user_balance))",
  },
  {
    question: "What do I need to do to participate?",
    answer:
      "There are two criteria for participation: firstly, you must register at this portal before DATE-TIME-TIMEZONE. Secondly, you must have a minimum of xx AGIX or xx SDAO in your Ethereum wallet when we take the snapshot of the Ethereum blockchain at DATE-TIME-TIMEZONE.",
  },
];
