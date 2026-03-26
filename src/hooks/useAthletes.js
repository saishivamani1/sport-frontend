import { useQuery } from '@tanstack/react-query';
import { getAthletes, getAthleteById } from '../api/athletes';

export function useAthletes(params) {
  return useQuery({ queryKey: ['athletes', params], queryFn: () => getAthletes(params).then(r => r.data.data) });
}

export function useAthlete(id) {
  return useQuery({ queryKey: ['athlete', id], queryFn: () => getAthleteById(id).then(r => r.data.data), enabled: !!id });
}
