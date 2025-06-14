type UserData = {
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
};

type FlatData = {
  name: string;
  value: number | string;
};

export default function flattenData(data: UserData): FlatData[] {
  if (!data?.keyData || !data?.userInfos) {
    console.warn('Missing keyData or userInfos');
    return [];
  }

  const { keyData, score, todayScore, userInfos } = data;
  const finalScore = todayScore ?? score ?? 0;

  return [
    { name: 'Prénom', value: userInfos.firstName },
    { name: 'Nom', value: userInfos.lastName },
    { name: 'Âge', value: Number(userInfos.age) },
    { name: 'Calories', value: Number(keyData.calorieCount) },
    { name: 'Protéines', value: Number(keyData.proteinCount) },
    { name: 'Glucides', value: Number(keyData.carbohydrateCount) },
    { name: 'Lipides', value: Number(keyData.lipidCount) },
    { name: 'Score', value: Number(finalScore) },
  ];
}
