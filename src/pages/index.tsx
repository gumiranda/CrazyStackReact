import type { NextPage } from "next";
import { Flex, Text, Head } from "shared/ui";
const Home: NextPage = () => {
  return (
    <div>
      <Head title="HomePage" description="descrição da home page" />
      <Flex>
        <Text fontSize="6xl">CrazyStack ReactJs</Text>
      </Flex>
    </div>
  );
};

export default Home;
