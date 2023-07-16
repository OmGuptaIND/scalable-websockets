import FullPageLayout from "~/components/common/FullPageLayout";

import { Button } from "~/components/ui/button";

export default function Home() {
  // const hello = api.example.hello.useQuery({ text: "from tRPC" });

  return (
    <FullPageLayout className="min-h-screen">
      <Button variant={"outline"}>TODO</Button>
    </FullPageLayout>
  );
}
