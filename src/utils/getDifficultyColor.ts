export type Difficulty = 'קל' | 'קל-בינוני' | 'בינוני' | 'בינוני-קשה' | 'קשה' | 'ללא';

export const getDifficultyColor = (difficulty?: Difficulty) => {
    const colors = {
        'קל': 'text-[#059669] bg-[#d1fae5]',
        'קל-בינוני': 'text-[#059669] bg-[#ecfdf5]',
        'בינוני': 'text-[#d97706] bg-[#fef3c7]',
        'בינוני-קשה': 'text-[#dc2626] bg-[#fee2e2]',
        'קשה': 'text-[#dc2626] bg-[#fee2e2]',
        'ללא': 'text-[#6b7280] bg-[#f3f4f6]'
    };
    return colors[difficulty ?? 'ללא'];
};
