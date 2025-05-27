import React from 'react';

const Privacy_Policy = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-2">Privacy Policy</h1>
      <p className="text-gray-600 mb-8">
        We are committed to protecting your privacy and providing a safe and secure user experience.
      </p>

      <div className="space-y-6">
        <Section title="Information Collection">
          We collect information from you when you register on our site or fill out a form.
          When ordering or registering on our site, as appropriate, you may be asked to enter your name or email address.
          You may, however, visit our site anonymously.
        </Section>

        <Section title="Information Usage">
          Any of the information we collect from you may be used in one of the following ways:
          To personalize your experience (your information helps us to better respond to your individual needs).
        </Section>

        <Section title="Cookies">
          We use cookies to help us remember and process the items,
          understand and save your preferences for future visits and compile aggregate data about
          site traffic and site interaction so that we can offer better site experiences and tools in the future.
        </Section>

        <Section title="Data Security">
          We implement a variety of security measures to maintain the safety of your personal information
          when you enter, submit, or access your personal information.
        </Section>

        <Section title="Third-Party Disclosure">
          We do not sell, trade, or otherwise transfer to outside parties your personally identifiable information
          without your explicit consent.

        </Section>
      </div>


    </div>
  );
};

const Section = ({ title, children }) => (
  <div className="border p-4 rounded">
    <h2 className="text-lg font-semibold mb-2">{title}</h2>
    <p>{children}</p>
  </div>
);

export default Privacy_Policy;
