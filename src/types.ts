export type ScenarioType =
  | 'missed_call'
  | 'customer_message'
  | 'quote_request'
  | 'appointment_request'
  | 'after_hours'
  | 'emergency_request';

export interface ChatMessage {
  sender: 'AI ASSISTANT' | 'CUSTOMER';
  text: string;
}

export interface ScenarioData {
  banner: string;
  script: ChatMessage[];
}
