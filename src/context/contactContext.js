import { createContext } from "react";

export const ContactContext = createContext({
  loading: false,
  setLoading: () => {},
  contact: {},
  setContacts: () => {},
  contacts: [],
  filteredContacts: [],
  setFilteredContacts: [],
  contactquery: {},
  groups: [],
  onContactChange: () => {},
  deleteContact: () => {},
  updateContact: () => {},
  createContext: () => {},
  contactSearch: () => {},
});
