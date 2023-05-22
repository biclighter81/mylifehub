export interface UpcomingEvents {
  events? : Event[]
}

export interface Event {
  id: string,
  name: string,
  date: string,
  time: string,
  description?: string,
  location?: string,
  category?: string,
}