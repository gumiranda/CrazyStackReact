import { Link } from "@chakra-ui/react";
import Nextlink from "next/link";
export const ChakraLink = ({ href, ...props }) => {
  return (
    <Link {...props} asChild>
      <Nextlink href={href} />
    </Link>
  );
};
