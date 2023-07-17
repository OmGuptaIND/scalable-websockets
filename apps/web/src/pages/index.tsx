import FullPageLayout from "~/components/common/FullPageLayout";
import { Button } from "~/components/ui/button";
import { useToast } from "~/components/ui/use-toast";
import useNezuko from "~/hooks/useNezuko";
import mainLogger from "~/utils/Logger";
const logger = mainLogger.createSubLogger("pages/index.tsx");

export default function Home() {
  logger.info("Rendering Home");
  const { toast } = useToast();
  const { nezuko } = useNezuko();

  const handleConnect = () => {
    try {
      toast({
        title: "Connecting to Nezuko",
        duration: 2000,
      });
      const token = {
        createdAt: new Date().toISOString(),
      };
      nezuko.connect(JSON.stringify(token));
    } catch (error) {
      logger.error("Error connecting to Nezuko", error);
      toast({
        title: "Error connecting to Nezuko",
        duration: 2000,
      });
    }
  };

  const handleClose = () => {
    try {
      nezuko.close();
    } catch (error) {
      logger.error("Error closing Nezuko: ", error);
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

        <div className="grid place-content-center gap-3">
          <Button
            onClick={handleConnect}
            variant="default"
            className="w-96 py-5 font-mono text-lg"
          >
            Connect
          </Button>

          <Button
            onClick={handleClose}
            variant="default"
            className="w-96 py-5 font-mono text-lg"
          >
            Close
          </Button>
        </div>
      </div>
    </FullPageLayout>
  );
}
