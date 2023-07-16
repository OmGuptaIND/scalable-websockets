import FullPageLayout from "~/components/common/FullPageLayout";

import { Button } from "~/components/ui/button";
import { useToast } from "~/components/ui/use-toast";
import useNezuko from "~/hooks/useNezuko";
import mainLogger from "~/utils/Logger";

const logger = mainLogger.createSubLogger("pages/index.tsx");

export default function Home() {
  const { toast } = useToast();
  const { nezuko } = useNezuko();

  const handleConnect = () => {
    try {
      toast({
        title: "Connecting to Nezuko",
        duration: 2000,
      });
      nezuko.connect();
    } catch (error) {
      logger.error("Error connecting to Nezuko", error);
      toast({
        title: "Error connecting to Nezuko",
        duration: 2000,
      });
    }
  };

  return (
    <FullPageLayout className="h-full min-h-screen">
      <div className="grid h-screen place-content-center">
        <p className="mb-2 text-center font-mono text-xs text-zinc-400">
          You Know what to do.
        </p>
        <Button
          onClick={handleConnect}
          variant="default"
          className="w-96 py-5 font-mono text-lg"
        >
          Connect
        </Button>
      </div>
    </FullPageLayout>
  );
}
