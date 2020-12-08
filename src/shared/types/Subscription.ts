
export type SubscriptionStatus =
  'active'
  | 'pending'
  | 'unsubscribed'
  | 'deleted';


export type Subscription = {
  emailAddress: string;
  iconUrl: string;
  id: string;
  name: string;
  registeredAt: string; // ISO string but I should figure out how to make this a date type
  status: SubscriptionStatus;
  url: string;
};

export type SubscriptionsList = {
  listSubscriptions: {
    items: Subscription[];
  }
}
