export interface FaqItem {
  question: string
  answer: string
}

export const FAQ_ITEMS: FaqItem[] = [
  {
    question: 'How do I request a flight booking?',
    answer:
      'Search for your route, choose a demonstration flight option, then complete the multi-step booking request. You will share your contact details, passenger information, travel preferences and communication consent. Our team can then review the request and follow up with you.',
  },
  {
    question: 'Is my booking confirmed immediately?',
    answer:
      'No. FlightsFuzz is a booking-request service. Submitting a request does not issue a ticket or reserve a seat. A team member will review availability, fare rules and documents with you before anything is confirmed.',
  },
  {
    question: 'How will I receive my flight quotation?',
    answer:
      'Once the real communication integrations are active, the team will contact you using the email address and WhatsApp number you provide. The quotation should include the fare, baggage allowance, cancellation rules and payment instructions.',
  },
  {
    question: 'Can I book an international flight?',
    answer:
      'Yes. FlightsFuzz is designed around international travel from Nepal, including the Gulf, South Asia, Southeast Asia, Europe, East Asia and Australia. Domestic Nepal requests can also be submitted for assistance.',
  },
  {
    question: 'What documents are required?',
    answer:
      'It depends on the route, your nationality and the airline. Passports are commonly required for international travel, while citizenship, Aadhaar or national ID documents may be relevant for specific itineraries. The team will confirm the exact requirements before booking.',
  },
  {
    question: 'How do I communicate with FlightsFuzz?',
    answer:
      'The preferred channels are email and WhatsApp. You choose whether to consent to each channel during the booking request. Our official contact details will be published on the Contact page once they are activated.',
  },
  {
    question: 'How do payments work?',
    answer:
      'There is no online payment in this demonstration. In the real workflow, payment instructions and receipts would come directly from the FlightsFuzz team after a quotation is accepted. Never send money to an unverified account.',
  },
  {
    question: 'Can I request assistance for multiple passengers?',
    answer:
      'Yes. Add each traveller in the passenger step, including children and infants. For groups larger than nine travellers, please use the contact page so the team can help with the request manually.',
  },
]
