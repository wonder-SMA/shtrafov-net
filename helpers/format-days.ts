import plural from 'plural-ru';

export const formatDays = (days: number) => `${days} ${plural(days, 'день', 'дня', 'дней')}`;
