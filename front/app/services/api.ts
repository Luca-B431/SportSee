const apiUrl = process.env.BASE_URL;

const mock = process.env.MOCK === 'true';

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
  if (mock) {
    return {
      id: Number(id),
      userInfos: {
        age: 31,
        firstName: 'Karl',
        lastName: 'Dovineau',
      },
      todayScore: 0.12,
      keyData: {
        calorieCount: 1930,
        proteinCount: 155,
        carbohydrateCount: 290,
        lipidCount: 50,
      },
    };
  }

  // TEST ERREUR API, insérer un nombre différent de 12 ou 18 dans l'url pour simuler une erreur

  const response = await fetch(`${apiUrl}/user/${id}`);
  const { data } = await response.json();
  return data;
}

export async function fetchUserActivity(id: string | number): Promise<UserActivity> {
  if (mock) {
    return {
      data: {
        sessions: [
          { date: '2023-10-01', calories: 2400, kilogram: 70 },
          { date: '2023-10-02', calories: 2200, kilogram: 69 },
          { date: '2023-10-03', calories: 2500, kilogram: 68 },
          { date: '2023-10-04', calories: 2300, kilogram: 67 },
          { date: '2023-10-05', calories: 2100, kilogram: 66 },
          { date: '2023-10-06', calories: 2600, kilogram: 65 },
          { date: '2023-10-07', calories: 2800, kilogram: 64 },
        ],
      },
    };
  }

  // Commenter le code suivant pour simuler une erreur API

  const response = await fetch(`${apiUrl}/user/${id}/activity`);
  const json = await response.json();
  return { data: { sessions: json.data.sessions.map((s: any) => ({ ...s, date: s.day })) } };
}

export async function fetchUserAverageSessions(id: string | number): Promise<UserAverageSessions> {
  if (mock) {
    return {
      data: {
        sessions: [
          { day: '1', sessionLength: 30 },
          { day: '2', sessionLength: 45 },
          { day: '3', sessionLength: 50 },
          { day: '4', sessionLength: 60 },
          { day: '5', sessionLength: 40 },
          { day: '6', sessionLength: 55 },
          { day: '7', sessionLength: 70 },
        ],
      },
    };
  }

  // Commenter le code suivant pour simuler une erreur API
  const response = await fetch(`${apiUrl}/user/${id}/average-sessions`);
  const json = await response.json();
  return {
    data: {
      sessions: json.data.sessions.map((s: any) => ({ ...s, day: s.day.toString() })),
    },
  };
}

export async function fetchUserPerformance(id: string | number): Promise<UserPerformance> {
  if (mock) {
    return {
      data: {
        data: [
          { value: 80, kind: 1 },
          { value: 120, kind: 2 },
          { value: 90, kind: 3 },
          { value: 70, kind: 4 },
          { value: 100, kind: 5 },
          { value: 110, kind: 6 },
        ],
        kind: {
          1: 'Cardio',
          2: 'Energie',
          3: 'Endurance',
          4: 'Force',
          5: 'Vitesse',
          6: 'Intensité',
        },
      },
    };
  }

  // Commenter le code suivant pour simuler une erreur API
  const response = await fetch(`${apiUrl}/user/${id}/performance`);
  const data = await response.json();
  return data;
}
