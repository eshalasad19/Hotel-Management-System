const faqGroups = [
  {
    title: 'General Information:',
    id: 'accordionGeneral',
    items: [
      {
        q: 'What are the check-in and check-out times?',
        a: 'Check-in starts at 2:00 PM, and check-out is until 11:00 AM. Early check-in or late check-out may be available upon request, subject to availability.',
      },
      {
        q: 'Is the front desk open 24/7?',
        a: 'Yes, our front desk operates 24 hours a day to assist you at any time.',
      },
      {
        q: 'What amenities are included with my stay?',
        a: 'All stays include free Wi-Fi, complimentary toiletries, air conditioning, daily housekeeping, and access to hotel facilities.',
      },
    ],
  },
  {
    title: 'Reservations & Payments:',
    id: 'accordionPayments',
    items: [
      {
        q: 'How can I make a reservation?',
        a: 'You can book directly through our website, call our reservation desk, or use trusted travel platforms.',
      },
      {
        q: 'What payment methods do you accept?',
        a: 'We accept major credit/debit cards, UPI, net banking, and cash payments at the hotel.',
      },
      {
        q: 'What is your cancellation policy?',
        a: 'Free cancellation is available up to 24 hours before check-in. Late cancellations or no-shows may incur charges.',
      },
    ],
  },
  {
    title: 'Pricing & Policies:',
    id: 'accordionPricing',
    items: [
      {
        q: 'Are taxes included in the room price?',
        a: 'Taxes may be included or shown separately depending on the booking platform. Final pricing will be displayed before confirmation.',
      },
      {
        q: 'Are there extra charges for additional guests?',
        a: 'Yes, extra guests may incur additional charges. Please check room details while booking.',
      },
    ],
  },
  {
    title: 'Location & Transportation:',
    id: 'accordionLocation',
    items: [
      {
        q: 'Do you provide airport or railway station transfers?',
        a: 'Yes, we offer transfer services at an additional cost. Please contact us in advance to arrange.',
      },
      {
        q: 'Is parking available at the hotel?',
        a: 'Yes, we provide free on-site parking for our guests.',
      },
    ],
  },
  {
    title: 'Dining & Services:',
    id: 'accordionDining',
    items: [
      {
        q: 'Do you have a restaurant on-site?',
        a: 'Yes, our hotel features a multi-cuisine restaurant serving breakfast, lunch, and dinner.',
      },
      {
        q: 'Is breakfast included in the stay?',
        a: 'Breakfast is included in selected room packages. Please check your booking details.',
      },
      {
        q: 'Do you offer room service?',
        a: 'Yes, room service is available during designated hours.',
      },
    ],
  },
  {
    title: 'Facilities & Amenities:',
    id: 'accordionFacilities',
    items: [
      {
        q: 'Is Wi-Fi available?',
        a: 'Yes, complimentary high-speed Wi-Fi is available throughout the property.',
      },
      {
        q: 'Do you have a gym or swimming pool?',
        a: 'Yes, we offer a fitness center and swimming pool for guest use.',
      },
      {
        q: 'Is the hotel pet-friendly?',
        a: 'Pets are allowed in selected rooms. Please confirm with us before booking.',
      },
    ],
  },
  {
    title: 'Guest Experience:',
    id: 'accordionGuest',
    items: [
      {
        q: 'Is the hotel suitable for families?',
        a: 'Absolutely! We offer family-friendly rooms and services to ensure a comfortable stay.',
      },
      {
        q: 'Do you provide extra beds or baby cribs?',
        a: 'Yes, extra beds and cribs are available on request, subject to availability.',
      },
    ],
  },
  {
    title: 'Safety & Security:',
    id: 'accordionSafety',
    items: [
      {
        q: 'What safety measures are in place?',
        a: 'We have 24/7 security, CCTV surveillance, and secure room access systems to ensure guest safety.',
      },
      {
        q: 'Are valuables safe in the room?',
        a: 'Yes, all rooms are equipped with safety lockers for storing valuables.',
      },
    ],
  },
  {
    title: 'Contact & Support:',
    id: 'accordionContact',
    items: [
      {
        q: 'How can I contact the hotel for special requests?',
        a: 'You can call us, email us, or mention your request during booking. Our team will be happy to assist.',
      },
      {
        q: 'What if I face an issue during my stay?',
        a: 'Please contact the front desk immediately. We are committed to resolving any concerns promptly.',
      },
    ],
  },
];

function AccordionGroup({ title, id, items }) {
  return (
    <div className="col-lg-10">
      <h2 className="text-6 fw-600 text-primary mb-3">{title}</h2>
      <div className="accordion" id={id}>
        {items.map((item, index) => {
          const headingId = `${id}-heading-${index}`;
          const collapseId = `${id}-collapse-${index}`;
          return (
            <div className="accordion-item" key={item.q}>
              <h2 className="accordion-header" id={headingId}>
                <button
                  className={`accordion-button ${index === 0 ? '' : 'collapsed'}`}
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target={`#${collapseId}`}
                  aria-expanded={index === 0 ? 'true' : 'false'}
                  aria-controls={collapseId}
                >
                  {item.q}
                </button>
              </h2>
              <div
                id={collapseId}
                className={`accordion-collapse collapse ${index === 0 ? 'show' : ''}`}
                aria-labelledby={headingId}
                data-bs-parent={`#${id}`}
              >
                <div className="accordion-body">{item.a}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function FaqAccordion() {
  return (
    <section className="section">
      <div className="container">
        <div className="row justify-content-center g-5">
          {faqGroups.map((group) => (
            <AccordionGroup key={group.id} {...group} />
          ))}
        </div>
      </div>
    </section>
  );
}