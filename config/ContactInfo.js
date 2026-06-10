// config/ContactInfo.js

export const ContactInfo = {
  // Company Details
  name: "Tripyzo",
  website: "https://tripyzo.com",
  websiteDisplay: "Tripyzo.com",

  // Primary English phone support
  phones: {
    english: {
      // canonical numeric form (no separators), display uses 1-XXX-XXX-XXXX
      number: "18445723292",
      cleanNumber: "+18445723292",
      displayNumber: "1-844-572-3292",
      // linkNumber kept in E.164
      linkNumber: "+18445723292",
      language: "English",
      trackingId: "phone_english",
      department: "English Support",
    },
  },

  // Single Email
  emails: {
    info: {
      address: "info@tripyzo.com",
      trackingId: "email_info",
    },
  },

  // Multiple Addresses
  addresses: {
    headquarters: {
      name: "Headquarters",
      street: "13188 Juliet Way",
      suite: "",
      city: "Frisco",
      state: "TX",
      zipCode: "75035",
      country: "USA",
      fullAddress: "13188 Juliet Way, Frisco, TX 75035, USA",
      mapUrl: "https://maps.google.com",
      mapEmbedUrl:
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3341.331278946219!2d-96.76655972482631!3d33.12666036603649!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x864c3d9b929a05a1%3A0xd111b7f7435eadfe!2s13188%20Juliet%20Way%2C%20Frisco%2C%20TX%2075035!5e0!3m2!1sen!2sus!4v1779141697454!5m2!1sen!2sus",
    },
  },

  // Social Media (Optional)
  social: {
    facebook: "https://facebook.com/tripyzo",
    twitter: "https://twitter.com/tripyzo",
    instagram: "https://instagram.com/tripyzo",
  },

  // Default Values
  defaultPhone: "1-844-572-3292",
  defaultEmail: "info@tripyzo.com",
  defaultAddress: "13188 Juliet Way, Frisco, TX 75035, USA",
};

// Helper function to get the primary phone
export const getPhoneByLanguage = () => {
  return ContactInfo.phones.english;
};

// Helper function to get primary contact
export const getPrimaryContact = (language = "english") => ({
  phone: getPhoneByLanguage(language),
  email: ContactInfo.emails.info,
  address: ContactInfo.addresses.headquarters,
  website: ContactInfo.website,
});

// Helper function to get all phones for dropdown
export const getAllPhones = () => Object.values(ContactInfo.phones);

// Helper function to get all addresses
export const getAllAddresses = () => Object.values(ContactInfo.addresses);

// Format phone for tel: link
export const formatPhoneForLink = (phone) => {
  return phone.replace(/[^\d+]/g, "");
};

export const getPhoneDisplay = (language = "english") => {
  const phone = getPhoneByLanguage(language);
  return phone.displayNumber || phone.number || ContactInfo.defaultPhone;
};

export const getPhoneHref = (language = "english") => {
  const phone = getPhoneByLanguage(language);
  const rawPhone = phone.linkNumber || phone.cleanNumber || phone.number;
  return `tel:${formatPhoneForLink(rawPhone)}`;
};

export const getPrimaryEmail = () => ContactInfo.emails.info;

export const getEmailHref = () => `mailto:${ContactInfo.emails.info.address}`;

export const getPrimaryAddress = () => ContactInfo.addresses.headquarters;

export const getAddressDisplay = () =>
  ContactInfo.addresses.headquarters.fullAddress || ContactInfo.defaultAddress;

export const getMapUrl = () => ContactInfo.addresses.headquarters.mapUrl;

export const getMapEmbedUrl = () =>
  ContactInfo.addresses.headquarters.mapEmbedUrl;

export const getWebsiteUrl = (path = "") => {
  const normalizedPath = path ? `/${path.replace(/^\/+/, "")}` : "";
  return `${ContactInfo.website}${normalizedPath}`;
};

export const getWebsiteDisplay = () => ContactInfo.websiteDisplay;

export const getStructuredContact = (language = "english") => {
  const phone = getPhoneByLanguage(language);
  const address = getPrimaryAddress();

  return {
    phone: phone.linkNumber || formatPhoneForLink(phone.number),
    email: ContactInfo.emails.info.address,
    address: {
      streetAddress: [address.street, address.suite].filter(Boolean).join(", "),
      addressLocality: address.city,
      addressRegion: address.state,
      postalCode: address.zipCode,
      addressCountry: address.country,
    },
  };
};
