import { useAccount } from 'wagmi';

const useIsAdmin = () => {
  const { address } = useAccount();

  // vérifier si l'adresse fait partie d'une liste d'administrateurs

  const isAdmin = false;

  return isAdmin;
};
