const apiUrl = process.env.BASE_URL;

export interface UserData {
  id: number;
  userInfos: {
    age: number;
    firstName: string;
    lastName: string;
  };
  todayScore?: number;
  score?: number;
  keyData: {
    calorieCount: number;
    proteinCount: number;
    carbohydrateCount: number;
    lipidCount: number;
  };
}

export interface UserActivity {
  data: {
    sessions: Array<{
      date: string;
      calories: number;
      kilogram: number;
    }>;
  };
}

export interface UserAverageSessions {
  data: {
    sessions: Array<{
      day: string;
      sessionLength: number;
    }>;
  };
}

export interface UserPerformance {
  data: {
    data: Array<{
      value: number;
      kind: number;
    }>;
    kind: { [key: number]: string };
  };
}

export async function fetchUserData(id: string | number): Promise<UserData> {
  const response = await fetch(`${apiUrl}/user/${id}`);
  if (!response.ok) throw new Error('First Call, Not Found');
  const { data } = await response.json();
  return data;
}

export async function fetchUserActivity(id: string | number): Promise<UserActivity> {
  const response = await fetch(`${apiUrl}/user/${id}/activity`);
  if (!response.ok) throw new Error('Second Call, Activity Not Found');
  const data = await response.json();
  const sessions = data.data.sessions.map((s: any) => ({ ...s, date: s.day }));
  return { data: { sessions } };
}

export async function fetchUserAverageSessions(id: string | number): Promise<UserAverageSessions> {
  const response = await fetch(`${apiUrl}/user/${id}/average-sessions`);
  if (!response.ok) throw new Error('Third Call, Session Not Found');
  const data = await response.json();
  const sessions = data.data.sessions.map((s: any) => ({ ...s, day: s.day.toString() }));
  return { data: { sessions } };
}

export async function fetchUserPerformance(id: string | number): Promise<UserPerformance> {
  const response = await fetch(`${apiUrl}/user/${id}/performance`);
  if (!response.ok) throw new Error('Fourth Call, Performance Not Found');
  const data = await response.json();
  return data;
}
