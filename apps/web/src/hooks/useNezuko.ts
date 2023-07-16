import { NezukoClient } from "nezuko";

let nezuko: NezukoClient | null = null;

const useNezuko = () => {
  if (nezuko === null) {
    nezuko = new NezukoClient();
  }

  return { nezuko };
};

export default useNezuko;
