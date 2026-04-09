/**
 * Core task entity — matches the required data model from the assignment spec.
 * Using ISO string for createdAt keeps serialization simple across the API boundary.
 */
export interface Task {
  id: string;
  title: string;
  completed: boolean;
  createdAt: string; // ISO 8601 timestamp
}

/** Filter options for the task list view */
export type FilterType = 'all' | 'pending' | 'completed';
